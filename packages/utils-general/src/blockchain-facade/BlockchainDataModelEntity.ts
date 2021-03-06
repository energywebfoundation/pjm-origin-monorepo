import * as Configuration from './Configuration';
import { PreciseProofs } from 'ew-utils-general-precise-proofs';
import { validateJson } from '../off-chain-data/json-validator';
import { IOffChainData } from '@energyweb/origin-backend-client';

export interface IOffChainProperties {
    rootHash: string;
    salts: string[];
    schema: string[];
}

export interface IOnChainProperties {
    propertiesDocumentHash: string;
    url: string;
}

export abstract class Entity {
    id: string;
    configuration: Configuration.Entity;
    proofs: PreciseProofs.Proof[];
    
    constructor(id: string, configuration: Configuration.Entity) {
        if (typeof id !== 'string' && id !== null) {
            throw new Error('An ID of an Entity should always be of type string.');
        }
        if (isNaN(Number(id))) {
            throw new Error('An ID of an Entity should always be numeric string.');
        }
        if (!configuration.offChainDataSource) {
            throw new Error('Entity::constructor: Please set offChainDataSource in the configuration.');
        }

        this.id = id;
        this.configuration = configuration;
        this.proofs = [];
    }

    get offChainDataClient() {
        return this.configuration.offChainDataSource.client
    };

    addProof(proof: PreciseProofs.Proof) {
        this.proofs.push(proof);
    }

    abstract getUrl(): string;

    get entityLocation() {
        return `${this.getUrl()}/${this.id}`;
    }

    prepareEntityCreation(offChainProperties: any, schema: any): IOffChainProperties {
        validateJson(offChainProperties, schema, this.getUrl(), this.configuration.logger);

        return this.generateAndAddProofs(offChainProperties);
    }

    async syncOffChainStorage<T>(properties: T, offChainStorageProperties: IOffChainProperties): Promise<void> {
        const hasSynced = await this.offChainDataClient.insertOrUpdate(this.entityLocation, {
            properties,
            salts: offChainStorageProperties.salts,
            schema: offChainStorageProperties.schema
        });

        if (this.configuration.logger) {
            this.configuration.logger.verbose(
                `Put off chain properties to ${this.entityLocation}`
            );
        }

        if (!hasSynced) {
            throw new Error('createAsset: Saving off-chain data failed.');
        }
    }

    async deleteFromOffChainStorage() {
        await this.offChainDataClient.delete(this.entityLocation);

        if (this.configuration.logger) {
            this.configuration.logger.verbose(
                `Deleted off chain properties of ${this.entityLocation}`
            );
        }
    }

    async getOffChainProperties<T>(hash: string): Promise<T> {
        const { properties, salts, schema } = await this.offChainDataClient.get<T>(
            this.entityLocation
        );

        this.generateAndAddProofs(properties, salts);
        this.verifyOffChainProperties(hash, properties, schema);

        if (this.configuration.logger) {
            this.configuration.logger.verbose(
                `Got off chain properties from ${this.entityLocation}`
            );
        }

        return properties;
    }

    async getOffChainDump<T>(): Promise<IOffChainData<T>> {
        return this.offChainDataClient.get<T>(
            this.entityLocation
        );
    }

    // Throws an error if it doesn' exist
    async throwIfExists(): Promise<void> {
        try {
            await this.offChainDataClient.get(this.entityLocation);
            throw new Error('Entity: Already exists.');
        } catch (e) {
            return;
        }
    }

    verifyOffChainProperties(rootHash: string, properties: any, schema: string[]) {
        Object.keys(properties).map(key => {
            const theProof = this.proofs.find((proof: PreciseProofs.Proof) => proof.key === key);

            if (this.configuration.logger.level == 'debug') {
                console.log('\nDEBUG verifyOffChainProperties');
                console.log('rootHash: ' + rootHash);
                console.log('properties: ' + properties);
            }

            if (theProof) {
                if (!PreciseProofs.verifyProof(rootHash, theProof, schema)) {
                    throw new Error(
                        `Proof ${JSON.stringify(theProof)} for property ${key} is invalid.`
                    );
                }
            } else {
                throw new Error(`Could not find proof for property ${key}`);
            }
        });
    }

    abstract async sync(): Promise<Entity>;

    protected generateAndAddProofs(properties: any, salts?: string[]): IOffChainProperties {
        this.proofs = [];
        let leafs = salts
            ? PreciseProofs.createLeafs(properties, salts)
            : PreciseProofs.createLeafs(properties);

        leafs = PreciseProofs.sortLeafsByKey(leafs);

        const merkleTree = PreciseProofs.createMerkleTree(
            leafs.map((leaf: PreciseProofs.Leaf) => leaf.hash)
        );

        leafs.forEach((leaf: PreciseProofs.Leaf) =>
            this.addProof(PreciseProofs.createProof(leaf.key, leafs, true, merkleTree))
        );

        const schema = leafs.map((leaf: PreciseProofs.Leaf) => leaf.key);

        const result = {
            rootHash: PreciseProofs.createExtendedTreeRootHash(
                merkleTree[merkleTree.length - 1][0],
                schema
            ),
            salts: leafs.map((leaf: PreciseProofs.Leaf) => leaf.salt),
            schema
        };

        if (this.configuration.logger.level == 'debug') {
            console.log('\nDEBUG generateAndAddProofs');
            console.log(result);
            PreciseProofs.printTree(merkleTree, leafs, schema);
        }

        return result;
    }
}

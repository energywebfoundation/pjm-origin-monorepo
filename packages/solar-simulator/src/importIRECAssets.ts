import program from 'commander';
import parse from 'csv-parse/lib/sync';
import { HDNode } from 'ethers/utils';
import fs from 'fs';
import geoTz from 'geo-tz';

import CONFIG from '../config/config.json';

const configLocation = 'config/config.json';

let generatedAccountIndex = CONFIG.config.ACCOUNT_GENERATION.startIndex;
function generateNextAccount() {
    const node = HDNode.fromMnemonic(CONFIG.config.ACCOUNT_GENERATION.mnemonic);
    const wallet = node.derivePath(`m/44'/60'/0'/0/${generatedAccountIndex}`);

    generatedAccountIndex++;

    return {
        address: wallet.publicKey,
        privateKey: wallet.privateKey
    };
}

program.option('-i, --input <path>', 'input REC csv file');
program.option('-o, --owner <address>', 'address of the asset owner');
program.option('-m, --matcher <address>', 'address of the asset matcher');

program.parse(process.argv);

if (!program.input) {
    console.error(`Missing -i argument`);
    process.exit(1);
}

if (!fs.existsSync(program.input)) {
    console.error(`${program.input} file does not exist`);
    process.exit(1);
}

const processAssets = async parsedContent => {
    const assets = [];
    const flow = [];

    let id = 0;
    for (const asset of parsedContent) {
        console.log('---');
        console.log(`Processing ${asset['Device ID']} asset`);

        const maxCapacity = parseFloat(asset['Electrical Capacity (MW)']) * 10 ** 6;
        const country = asset.Country.split(':')[1].trim();
        const address = asset['Address (ex. Country)'];

        const name = asset.Name;
        const registrationDate = asset['Registration Date'];
        const latitude = parseFloat(asset.Latitude);
        const longitude = parseFloat(asset.Longitude);
        const assetType = asset.Technology.split(':')[1].trim();

        geoTz.preCache();
        const timezone = geoTz(latitude, longitude)[0];

        const account = generateNextAccount();

        console.log(`Generated smart meter address ${account.address}`);

        assets.push({
            id: (id++).toString(),
            maxCapacity,
            smartMeterPrivateKey: account.privateKey,
            role: 'producer',
            manufacturer: '',
            model: '',
            serial_number: '',
            latitude,
            longitude,
            timezone,
            energy_unit: 'wattHour'
        });

        flow.push({
            type: 'CREATE_PRODUCING_ASSET',
            data: {
                smartMeter: account.address,
                smartMeterPK: account.privateKey,
                owner: program.owner || '',
                matcher: program.matcher || '',
                operationalSince: new Date(registrationDate).getTime() / 1000,
                capacityWh: maxCapacity,
                lastSmartMeterReadWh: 0,
                active: true,
                lastSmartMeterReadFileHash: '',
                country,
                address,
                gpsLatitude: latitude.toString(),
                gpsLongitude: longitude.toString(),
                timezone,
                assetType,
                complianceRegistry: 'REC',
                otherGreenAttributes: 'N.A.',
                typeOfPublicSupport: 'N.A',
                facilityName: name
            }
        });
    }

    return { assets, flow };
};

const parseContent = (path: string) => {
    const inputContent = fs.readFileSync(path);

    return parse(inputContent, { columns: true, trim: true });
};

(async () => {
    console.log('----- Starting importing REC assets to local config file -----');

    const parsedContent = parseContent(program.input);

    console.log(`Found ${parsedContent.length} assets in ${program.input}`);

    const { assets, flow } = await processAssets(parsedContent);
    const updatedConfig = JSON.stringify({ ...CONFIG, assets }, null, 2);

    fs.writeFileSync(configLocation, updatedConfig);

    console.log(`----- New assets stored in ${configLocation}`);

    console.log(JSON.stringify(flow, null, 2));
})();

import React from 'react';
import { mount } from 'enzyme';
import { CertificateTable, SelectedState } from '../../components/CertificateTable';
import { Certificate } from '@energyweb/origin';
import { Unit } from '@energyweb/utils-general';
import { setupStore, createRenderedHelpers, WrapperComponent } from '../utils/helpers';

describe('CertificateTable', () => {
    it('correctly renders', async () => {
        const {
            store,
            history,
            setCurrentUser,
            addProducingAsset,
            addCertificate,
            cleanupStore
        } = setupStore();

        setCurrentUser({
            id: '0x123'
        });

        addProducingAsset({
            id: '0',
            owner: '0x123'
        });

        addCertificate({
            id: '0',
            certificate: {
                owner: '0x123',
                energy: 1 * Unit.MWh,
                creationTime: 1569436970,
                assetId: 0,
                status: Certificate.Status.Active
            } as Certificate.ICertificate
        });

        addCertificate({
            id: '1',
            certificate: {
                owner: '0x123',
                energy: 2.5 * Unit.kWh,
                creationTime: 1569746970,
                assetId: 0
            } as Certificate.ICertificate
        });

        addCertificate({
            id: '2',
            certificate: {
                owner: '0x124'
            } as Certificate.ICertificate
        });

        addCertificate({
            id: '3',
            certificate: {
                owner: '0x123',
                status: Certificate.Status.Claimed
            } as Certificate.ICertificate
        });

        const rendered = mount(
            <WrapperComponent store={store} history={history}>
                <CertificateTable selectedState={SelectedState.Inbox} />
            </WrapperComponent>
        );

        const { refresh, assertPagination, assertMainTableContent } = createRenderedHelpers(
            rendered
        );

        await refresh();

        assertMainTableContent([
            '',
            'Solar - Photovoltaic - Roof mounted',
            'Sep 19',
            `Nakhon Pathom, Central`,
            'REC',
            'Example Organization',
            'Sun Sep 29 2019',
            '2.5',
            'ClaimPublish for sale',
            '',
            'Solar - Photovoltaic - Roof mounted',
            'Sep 19',
            `Nakhon Pathom, Central`,
            'REC',
            'Example Organization',
            'Wed Sep 25 2019',
            '1,000',
            'ClaimPublish for sale'
        ]);

        assertPagination(1, 2, 2);

        cleanupStore();
    });
});

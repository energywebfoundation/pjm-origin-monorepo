import React from 'react';
import { PurchasableCertificate, Contracts as MarketContracts } from '@energyweb/market';
import { showNotification, NotificationType } from '../../utils/notifications';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getConfiguration } from '../../features/selectors';
import { setLoading } from '../../features/general/actions';

interface IProps {
    certificates: PurchasableCertificate.Entity[];
    showModal: boolean;
    callback: () => void;
}

export function BuyCertificateBulkModal(props: IProps) {
    const { certificates, callback, showModal } = props;

    const configuration = useSelector(getConfiguration);
    const dispatch = useDispatch();

    function handleClose() {
        callback();
    }

    async function buyCertificateBulk() {
        const account = {
            from: configuration.blockchainProperties.activeUser.address,
            privateKey: configuration.blockchainProperties.activeUser.privateKey
        };

        dispatch(setLoading(true));

        for (const cert of certificates) {
            const acceptedToken = (cert.acceptedToken as any) as string;

            if (acceptedToken !== '0x0000000000000000000000000000000000000000') {
                const erc20TestToken = new MarketContracts.Erc20TestToken(
                    configuration.blockchainProperties.web3,
                    acceptedToken
                );

                const currentAllowance = Number(
                    await erc20TestToken.allowance(account.from, cert.certificate.owner)
                );
                const price = Number(cert.onChainDirectPurchasePrice);

                await erc20TestToken.approve(
                    cert.certificate.owner,
                    currentAllowance + price,
                    account
                );
            }
        }

        const certificateIds: number[] = certificates.map(cert => parseInt(cert.id, 10));
        await configuration.blockchainProperties.marketLogicInstance.buyCertificateBulk(
            certificateIds,
            account
        );

        dispatch(setLoading(false));

        showNotification(`Certificates have been bought.`, NotificationType.Success);
        handleClose();
    }

    const totalWh = certificates.reduce((a, b) => a + Number(b.certificate.energy), 0);

    return (
        <Dialog open={showModal} onClose={handleClose}>
            <DialogTitle>Buy certificates</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You selected a total of {totalWh / 1e6} MWh worth of REC certificates.
                </DialogContentText>
                <DialogContentText>Would you like to proceed with buying them?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={buyCertificateBulk} color="primary">
                    Buy
                </Button>
            </DialogActions>
        </Dialog>
    );
}

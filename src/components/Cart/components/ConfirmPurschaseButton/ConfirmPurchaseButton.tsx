import React, {FC} from 'react';
import classes from './ConfirmPurchaseButton.module.sass'
import {Icon} from '@iconify/react';

interface ConfirmPurchaseButtonProps {
    onClick: void
}

const ConfirmPurchaseButton: FC<ConfirmPurchaseButtonProps> = ({
                                                                   onClick = undefined
                                                               }) => {
    return (
        <button className={classes.confirmPurchaseButton} onClick={onClick}>
            <span className={classes.buttonText}>Buy a ticket</span>
            <Icon icon="icons8:chevron-up-round" color="white" rotate={1} width={25} height={25}/>
        </button>
    );
};

export default ConfirmPurchaseButton;

import React, {FC} from 'react';
import classes from './Total.module.sass'
import {Icon} from '@iconify/react';

interface TotalProps {
    category: string
    numberOfTickets: number
    onClick: void
    price: number
    currency: string
}

const Total: FC<TotalProps> = ({
                                   category = "",
                                   numberOfTickets = 1,
                                   onClick = undefined,
                                   price = null,
                                   currency = ""
                               }) => {
    return (
        <div className={classes.total}>
            <div className={classes.header}>
                <span className={classes.selectedTickets}>{category} x {numberOfTickets}</span>
                <Icon
                    icon="basil:cross-outline"
                    className={classes.closeIcon}
                    onClick={onClick}
                    width={25}
                    height={25}/>
            </div>
            <div className={classes.price}>
                <span>Price</span>
                <span>{price} {currency}</span>
            </div>
        </div>
    );
};

export default Total;

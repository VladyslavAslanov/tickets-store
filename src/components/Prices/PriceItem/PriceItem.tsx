import React, {FC} from 'react';
import classes from './PriceItem.module.sass'

interface PriceItemProps {
    price: number,
    currency: string,
    color: string
}

const PriceItem: FC<PriceItemProps> = ({
                                           price = null,
                                           currency = '',
                                           color = ''
                                       }) => {
        return (
            <button className={classes.priceItem}>
                <div className={classes.colorIndicator} style={{background: color}}/>
                {price} {currency}
            </button>
        );
    }
;

export default PriceItem;

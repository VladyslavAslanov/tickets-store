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
            <div className={classes.priceItem}>
                <div className={classes.colorIndicator} style={{background: color}}/>
                {price} {currency}
            </div>
        );
    }
;

export default PriceItem;

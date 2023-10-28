import React, {FC} from 'react';
import classes from './PriceList.module.sass'
import PriceItem from "../PriceItem/PriceItem";

interface PriceListProps {
    prices: number[],
    currency: string
}

const colorArray: string[] = ["#FF6B9B", "#65DEB8", "#A930FA", "#F1532A", "#78CAD1", "#FF856B", "#778CFF"]

const PriceList: FC<PriceListProps> = ({
                                           prices = [],
                                           currency = '',
                                       }) => {
    return (
        <div className={classes.priceList}>
            {prices.map((price, priceIndex) => {
                return (
                    <PriceItem
                        key={priceIndex}
                        price={price}
                        currency={currency}
                        color={colorArray[priceIndex]}/>
                )
            })}
        </div>
    );
};

export default PriceList;

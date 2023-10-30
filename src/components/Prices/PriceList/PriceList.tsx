import React, {FC} from 'react';
import classes from './PriceList.module.sass'
import PriceItem from "../PriceItem/PriceItem";
import {colorList} from '../../FloorMap/components/SeatMap/SeatMap'
import {log} from "util";

interface PriceListProps {
    prices: number[],
    currency: string,
    colors: colorList[]
}

const PriceList: FC<PriceListProps> = ({
                                           prices = [],
                                           currency = '',
                                           colors = []
                                       }) => {
    return (
        <div className={classes.priceList}>
            {prices.map((price, priceIndex) => {
                return (
                    <PriceItem
                        key={priceIndex}
                        price={price}
                        currency={currency}
                        color={colors[priceIndex].color}/>
                )
            })}
        </div>
    );
};

export default PriceList;

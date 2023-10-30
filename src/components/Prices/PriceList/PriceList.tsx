import React, {FC} from 'react';
import classes from './PriceList.module.sass'
import PriceItem from "../PriceItem/PriceItem";

interface PriceListProps {
    prices: number[],
    currency: string,
}

interface colorsType {
    category: string
    color: string
}

const colors: colorsType[] = [
    {
        category: "Category 1",
        color: "#FF6B9B"
    }, {
        category: "Category 2",
        color: "#65DEB8"
    }, {
        category: "Category 3",
        color: "#A930FA"
    }, {
        category: "Category 4",
        color: "#F1532A"
    }, {
        category: "Category 5",
        color: "#78CAD1"
    }, {
        category: "Category 6",
        color: "#FF856B"
    }, {
        category: "Category 7",
        color: "#778CFF"
    }]


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
                        color={colors[priceIndex].color}/>
                )
            })}
        </div>
    );
};

export default PriceList;

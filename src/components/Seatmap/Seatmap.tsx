import React from 'react';
import classes from './Seatmap.module.sass'
import PriceList from "../Prices/PriceList/PriceList";

const Seatmap = () => {
    const priceList: number[] = [165, 190, 215, 240, 265, 290, 315]
    return (
        <div className={classes.seatmap}>
            <PriceList prices={priceList} currency="PLN"/>
        </div>
    );
};

export default Seatmap;

import React from 'react';
import classes from './Seatmap.module.sass'
import PriceList from "../Prices/PriceList/PriceList";
import ControlButtons from "../ControlButtons/ControlButtons";

const Seatmap = () => {
    const priceList: number[] = [165, 190, 215, 240, 265, 290, 315]
    return (
        <div className={classes.seatmap}>
            <PriceList prices={priceList} currency="PLN"/>
            <ControlButtons/>
        </div>
    );
};

export default Seatmap;

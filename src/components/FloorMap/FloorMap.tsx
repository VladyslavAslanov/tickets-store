import React from 'react';
import classes from './FloorMap.module.sass'
import PriceList from "../Prices/PriceList/PriceList";
import SeatMap from "./Components/SeatMap/SeatMap";
import ControlButtons from "../ControlButtons/ControlButtons";
import Subheading from "../common/Subheading/Subheading";
import Cart from "../Cart/Cart";

const FloorMap = () => {
    const priceList: number[] = [165, 190, 215, 240, 265, 290, 315]
    const currency = "PLN"
    return (
        <div className={classes.seatmap}>
            <PriceList prices={priceList} currency={currency}/>
            <div className={classes.stageWrapper}>
                <Subheading subheading="Choose a ticket"/>
                <div className={classes.seatmapWrapper}>
                    <SeatMap/>
                    <Cart/>
                </div>
            </div>
        </div>
    );
};

export default FloorMap;

import React, {useState} from 'react';
import classes from './FloorMap.module.sass'
import SeatMap from "./components/SeatMap/SeatMap";
import Cart from "../Cart/Cart";

interface cartObject {
    price: number
    category: string
}

const FloorMap = () => {
    const [cart, setCart] = useState<cartObject | null>(null);

    const priceList: number[] = [165, 190, 215, 240, 265, 290, 315]
    const currency = "PLN"

    return (
        <div className={classes.seatmap}>
            <SeatMap priceList={priceList} currency={currency}/>

            {cart !== null
                && <Cart onCancelPurchase={undefined} onConfirmPurchase={undefined}/>}
        </div>
    );
};

export default FloorMap;

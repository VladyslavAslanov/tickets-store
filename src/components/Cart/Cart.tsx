import React, {FC} from 'react';
import classes from './Cart.module.sass'
import Subheading from "../common/Subheading/Subheading";
import Total from "./components/Total/Total";

interface CartProps {

}

const Cart: FC<CartProps> = () => {
    return (
        <div className={classes.cart}>
            <Subheading subheading="Your tickets"/>
            <Total category="Category 1" numberOfTickets={1} onClick={undefined} price={235} currency="PLN"/>
        </div>
    );
};

export default Cart

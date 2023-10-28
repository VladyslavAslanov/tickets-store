import React, {FC} from 'react';
import classes from './Cart.module.sass'
import Subheading from "../common/Subheading/Subheading";
import Total from "./components/Total/Total";
import ConfirmPurchaseButton from "./components/ConfirmPurschaseButton/ConfirmPurchaseButton";
import PolicyNote from "./components/PolicyNote/PolicyNote";
import OrderDetails from "./components/OrderDetails/OrderDetails";

interface CartProps {
    onCancelPurchase: void
    onConfirmPurchase: void
}

const Cart: FC<CartProps> = ({
                                 onCancelPurchase = undefined,
                                 onConfirmPurchase = undefined
                             }) => {
    return (
        <div className={classes.cart}>
            <Subheading
                subheading="Your tickets"/>
            <Total
                category="Category 1"
                numberOfTickets={1}
                onClick={onCancelPurchase}
                price={235}
                currency="PLN"/>
            <OrderDetails
                numberOfTickets={1}
                taxFee={34.21}
                serviceFee={13.34}
                currency="PLN"
                totalPrice={320}/>
            <ConfirmPurchaseButton
                onClick={onConfirmPurchase}/>
            <PolicyNote/>
        </div>
    );
};

export default Cart

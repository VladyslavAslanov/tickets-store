import React, {FC} from 'react';
import classes from './Cart.module.sass'
import Subheading from "../common/Subheading/Subheading";
import Total from "./components/Total/Total";
import ConfirmPurchaseButton from "./components/ConfirmPurschaseButton/ConfirmPurchaseButton";
import PolicyNote from "./components/PolicyNote/PolicyNote";
import OrderDetails from "./components/OrderDetails/OrderDetails";

interface CartProps {
    cart: {
        price: number
        category: string
        ticketId: number
    }[]
    onCancelPurchase: () => void
    onConfirmPurchase: void
}

const Cart: FC<CartProps> = ({
                                 cart = [],
                                 onCancelPurchase = () => {
                                 },
                                 onConfirmPurchase = undefined
                             }) => {

    const totalPrice = cart.reduce((accumulatedValue, ticket) => accumulatedValue + ticket.price, 0);
    const taxFee = Number((34.21 * cart.length).toFixed(3))
    const serviceFee = Number((13.34 * cart.length).toFixed(3))
    return (
        <div className={classes.cart}>
            <Subheading
                subheading="Your tickets"/>
            <Total
                category="Category 1"
                numberOfTickets={cart.length}
                onClick={onCancelPurchase}
                sum={totalPrice}
                currency="PLN"/>
            <OrderDetails
                numberOfTickets={cart.length}
                taxFee={taxFee}
                serviceFee={serviceFee}
                currency="PLN"
                totalPrice={totalPrice}/>
            <ConfirmPurchaseButton
                onClick={onConfirmPurchase}/>
            <PolicyNote/>
        </div>
    );
};

export default Cart

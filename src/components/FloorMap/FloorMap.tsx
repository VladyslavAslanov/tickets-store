import React, {useState} from 'react';
import classes from './FloorMap.module.sass'
import SeatMap from "./components/SeatMap/SeatMap";
import Cart from "../Cart/Cart";
import Countdown from "../common/Countdown/Countdown";

interface cartObject {
    price: number
    category: string
    ticketId: number
}

const FloorMap = () => {
    const [cart, setCart] = useState<cartObject[]>([]);

    const onTicketAdd = (price: number, category: string, id: number) => {
        const ticketExists = cart.some(ticket => ticket.ticketId === id);
        if (!ticketExists) {
            const newTicket: cartObject = {
                price: price,
                category: category,
                ticketId: id
            }
            setCart(prevCart => [...prevCart, newTicket]);
        } else {
            const updatedCart = cart.filter(ticket => ticket.ticketId !== id);
            setCart(updatedCart);
        }
    }

    const onCancelPurchase = () => {
        setCart([])
    }

    const priceList: number[] = [165, 190, 215, 240, 265, 290, 315]
    const currency = "PLN"

    return (
        <div className={classes.seatmap}>
            <SeatMap
                priceList={priceList}
                currency={currency}
                onTicketAdd={onTicketAdd}
                cart={cart}/>

            {cart.length > 0
                && <Cart
                    cart={cart}
                    onCancelPurchase={onCancelPurchase}
                    onConfirmPurchase={undefined}/>}

            {cart.length > 0
                && <Countdown onCancelPurchase={onCancelPurchase} 
                />}
        </div>
    );
};

export default FloorMap;

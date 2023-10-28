import React, {useState} from 'react';
import classes from './FloorMap.module.sass'
import SeatMap from "./components/SeatMap/SeatMap";
import Cart from "../Cart/Cart";

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
            console.warn(`Ticket with ID ${id} is already in the cart.`);
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
        </div>
    );
};

export default FloorMap;

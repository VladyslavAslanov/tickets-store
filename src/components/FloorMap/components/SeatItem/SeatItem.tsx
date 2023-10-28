import React, {FC, useState} from 'react';
import classes from './SeatItem.module.sass'
import SeatItemInfoBox from "../../../SeatItemInfoBox/SeatItemInfoBox";
import classNames from "classnames";

interface SeatItemProps {
    capacity: number
    capacityLeft: number
    eventPriceId: number
    eventSeatId: number
    place: string
    rowNum: string
    type: string
    x: number
    y: number
    category: string
    price: number
    currency: string
    id: number
    onTicketAdd: (price: number, category: string, id: number) => void
    cart: {
        price: number
        category: string
        ticketId: number
    }[]
}

const SeatItem: FC<SeatItemProps> = ({
                                         category = "",
                                         price = 0,
                                         currency = "",
                                         id = 0,
                                         onTicketAdd = (price, category, id) => {
                                         },
                                         cart = []
                                     }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const isAvailable = !cart.some(ticket => ticket.ticketId === id)

    const seatStyles = classNames(classes.seat, {
        [classes.unavailableSeat]: !isAvailable
    })

    return (
        <div className={classes.setItemWrapper}>
            <div
                className={seatStyles}
                style={{backgroundColor: isAvailable ? "#FF6B9B" : "#DFDFDF"}}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => onTicketAdd(price, category, id)}>
            </div>

            {isHovered &&
                <SeatItemInfoBox
                    price={price}
                    currency={currency}
                    category={category}
                    row={1}
                    place={1}
                    color="#FF6B9B"/>}
        </div>
    );
};

export default SeatItem;

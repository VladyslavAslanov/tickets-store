import React, {FC} from 'react';
import classes from './SeatItemInfoBox.module.sass'

interface SeatItemInfoBoxProps {
    price: number
    currency: string
    category: string
    row: number
    place: number
    color: string
}

const SeatItemInfoBox: FC<SeatItemInfoBoxProps> = ({
                                                       price = null,
                                                       currency = "",
                                                       category = "",
                                                       row = null,
                                                       place = null,
                                                       color = ""
                                                   }) => {
    return (
        <div className={classes.seatItemInfoBox}>
            <div className={classes.price} style={{color: color}}>
                <span>{price} </span>
                <span>{currency}</span>
            </div>
            <div className={classes.category}>
                {category}
            </div>
            <div className={classes.position}>
                <div className={classes.row}>
                    <span className={classes.smallText}>Row: </span>
                    {row}
                </div>
                <div className={classes.seat}>
                    <span className={classes.smallText}>Seat: </span>
                    {place}
                </div>
            </div>
        </div>
    );
};

export default SeatItemInfoBox

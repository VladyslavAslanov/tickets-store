import React, {FC, useState} from 'react';
import classes from './SeatItem.module.sass'
import SeatItemInfoBox from "../../../SeatItemInfoBox/SeatItemInfoBox";

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
}

const SeatItem: FC<SeatItemProps> = () => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div className={classes.setItemWrapper}>
            <div
                className={classes.seat}
                style={{backgroundColor: "#FF6B9B"}}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
            </div>

            {isHovered &&
                <SeatItemInfoBox price={165} currency="PLN" category="Category 1" row={1} place={1} color="#FF6B9B"/>}
        </div>
    );
};

export default SeatItem;

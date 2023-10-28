import React, {FC} from 'react'
import seatModel from '../../../../models/seats_model.json'
import SeatItem from "../SeatItem/SeatItem"
import classes from './SeatMap.module.sass'

const SeatMap: FC = () => {
    const seats = seatModel.content
    return (
        <div className={classes.seatMap}>
            <div className={classes.stage}>
                Stage
            </div>
            <div className={classes.seats}>
                {seats.map(({
                                capacity,
                                capacityLeft,
                                eventPriceId,
                                eventSeatId,
                                place,
                                rowNum,
                                type,
                                x,
                                y
                            }, seatIndex) => {
                    return (
                        <SeatItem key={seatIndex}
                                  capacity={capacity}
                                  capacityLeft={capacityLeft}
                                  eventPriceId={eventPriceId}
                                  eventSeatId={eventSeatId}
                                  place={place}
                                  rowNum={rowNum}
                                  type={type}
                                  x={x}
                                  y={y}/>
                    )
                })}
            </div>
        </div>
    );
};

export default SeatMap;

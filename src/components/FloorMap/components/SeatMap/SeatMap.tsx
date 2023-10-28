import React, {FC} from 'react'
import seatModel from '../../../../models/seats_model.json'
import priceModel from '../../../../models/price_model.json'
import classes from './SeatMap.module.sass'
import PriceList from "../../../Prices/PriceList/PriceList";
import SeatItem from "../SeatItem/SeatItem";

interface SeatMapProps {
    priceList: number[]
    currency: string
    onTicketAdd: (price: number, category: string, id: number) => void
}

const SeatMap: FC<SeatMapProps> = ({
                                       priceList = [],
                                       currency = "",
                                       onTicketAdd = (price, category, id) => {
                                       }
                                   }) => {
    const seats = seatModel.content
    const prices = priceModel.content
    return (
        <div className={classes.seatMap}>
            <PriceList prices={priceList} currency={currency}/>
            <div className={classes.hallLayout}>
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
                        const seatPriceModel = prices.find(el => el.id === eventPriceId);
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
                                      y={y}
                                      category={seatPriceModel === undefined ? "" : seatPriceModel.name}
                                      price={seatPriceModel === undefined ? 0 : seatPriceModel.price}
                                      currency={seatPriceModel === undefined ? "" : seatPriceModel.currency}
                                      id={seatPriceModel === undefined ? 0 : seatPriceModel.id}
                                      onTicketAdd={onTicketAdd}/>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SeatMap;

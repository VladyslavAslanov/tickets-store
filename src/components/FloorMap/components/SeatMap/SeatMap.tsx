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
    cart: {
        price: number
        category: string
        ticketId: number
    }[]
}

export interface colorList {
    category: string
    color: string
}

const SeatMap: FC<SeatMapProps> = ({
                                       priceList = [],
                                       currency = "",
                                       onTicketAdd = () => {
                                       },
                                       cart = []
                                   }) => {
    const colors: colorList[] = [
        {
        category: "Category 1",
        color: "#FF6B9B"
    }, {
        category: "Category 2",
        color: "#65DEB8"
    }, {
        category: "Category 3",
        color: "#A930FA"
    }, {
        category: "Category 4",
        color: "#F1532A"
    }, {
        category: "Category 5",
        color: "#78CAD1"
    }, {
        category: "Category 6",
        color: "#FF856B"
    }, {
        category: "Category 7",
        color: "#778CFF"
    }]

    const seats = seatModel.content
    const prices = priceModel.content
    return (
        <div className={classes.seatMap}>
            <PriceList colors={colors} prices={priceList} currency={currency}/>
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
                                      cart={cart}
                                      onTicketAdd={onTicketAdd}/>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SeatMap;

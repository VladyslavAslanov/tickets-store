import React, {FC, useRef, useState} from 'react';
import seatModel from '../../../../models/seats_model.json'
import priceModel from '../../../../models/price_model.json'
import classes from './SeatMap.module.sass'
import PriceList from "../../../Prices/PriceList/PriceList";
import {Circle, Label, Layer, Stage, Tag, Text} from "react-konva";

interface SeatMapProps {
    priceList: number[]
    currency: string
    onTicketAdd: (e: any) => void
    cart: {
        price: number
        category: string
        ticketId: string
    }[]
}

export interface colorList {
    category: string
    color: string
}

interface kanvaEventObject {
    target: {
        getPosition: () => {
            x: number
            y: number
        }
        attrs: {
            radius: number
            name: string
            price: number
            currency: string
            category: string
            rowNum: number
            place: number
        }
    }
}

interface tooltipConfig {
    x: number
    y: number
    text: string
    visible: boolean
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

    const stageRef = useRef<any>(null);

    const [tooltip, setTooltip] = useState<tooltipConfig>({
        visible: false,
        x: 0,
        y: 0,
        text: ""
    });

    const handleMouseEnter = (e: kanvaEventObject) => {
        const konvaEvent = e.target;

        const {price, currency, category, rowNum, place} = e.target.attrs
        console.log(e)

        if (stageRef.current) {
            stageRef.current.container().style.cursor = 'pointer';
        }

        let hoveredElementPos = konvaEvent.getPosition();
        let hoveredElementRadius = konvaEvent.attrs.radius;

        const div = document.createElement('div')

        setTooltip({
            visible: true,
            x: hoveredElementPos.x,
            y: hoveredElementPos.y - hoveredElementRadius,
            text: `${price} ${currency} \n${category} \nRow ${rowNum} Place ${place}`
        });
    }

    const handleMouseLeave = () => {
        if (stageRef.current) {
            stageRef.current.container().style.cursor = 'default';
        }

        setTooltip({
            ...tooltip,
            visible: false
        });
    }

    return (
        <div className={classes.seatMap}>
            <PriceList colors={colors} prices={priceList} currency={currency}/>
            <div className={classes.hallLayout}>
                <div className={classes.stage}>
                    Stage
                </div>
                <Stage width={500} height={500} ref={stageRef}>
                    <Layer>
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

                            const seatPriceModel = prices.find(el => el.id === eventPriceId)

                            return (
                                <Circle
                                    key={seatIndex}
                                    capacity={capacity}
                                    capacityLeft={capacityLeft}
                                    eventPriceId={eventPriceId}
                                    eventSeatId={eventSeatId}
                                    place={place}
                                    rowNum={rowNum}
                                    type={type}
                                    category={seatPriceModel === undefined ? "" : seatPriceModel.name}
                                    price={seatPriceModel === undefined ? 0 : seatPriceModel.price}
                                    currency={seatPriceModel === undefined ? "" : seatPriceModel.currency}
                                    id={seatPriceModel === undefined ? "" : seatPriceModel.id.toString()}
                                    cart={cart}

                                    x={x}
                                    y={y}
                                    radius={5}
                                    fill="#FF00FF"
                                    onClick={(e) => onTicketAdd(e)}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}/>
                            )
                        })}

                        {tooltip.visible && (
                            <Label x={tooltip.x} y={tooltip.y}>
                                <Tag
                                    fill="white"
                                    pointerDirection="down"
                                    pointerWidth={10}
                                    pointerHeight={5}
                                    lineJoin="round"
                                    shadowColor="gray"
                                    shadowBlur={3}
                                    shadowOffsetX={3}
                                    shadowOffsetY={-3}
                                    shadowOpacity={0.2}
                                    stroke="#E0E0E0"
                                    cornerRadius={8}

                                />
                                <Text
                                    text={tooltip.text}
                                    fontSize={14}
                                    padding={5}
                                    fill="black"
                                />
                            </Label>
                        )}
                    </Layer>
                </Stage>
                <div className={classes.seats}>
                </div>
            </div>
        </div>
    );
};

export default SeatMap;

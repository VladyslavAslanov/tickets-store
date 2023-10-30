import React, {FC, useEffect, useRef, useState} from 'react'
import seatModel from '../../../../models/seats_model.json'
import priceModel from '../../../../models/price_model.json'
import classes from './SeatMap.module.sass'
import PriceList from "../../../Prices/PriceList/PriceList"
import {Circle, Label, Layer, Rect, Stage, Tag, Text} from "react-konva"
import ControlButtons from "../../../ControlButtons/ControlButtons"
import {changeCursorStyle} from "../../../../helpers/helpers";

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

interface colorList {
    [key: string]: string;
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

    const colors: colorList = {
        "Category 1": "#FF6B9B",
        "Category 2": "#65DEB8",
        "Category 3": "#A930FA",
        "Category 4": "#F1532A",
        "Category 5": "#78CAD1",
        "Category 6": "#FF856B",
        "Category 7": "#778CFF"
    }

    const seats = seatModel.content
    const prices = priceModel.content

    const stageRef = useRef<any>(null);

    const [seatsInCart, setSeatsInCart] = useState<string[]>(cart.map(item => item.ticketId))
    const [zoom, setZoom] = useState({
        x: 1,
        y: 1
    })
    const [tooltip, setTooltip] = useState<tooltipConfig>({
        visible: false,
        x: 0,
        y: 0,
        text: ""
    })

    const handleMouseEnter = (e: kanvaEventObject) => {
        changeCursorStyle(stageRef, "pointer")

        const konvaEvent = e.target;

        const {price, currency, category, rowNum, place} = e.target.attrs

        const hoveredElementPos = konvaEvent.getPosition();
        const hoveredElementRadius = konvaEvent.attrs.radius;

        setTooltip({
            visible: true,
            x: hoveredElementPos.x,
            y: hoveredElementPos.y - hoveredElementRadius,
            text: `${price} ${currency} \n${category} \nRow ${rowNum} Place ${place}`
        });
    }

    const handleMouseLeave = () => {
        changeCursorStyle(stageRef, "default")

        setTooltip({
            ...tooltip,
            visible: false
        });
    }

    const onZoom = (type: string) => {
        switch (type) {
            case "+":
                setZoom(prevState => ({
                    x: prevState.x + 0.25,
                    y: prevState.y + 0.25
                }))
                break
            case "-":
                setZoom(prevState => ({
                    x: prevState.x - 0.25,
                    y: prevState.y - 0.25
                }))
                break
            default:
                break
        }
    }

    useEffect(() => {
        setSeatsInCart(cart.map(item => item.ticketId));
    }, [cart]);

    return (
        <div className={classes.seatMap}>
            <PriceList prices={priceList} currency={currency}/>
            <div className={classes.hallLayout}>
                <Stage
                    scale={{
                        x: zoom.x,
                        y: zoom.y
                    }}
                    onMouseEnter={() => changeCursorStyle(stageRef, "grab")}
                    onMouseLeave={() => changeCursorStyle(stageRef, "default")}
                    onMouseDown={() => changeCursorStyle(stageRef, "grabbing")}
                    onMouseUp={() => changeCursorStyle(stageRef, "pointer")}
                    draggable
                    width={1000}
                    height={500}
                    ref={stageRef}
                    style={{
                        border: "1px solid red",
                    }}>
                    <Layer>
                        <Rect
                            x={350}
                            width={300}
                            height={30}
                            fill="#F5F5F5"
                            stroke="#505050"/>
                    </Layer>
                    <Layer
                        x={425}
                        y={50}>
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

                            const price = prices.find(el => el.id === eventPriceId)
                            const isInCart = seatsInCart.includes(eventPriceId.toString());
                            const isAvailable = capacityLeft > 0

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
                                    category={price === undefined ? "" : price.name}
                                    price={price === undefined ? 0 : price.price}
                                    currency={price === undefined ? "" : price.currency}
                                    id={price === undefined ? "" : price.id.toString()}
                                    cart={cart}
                                    stroke={isInCart ? colors[price!.name] : ""}
                                    strokeWidth={2}
                                    x={x}
                                    y={y}
                                    radius={isInCart ? 4 : isAvailable ? 5 : 3}
                                    fill={isInCart ? "white" : (isAvailable ? colors[price!.name] : "#F5F5F5")}
                                    onClick={isAvailable ? (e) => onTicketAdd(e) : undefined}
                                    onMouseEnter={isAvailable ? handleMouseEnter : undefined}
                                    onMouseLeave={isAvailable ? handleMouseLeave : undefined}/>
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
                                    cornerRadius={8}/>
                                <Text
                                    text={tooltip.text}
                                    fontSize={12}
                                    align="center"
                                    lineHeight={1.25}
                                    padding={8}
                                    fill="black"/>
                            </Label>
                        )}
                    </Layer>
                </Stage>
                <ControlButtons onZoom={onZoom} zoom={zoom}/>
            </div>
        </div>
    );
};

export default SeatMap;

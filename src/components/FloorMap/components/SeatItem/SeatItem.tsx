import React, { FC } from "react"
import priceModel from "../../../../models/price_model.json"
import { colorList, konvaEventObject } from "../SeatMap/SeatMap"
import { Circle, Line, Text } from "react-konva"

interface seatModelTypes {
	eventSeatId: number
	eventPriceId: number
	capacityLeft: number
	capacity: number
	rowNum: string
	place: string
	type: string
	def: string
	name: string
}

interface SeatItemProps {
	seats: seatModelTypes[]
	seatsInCart: string[]
	handleMouseEnter: (e: konvaEventObject) => void
	handleMouseLeave: () => void
	onTicketAdd: (e: any) => void
	colors: colorList
}

const SeatItem: FC<SeatItemProps> = ({
	seats = [],
	seatsInCart = [],
	handleMouseEnter = () => {},
	handleMouseLeave = () => {},
	onTicketAdd = () => {},
	colors,
}) => {
	const prices = priceModel.content

	const seatElements = seats.map(
		({ capacity, capacityLeft, eventPriceId, eventSeatId, place, rowNum, type, def, name }, index) => {
			const price = prices.find((el) => el.id === eventPriceId)
			const isInCart = seatsInCart.includes(eventPriceId.toString())
			const isAvailable = capacityLeft > 0
			const parsedCoordinates = def.replace(",", "").split(" ")

			switch (type) {
				case "seat":
					return (
						<Circle
							key={index}
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
							strokeWidth={2}
							stroke={isInCart ? colors[price!.name] : ""}
							fill={isInCart ? "white" : isAvailable ? colors[price!.name] : "#F5F5F5"}
							x={Number(parsedCoordinates[0])}
							y={Number(parsedCoordinates[1])}
							radius={isInCart ? 4 : isAvailable ? 5 : 3}
							onClick={isAvailable ? (e: any) => onTicketAdd(e) : undefined}
							onMouseEnter={isAvailable ? handleMouseEnter : undefined}
							onMouseLeave={isAvailable ? handleMouseLeave : undefined}
						/>
					)
				case "row":
					return (
						<Text
							key={index}
							x={Number(parsedCoordinates[0])}
							y={Number(parsedCoordinates[1])}
							text={name}
						/>
					)
				case "table":
					return (
						<Circle
							key={index}
							x={Number(parsedCoordinates[0])}
							y={Number(parsedCoordinates[1])}
							stroke="red"
							fill="red"
							radius={6}
						/>
					)
				case "line":
					const lineCoordinates = parsedCoordinates.map((el) => parseInt(el))
					return (
						<Line
							key={index}
							points={lineCoordinates}
							stroke="red"
							strokeWidth={2}
						/>
					)
				case "floor":
					const floorCoordinates = parsedCoordinates.map((el) => parseInt(el))
					return (
						<Line
							key={index}
							stroke="red"
							strokeWidth={2}
							closed={true}
							fill="lightblue"
							points={floorCoordinates}
							onClick={isAvailable ? (e: any) => onTicketAdd(e) : undefined}
						/>
					)
				case "stage":
					const stageCoordinates = parsedCoordinates.map((el) => parseInt(el))
					return (
						<Line
							key={index}
							stroke="red"
							strokeWidth={2}
							closed={true}
							fill="lightgreen"
							points={stageCoordinates}
						/>
					)
				default:
					return null
			}
		}
	)

	return <div>{seatElements}</div>
}

export default SeatItem

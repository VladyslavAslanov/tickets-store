import React, { FC } from "react"
import priceModel from "../../../../models/price_model.json"
import { colorList, konvaEventObject } from "../SeatMap/SeatMap"
import { Circle, Group, Line, Text } from "react-konva"

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
				case "seat": {
					const [x, y] = parsedCoordinates.map((el) => parseInt(el))

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
							x={x}
							y={y}
							radius={isInCart ? 4 : isAvailable ? 5 : 3}
							onClick={isAvailable ? (e: any) => onTicketAdd(e) : undefined}
							onMouseEnter={isAvailable ? handleMouseEnter : undefined}
							onMouseLeave={isAvailable ? handleMouseLeave : undefined}
						/>
					)
				}
				case "row": {
					const [x, y] = parsedCoordinates.map((el) => parseInt(el))

					return (
						<Text
							key={index}
							x={x}
							y={y}
							text={name}
						/>
					)
				}
				case "table": {
					const [x, y] = parsedCoordinates.map((el) => parseInt(el))

					return (
						<Group key={`table-group-${index}`}>
							<Circle
								key={index}
								x={x}
								y={y}
								fill="red"
								radius={7}
							/>
							<Text
								x={x}
								y={y}
								text={name}
							/>
						</Group>
					)
				}
				case "line": {
					const lineCoordinates = parsedCoordinates.map((el) => parseInt(el))

					return (
						<Line
							key={index}
							points={lineCoordinates}
							stroke="red"
							strokeWidth={2}
						/>
					)
				}
				case "floor": {
					const floorCoordinates = parsedCoordinates.map((el) => parseInt(el))

					let minX = Infinity,
						maxX = -Infinity,
						minY = Infinity,
						maxY = -Infinity

					for (let i = 0; i < floorCoordinates.length; i += 2) {
						minX = Math.min(minX, floorCoordinates[i])
						maxX = Math.max(maxX, floorCoordinates[i])
						minY = Math.min(minY, floorCoordinates[i + 1])
						maxY = Math.max(maxY, floorCoordinates[i + 1])
					}

					const centerX = (minX + maxX) / 2.4
					const centerY = (minY + maxY) / 2

					return (
						<Group key={`floor-index-${index}`}>
							<Line
								closed={true}
								fill="lightblue"
								points={floorCoordinates}
								onClick={isAvailable ? (e: any) => onTicketAdd(e) : undefined}
							/>
							<Text
								x={centerX}
								y={centerY}
								text={name}
							/>
						</Group>
					)
				}
				case "stage": {
					const stageCoordinates = parsedCoordinates.map((el) => parseInt(el))

					let minX = Infinity,
						maxX = -Infinity,
						minY = Infinity,
						maxY = -Infinity

					for (let i = 0; i < stageCoordinates.length; i += 2) {
						minX = Math.min(minX, stageCoordinates[i])
						maxX = Math.max(maxX, stageCoordinates[i])
						minY = Math.min(minY, stageCoordinates[i + 1])
						maxY = Math.max(maxY, stageCoordinates[i + 1])
					}

					const centerX = (minX + maxX) / 2.4
					const centerY = (minY + maxY) / 1.75

					return (
						<Group key={`stage-index-${index}`}>
							<Line
								key={index}
								strokeWidth={2}
								closed={true}
								fill="lightgreen"
								points={stageCoordinates}
							/>
							<Text
								x={centerX}
								y={centerY}
								text={name}
							/>
						</Group>
					)
				}
				default:
					return null
			}
		}
	)

	return <div>{seatElements}</div>
}

export default SeatItem

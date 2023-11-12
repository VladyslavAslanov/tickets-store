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


			switch (type) {
				case "seat": {
					const [xString, yString] = def

					const x = parseFloat(xString)
					const y = parseFloat(yString)

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
							fill={"red"}
							x={x}
							y={y}
							radius={isInCart ? 4 : isAvailable ? 5 : 7}
							onClick={isAvailable ? (e: any) => onTicketAdd(e) : undefined}
							onMouseEnter={isAvailable ? handleMouseEnter : undefined}
							onMouseLeave={isAvailable ? handleMouseLeave : undefined}
						/>
					)
				}
				case "row": {
					const [xString, yString] = def

					const x = parseFloat(xString)
					const y = parseFloat(yString)

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
					const [xString, yString] = def

					const x = parseFloat(xString)
					const y = parseFloat(yString)

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
				case "other": {
					return (
						<Line
							key={index}
							// points={def}
							stroke="red"
							strokeWidth={2}
						/>
					)
				}
				case "floor": {
					let minX = Infinity,
						maxX = -Infinity,
						minY = Infinity,
						maxY = -Infinity

					for (let i = 0; i < def.length; i += 2) {
						// minX = Math.min(minX, def[i])
						// maxX = Math.max(maxX, def[i])
						// minY = Math.min(minY, def[i + 1])
						// maxY = Math.max(maxY, def[i + 1])
					}

					const centerX = (minX + maxX) / 2.4
					const centerY = (minY + maxY) / 2

					return (
						<Group key={`floor-index-${index}`}>
							<Line
								closed={true}
								fill="lightblue"
								// points={def}
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
					let minX = Infinity,
						maxX = -Infinity,
						minY = Infinity,
						maxY = -Infinity

					for (let i = 0; i < def.length; i += 2) {
						// minX = Math.min(minX, def[i])
						// maxX = Math.max(maxX, def[i])
						// minY = Math.min(minY, def[i + 1])
						// maxY = Math.max(maxY, def[i + 1])
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
								// points={def}
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

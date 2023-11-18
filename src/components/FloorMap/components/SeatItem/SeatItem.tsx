import React, { FC } from "react"
import { colorList, konvaEventObject } from "../SeatMap/SeatMap"
import { Circle, Path, Rect } from "react-konva"

interface seatModelTypes {
	eventSeatId: number
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
}) => {
	const seatElements = seats.map(({ type, def }, index) => {
		switch (type) {
			case "seat": {
				const [xString, yString] = def

				const x = parseFloat(xString)
				const y = parseFloat(yString)

				return (
					<Circle
						key={index}
						stroke="red"
						x={x}
						y={y}
						radius={25}
					/>
				)
			}

			// case "row": {
			// 	const [xString, yString] = def
			//
			// 	const x = parseFloat(xString)
			// 	const y = parseFloat(yString)
			//
			// 	return (
			// 		<Text
			// 			key={index}
			// 			x={x}
			// 			y={y}
			// 			text={name}
			// 		/>
			// 	)
			// }

			case "floor": {
				const [xString, yString, widthString, heightString] = def

				const x = parseFloat(xString)
				const y = parseFloat(yString)
				const width = parseFloat(widthString)
				const height = parseFloat(heightString)

				return (
					<Rect
						key={index}
						x={x}
						y={y}
						width={width}
						height={height}
						stroke="red"
					/>
				)
			}

			case "stage": {
				const [xString, yString, widthString, heightString] = def

				const x = parseFloat(xString)
				const y = parseFloat(yString)
				const width = parseFloat(widthString)
				const height = parseFloat(heightString)
				return (
					<Rect
						key={index}
						x={x}
						y={y}
						width={width}
						height={height}
						stroke="red"
					/>
				)
			}

			case "table": {
				const [xString, yString] = def

				const x = parseFloat(xString)
				const y = parseFloat(yString)

				return (
					<Rect
						key={index}
						x={x}
						y={y}
						width={40}
						height={40}
						stroke="green"
						radius={10}
					/>
				)
			}

			case "line": {
				return (
					<Path
						key={index}
						data={def[0]}
						stroke="black"
						strokeWidth={2}
					/>
				)
			}

			case "label": {
				const [xString, yString, widthString, heightString] = def

				const x = parseFloat(xString)
				const y = parseFloat(yString)
				const width = parseFloat(widthString)
				const height = parseFloat(heightString)

				return (
					<Rect
						key={index}
						x={x}
						y={y}
						width={width}
						height={height}
						stroke="red"
					/>
				)
			}

			default:
				return null
		}
	})

	return <div>{seatElements}</div>
}

export default SeatItem

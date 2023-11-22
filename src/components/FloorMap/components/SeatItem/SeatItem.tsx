import React, { FC } from "react"
import { Circle, Group, Path, Rect, Text } from "react-konva"
import { logDOM } from "@testing-library/react"

interface seatModelTypes {
	eventSeatId: number
	capacity: number
	rowNum: string
	place: string
	type: string
	def: string
	nameEN: string
}

interface SeatItemProps {
	seats: seatModelTypes[]
}

const SeatItem: FC<SeatItemProps> = ({
	seats = [],
}) => {
	const seatElements = seats.map(({ type, def, place, nameEN }, index) => {
		switch (type) {
			case "seat": {
				const [xString, yString] = def

				const x = parseFloat(xString)
				const y = parseFloat(yString)

				let minX = Infinity,
					maxX = -Infinity,
					minY = Infinity,
					maxY = -Infinity

				for (let i = 0; i < def.length; i += 2) {
					minX = Math.min(minX, Number(def[i]))
					maxX = Math.max(maxX, Number(def[i]))
					minY = Math.min(minY, Number(def[i + 1]))
					maxY = Math.max(maxY, Number(def[i + 1]))
				}

				const centerX = (minX + maxX) / 2
				const centerY = (minY + maxY) / 2

				return (
					<Group key={index}>
						<Circle
							stroke="#000000"
							x={x}
							y={y}
							radius={25}
						/>
						<Text
							x={centerX}
							y={centerY}
							text={place}
							fontSize={18}
							fill="#000000"
							offsetX={25 / 4.75}
							offsetY={9}
						/>
					</Group>
				)
			}

			// case "row": {
			// 	const [xString, yString] = def
			// 	return (
			// 		<Text
			// 			key={index}
			// 			x={parseFloat(xString)}
			// 			y={parseFloat(yString)}
			// 			text={nameEN}
			// 		/>
			// 	)
			// }

			case "floor": {
				const [xString, yString, widthString, heightString] = def

				const x = parseFloat(xString)
				const y = parseFloat(yString)
				const height = parseFloat(heightString)
				const width = parseFloat(widthString)

				return (
					<Rect
						key={index}
						x={x}
						y={y}
						width={width}
						height={height}
						cornerRadius={10}
						stroke="#000000"
					/>
				)
			}

			case "stage": {
				const [xString, yString, widthString, heightString] = def

				console.log(def)

				const x = parseFloat(xString)
				const y = parseFloat(yString)
				const height = parseFloat(heightString)
				const width = parseFloat(widthString)

				let minX = Infinity,
					maxX = -Infinity,
					minY = Infinity,
					maxY = -Infinity

				for (let i = 0; i < def.length; i += 2) {
					minX = Math.min(minX, Number(def[i]))
					maxX = Math.max(maxX, Number(def[i]))
					minY = Math.min(minY, Number(def[i + 1]))
					maxY = Math.max(maxY, Number(def[i + 1]))
				}

				const centerX = (minX + maxX) / 2
				const centerY = (minY + maxY) / 2

				return (
					<Group key={index}>
						<Rect
							x={x}
							y={y}
							width={width}
							height={height}
							cornerRadius={10}
							stroke="#000000"
						/>
						<Text
							x={centerX}
							y={centerY}
							text={nameEN}
							fontSize={32}
						/>
					</Group>
				)
			}

			case "table": {
				const [xString, yString] = def

				const x = parseFloat(xString)
				const y = parseFloat(yString)

				let minX = Infinity,
					maxX = -Infinity,
					minY = Infinity,
					maxY = -Infinity

				for (let i = 0; i < def.length; i += 2) {
					minX = Math.min(minX, Number(def[i]))
					maxX = Math.max(maxX, Number(def[i]))
					minY = Math.min(minY, Number(def[i + 1]))
					maxY = Math.max(maxY, Number(def[i + 1]))
				}

				const centerX = (minX + maxX) / 2
				const centerY = (minY + maxY) / 2

				return (
					<Group key={index}>
						<Rect
							x={x}
							y={y}
							width={40}
							height={40}
							stroke="#000000"
							cornerRadius={7}
						/>
						<Text
							x={centerX}
							y={centerY}
							text={""}
							fontSize={18}
							fill="#000000"
							offsetX={-10}
							offsetY={-12}
						/>
					</Group>
				)
			}

			case "line": {
				return (
					<Path
						key={index}
						data={def[0]}
						stroke="#000000"
					/>
				)
			}

			// case "label": {
			// 	const [xString, yString, widthString, heightString] = def
			//
			// 	const x = parseFloat(xString)
			// 	const y = parseFloat(yString)
			// 	const width = parseFloat(widthString)
			// 	const height = parseFloat(heightString)
			//
			// 	let minX = Infinity,
			// 		maxX = -Infinity,
			// 		minY = Infinity,
			// 		maxY = -Infinity
			//
			// 	for (let i = 0; i < def.length; i += 2) {
			// 		minX = Math.min(minX, Number(def[i]))
			// 		maxX = Math.max(maxX, Number(def[i]))
			// 		minY = Math.min(minY, Number(def[i + 1]))
			// 		maxY = Math.max(maxY, Number(def[i + 1]))
			// 	}
			//
			// 	const centerX = (minX + maxX) / 2
			// 	const centerY = (minY + maxY) / 2
			//
			// 	return (
			// 		<Group key={index}>
			// 			<Rect
			// 				x={x}
			// 				y={y}
			// 				width={width}
			// 				height={height}
			// 				cornerRadius={10}
			// 				stroke="#000000"
			// 			/>
			// 			<Text
			// 				x={centerX}
			// 				y={centerY}
			// 				// text={nameEN}
			// 				fontSize={24}
			// 			/>
			// 		</Group>
			// 	)
			// }

			default:
				return null
		}
	})

	return <div>{seatElements}</div>
}

export default SeatItem

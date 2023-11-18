import React, { FC, useEffect, useRef, useState } from "react"
import classes from "./SeatMap.module.sass"
import PriceList from "../../../Prices/PriceList/PriceList"
import { Label, Layer, Stage, Tag, Text } from "react-konva"
import ControlButtons from "../../../ControlButtons/ControlButtons"
import { changeCursorStyle } from "../../../../helpers/helpers"
import SeatItem from "../SeatItem/SeatItem"

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
    [key: string]: string;
}

export interface konvaEventObject {
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
			rowNum: string
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

interface seat {
	capacity: string
	capacityLeft: string
	def: number[]
	eventPriceId: string
	eventSeatId: string
	name: string
	place: string
	rowNum: string
	type: string
}

const SeatMap: FC<SeatMapProps> = ({ priceList = [], currency = "", onTicketAdd = () => {}, cart = [] }) => {
	const colors: colorList = {
		"Category 1": "#FF6B9B",
		"Category 2": "#65DEB8",
		"Category 3": "#A930FA",
		"Category 4": "#F1532A",
		"Category 5": "#78CAD1",
		"Category 6": "#FF856B",
		"Category 7": "#778CFF"
	}

	const wrapperWidth = 750
	const seatsOffset = wrapperWidth / 2

	const stageRef = useRef<any>(null)

	const [seatsInCart, setSeatsInCart] = useState<string[]>(cart.map((item) => item.ticketId))
	const [zoom, setZoom] = useState({
		x: 0.35,
		y: 0.35
	})
	const [tooltip, setTooltip] = useState<tooltipConfig>({
		visible: false,
		x: 0,
		y: 0,
		text: ""
	})
	const [seats, setSeats] = useState([])

	const handleMouseEnter = (e: konvaEventObject) => {
		changeCursorStyle(stageRef, "pointer")

		const konvaEvent = e.target

		const { price, currency, category, rowNum, place } = e.target.attrs

		const hoveredElementPos = konvaEvent.getPosition()
		const hoveredElementRadius = konvaEvent.attrs.radius

		const parsedRowNumber = rowNum.replace("V", "")

		setTooltip({
			visible: true,
			x: hoveredElementPos.x,
			y: hoveredElementPos.y - hoveredElementRadius,
			text: `${price} ${currency} \n${category} \nRow ${parsedRowNumber} Place ${place}`
		})
	}

	const handleMouseLeave = () => {
		changeCursorStyle(stageRef, "default")

		setTooltip({
			...tooltip,
			visible: false
		})
	}

	const onZoom = (type: string) => {
		switch (type) {
			case "+":
				setZoom((prevState) => ({
					x: prevState.x + 0.25,
					y: prevState.y + 0.25
				}))
				break
			case "-":
				setZoom((prevState) => ({
					x: prevState.x - 0.25,
					y: prevState.y - 0.25
				}))
				break
			default:
				break
		}
	}

	async function svgParser() {
		const response = await fetch("/static/media/stage.6a492f3c92905d088c63fc3b809294f1.svg")
		const svgContent = await response.text()

		const xmlDoc = new DOMParser().parseFromString(svgContent, "text/xml").querySelector("g")

		const models: any = []

		Array.from(xmlDoc!.children).forEach((child) => {
			const defineLabel = () => {
				if (typeof decoder() === "object") {
					return decoder().valueEN
				}
			}

			const decoder = () => {
				const encodedName = child.getAttribute("data-definition")
				if (!encodedName) {
					return child.textContent
				}

				const dataDefinitionDecoded = decodeURIComponent(encodedName)

				try {
					const dataDefinition = JSON.parse(dataDefinitionDecoded)
					return dataDefinition.name
				} catch (e) {
					console.error("Error parsing JSON:", e)
					return null
				}
			}

			const definition = () => {
				const width = child.getAttribute("width")
				const height = child.getAttribute("height")
				const x = child.getAttribute("x")
				const y = child.getAttribute("y")

				if (child.tagName === "path") {
					return [child.getAttribute("d")]
				} else if (type(child) === "floor") {
					return [x, y, width, height]
				} else if (child.tagName === "ellipse") {
					return [Number(child.getAttribute("cx")), Number(child.getAttribute("cy"))]
				} else if (type(child) === "stage") {
					return [x, y, width, height]
				} else if (type(child) === "label") {
					return [x, y, width, height]
				} else {
					return [Number(child.getAttribute("x")), Number(child.getAttribute("y"))]
				}
			}

			const type = (child: Element): string | undefined => {
				const seat = child.tagName === "ellipse"
				const row = false
				const floor = child.tagName === "rect" && !!child.getAttribute("data-capacity")
				const stage = defineLabel() === "Stage"
				const table = child.tagName === "rect" && !child.getAttribute("data-definition")
				const area = false
				const line = child.tagName === "path"
				const label = defineLabel() !== "Stage" && defineLabel() !== undefined

				const typeMapping: { [key: string]: boolean } = {
					seat: seat,
					row: row,
					floor: floor,
					stage: stage,
					table: table,
					area: area,
					line: line,
					label: label
				}

				return Object.keys(typeMapping).find((key) => typeMapping[key]) || undefined
			}

			const model = {
				eventSeatId: child.getAttribute("id"),
				capacity: child.getAttribute("data-capacity"),
				rowNum: child.getAttribute("rownum"),
				place: child.getAttribute("data-place"),
				type: type(child),
				def: definition(),
				name: decoder() ?? child.textContent
			}
			models.push(model)
		})
		return models
	}

	// const limits = (limit: string) => {
	// 	let maxValue = 0
	// 	seats.forEach((seat: seat) => {
	// 		const [x, y] = seat.def
	// 		console.log(seat)
	// 		if (limit === "x" && x > maxValue) {
	// 			maxValue = x
	// 		} else if (limit === "y" && y > maxValue) {
	// 			maxValue = y
	// 		}
	// 	})
	// 	return maxValue
	// }

	const dragBoundFunc = (pos: { x: number; y: number }) => {
		const imageWidth = 2000
		const imageHeight = 2000

		let newX = Math.min(pos.x, 0)
		let newY = Math.min(pos.y, 0)

		newX = Math.max(newX, wrapperWidth - imageWidth * zoom.x)
		newY = Math.max(newY, 500 - imageHeight * zoom.y)

		return {
			x: newX,
			y: newY
		}
	}

	useEffect(() => {
		setSeatsInCart(cart.map((item) => item.ticketId))

		svgParser().then((data) => {
			setSeats(data)
		})
	}, [cart])

	return (
		<div className={classes.seatMap}>
			<PriceList
				prices={priceList}
				currency={currency}
			/>
			<div className={classes.hallLayout}>
				<Stage
					scale={{
						x: zoom.x,
						y: zoom.y
					}}
					onMouseEnter={() => changeCursorStyle(stageRef, "grab")}
					onMouseLeave={() => changeCursorStyle(stageRef, "default")}
					onMouseDown={() => changeCursorStyle(stageRef, "grabbing")}
					onMouseUp={() => changeCursorStyle(stageRef, "grab")}
					draggable
					width={wrapperWidth}
					height={1000}
					ref={stageRef}
					dragBoundFunc={(pos) => dragBoundFunc(pos)}
				>
					<Layer
						x={seatsOffset}
						id="seats"
					>
						<SeatItem
							seats={seats}
							seatsInCart={seatsInCart}
							handleMouseEnter={handleMouseEnter}
							handleMouseLeave={handleMouseLeave}
							onTicketAdd={onTicketAdd}
							colors={colors}
						/>

						{tooltip.visible && (
							<Label
								x={tooltip.x}
								y={tooltip.y}
							>
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
									fontSize={12}
									align="center"
									lineHeight={1.25}
									padding={8}
									fill="black"
								/>
							</Label>
						)}
					</Layer>
				</Stage>
				<ControlButtons
					onZoom={onZoom}
					zoom={zoom}
				/>
			</div>
		</div>
	)
}

export default SeatMap

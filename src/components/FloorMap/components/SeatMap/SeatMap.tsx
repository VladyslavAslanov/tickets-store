import React, { FC, useEffect, useRef, useState } from "react"
import seatModel from "../../../../models/seats_model.json"
import priceModel from "../../../../models/price_model.json"
import classes from "./SeatMap.module.sass"
import PriceList from "../../../Prices/PriceList/PriceList"
import { Label, Layer, Rect, Stage, Tag, Text } from "react-konva"
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

	const seats = seatModel.content

	const wrapperWidth = 750
	const seatsOffset = wrapperWidth / 2

	const stageRef = useRef<any>(null)

	const [seatsInCart, setSeatsInCart] = useState<string[]>(cart.map((item) => item.ticketId))
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

	const handleMouseEnter = (e: konvaEventObject) => {
		changeCursorStyle(stageRef, "pointer")

		const konvaEvent = e.target

		const { price, currency, category, rowNum, place } = e.target.attrs

		const hoveredElementPos = konvaEvent.getPosition()
		const hoveredElementRadius = konvaEvent.attrs.radius

		setTooltip({
			visible: true,
			x: hoveredElementPos.x,
			y: hoveredElementPos.y - hoveredElementRadius,
			text: `${price} ${currency} \n${category} \nRow ${rowNum} Place ${place}`
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

	useEffect(() => {
		setSeatsInCart(cart.map((item) => item.ticketId))
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
					onMouseUp={() => changeCursorStyle(stageRef, "pointer")}
					draggable
					width={wrapperWidth}
					height={500}
					ref={stageRef}
					style={{ border: "1px solid red" }}
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

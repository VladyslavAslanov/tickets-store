import React, {FC} from 'react';
import classes from './ControlButtons.module.sass'
import {Icon} from "@iconify/react";
import classNames from "classnames";

interface ControlButtonsProps {
    onZoom: (type: string) => void,
    zoom: {
        x: number
        y: number
    }
}

const ControlButtons: FC<ControlButtonsProps> = ({
                                                     onZoom = () => {
                                                     },
                                                     zoom = {x: 1, y: 1}
                                                 }) => {
    const buttonPlusStyles = classNames(classes.button, {
        [classes.cursorPointer]: !((zoom.x || zoom.y) >= 2)
    })
    const buttonMinusStyles = classNames(classes.button, {
        [classes.cursorPointer]: !((zoom.x || zoom.y) <= 1)
    })

    return (
        <div className={classes.controlButtons}>
            <div className={classes.magnificationButtons}>
                <button
                    className={buttonPlusStyles}
                    onClick={() => onZoom("+")}
                    disabled={(zoom.x || zoom.y) >= 2}>
                    <Icon icon="ic:baseline-plus" width={30} height={30}/>
                </button>
                <div className={classes.divider}/>
                <button
                    className={buttonMinusStyles}
                    onClick={() => onZoom("-")}
                    disabled={(zoom.x || zoom.y) <= 1}>
                    <Icon icon="ic:baseline-minus" width={30} height={30}/>
                </button>
            </div>
        </div>
    );
};

export default ControlButtons;

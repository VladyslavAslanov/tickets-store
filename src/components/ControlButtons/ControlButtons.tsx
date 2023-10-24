import React from 'react';
import classes from './ControlButtons.module.sass'
import ScrollButton from "./Components/ScrollButton/ScrollButton";
import MagnificationButtons from "./Components/MagnificationButton/MagnificationButtons";

const ControlButtons = () => {
    return (
        <div className={classes.controlButtons}>
            <MagnificationButtons/>
            <ScrollButton/>
        </div>
    );
};

export default ControlButtons;

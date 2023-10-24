import React from 'react';
import classes from './MagnificationButtons.module.sass'
import {Icon} from '@iconify/react';

const MagnificationButtons = () => {
    return (
        <div className={classes.magnificationButtons}>
            <button className={classes.button}>
                <Icon icon="ic:baseline-plus" width={30} height={30}/>
            </button>
            <div className={classes.divider}/>
            <button className={classes.button}>
                <Icon icon="ic:baseline-minus" width={30} height={30}/>
            </button>
        </div>
    );
};

export default MagnificationButtons;

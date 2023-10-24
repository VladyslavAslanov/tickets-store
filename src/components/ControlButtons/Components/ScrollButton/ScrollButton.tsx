import React from 'react';
import classes from './ScrollButton.module.sass'
import {Icon} from '@iconify/react';

const ScrollButton = () => {
    return (
        <button className={classes.scrollButton}>
            <Icon icon="clarity:arrow-line" rotate={2} width={35} height={35}/>
        </button>
    );
};

export default ScrollButton;

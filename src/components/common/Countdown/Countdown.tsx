import React, {FC, useEffect, useState} from 'react';
import {Icon} from '@iconify/react';
import classes from './Countdown.module.sass'

interface CountdownProps {
    onCancelPurchase: () => void
}

const Countdown: FC<CountdownProps> = ({
                                           onCancelPurchase = () => {
                                           }
                                       }) => {
    const [seconds, setSeconds] = useState<number>(30);
    const [isActive, setIsActive] = useState<boolean>(true);


    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else {
                    setIsActive(false);
                    if (interval) clearInterval(interval);
                    onCancelPurchase();
                }
            }, 1000);
        } else {
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, seconds, onCancelPurchase]);


    return (
        <div className={classes.countdown}>
            <Icon icon="material-symbols:timer" color="white"/>
            <span className="time">
                {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
            </span>
        </div>
    );
};

export default Countdown;

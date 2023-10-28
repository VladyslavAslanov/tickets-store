import React, {FC} from 'react';
import classes from './Row.module.sass'

interface RowProps {
    children: React.ReactNode,
    offsetRight: boolean,
    offsetLeft: boolean
}

const Row: FC<RowProps> = ({
                               children = null,
                               offsetRight = false,
                               offsetLeft = false
                           }) => {
    return (
        <div className={classes.row}>
            {children}
        </div>
    );
};

export default Row;

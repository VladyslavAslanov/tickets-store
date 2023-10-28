import React, {FC} from 'react';
import classes from './Subheading.module.sass'

interface SubheadingProps {
    subheading: string
}

const Subheading: FC<SubheadingProps> = ({
                                             subheading = ""
                                         }) => {
    return (
        <div className={classes.subheading}>
            {subheading}
        </div>
    );
};

export default Subheading

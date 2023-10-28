import React, {FC} from 'react';
import classes from "./PolicyNote.module.sass";

const PolicyNote: FC = () => {
    return (
        <p className={classes.policyNote}>
            {`By purchasing tickets, I hereby agree with the Terms and conditions Relivent and I acknowledge the `}
            <a href="https://relivent.eu/info/privacy-policy/"
               rel="noreferrer"
               target="_blank"
               className={classes.policyLink}>
                Privacy Policy
            </a>
        </p>
    );
};

export default PolicyNote;

import React, {FC} from 'react';
import classes from './OrderDetails.module.sass'
import { Icon } from '@iconify/react';

interface OrderDetailsProps {
    numberOfTickets: number
    currency: string
    taxFee: number
    serviceFee: number
    totalPrice: number
}

const OrderDetails: FC<OrderDetailsProps> = ({
                                                 numberOfTickets = null,
                                                 currency = "",
                                                 taxFee = null,
                                                 serviceFee = null,
                                                 totalPrice = null
                                             }) => {
    return (
        <div className={classes.orderDetails}>
            <div className={classes.sectionWrapper}>
                <div className={classes.inputIcon}>
                    <Icon icon="ph:ticket-fill" color="white" />
                    <span className={classes.inputText}>We will send the ticket to your email</span>
                </div>
                <input placeholder="Write your email" className={classes.orderInput}/>
            </div>
            <div className={classes.sectionWrapper}>
                <div className={classes.inputIcon}>
                    <Icon icon="mdi:sale-circle" color="white" rotate={1} />
                    <span className={classes.inputText}>I have promo code</span>
                </div>
                <input placeholder="Write code" className={classes.orderInput}/>
            </div>
            <div className={classes.sectionWrapper}>
                {numberOfTickets !== null && numberOfTickets > 1
                    ? <span className={classes.textShaded}>{numberOfTickets} Tickets</span>
                    : <span className={classes.textShaded}>{numberOfTickets} Ticket</span>}
                <div className={classes.itemWrapper}>
                    <span className={classes.textShaded}>Tax fee</span>
                    <span className={classes.textShaded}>{taxFee} {currency}</span>
                </div>
                <div className={classes.itemWrapper}>
                    <span className={classes.textShaded}>Service fee</span>
                    <span className={classes.textShaded}>{serviceFee} {currency}</span>
                </div>
            </div>
            <div className={classes.sectionWrapper}>
                <div className={classes.totalPrice}>
                    <span>Total price</span>
                    <span>{totalPrice} {currency}</span>
                </div>
                <span className={classes.textShaded}>tax is included in the price</span>
            </div>
        </div>
    );
};

export default OrderDetails;

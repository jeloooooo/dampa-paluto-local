import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component{
    constructor() {
        super();
        this.renderOrder = this.renderOrder.bind(this);
    };

    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    };

    renderOrder(key) {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';
        const removeButton = <button onClick={() => this.props.removeFromOrder(key)} >&times;</button>
        const transitionOptions = {
            classNames: "order",
            key,
            timeout: { enter: 500, exit: 500 }
          };

        if(!isAvailable) {
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}>
                        Sorry, {fish ? fish.name : 'fish'} is no longer available!
                        {removeButton}
                    </li>
                 </CSSTransition>
            );
        }

        return (
            <CSSTransition {...transitionOptions}>
                <li key={key}>
                    <span>
                    <TransitionGroup component="span" className="count">
                        <CSSTransition
                            classNames="count"
                            key={count}
                            timeout={{ enter: 500, exit: 500 }} >
                            <span>{count} </span>
                        </CSSTransition>
                    </TransitionGroup>
                         lbs {fish.name} {removeButton}
                    </span>
                </li>
            </CSSTransition>
        );
    };

    render() {
        const orderIds = Object.keys(this.props.order);
        // use reduce to get a single total value
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                // add fish to total
                return prevTotal + count * fish.price;
            }
            return prevTotal; // no fish was added to total
        }, 0); //0 is the initial value of reduce

        return(
            <div className="order-wrap">
                <h2>Your Order</h2>
                <TransitionGroup 
                    className="order"
                    component="ul" >
                    {orderIds.map(this.renderOrder)}                
                </TransitionGroup>     
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>         
            </div>
        );
    }
}

export default Order;
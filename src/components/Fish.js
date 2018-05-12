import React from 'react';
import PropTypes from "prop-types";
import { formatPrice } from '../helpers'; //import the function only

class Fish extends React.Component {
    // If you are using a Babel transform like transform-class-properties , 
    // you can also declare defaultProps as static property within a React component class.
    static propTypes = {
        details: PropTypes.shape({
          image: PropTypes.string,
          name: PropTypes.string,
          desc: PropTypes.string,
          status: PropTypes.string,
          price: PropTypes.number
        }),
        addToOrder: PropTypes.func
      };

    render () {
        // ES6 destructuring
        const { image, name, price, desc, status } = this.props.details;
        // or
        //const details = this.props.details;
        //const index = this.props.index;

        const isAvailable = status === 'available';
        const buttonText = isAvailable ? 'Add To Order' : 'Wala Na!';
        return (
            <li className="menu-fish">
                <img src={image} alt={name} />
                <h3 className="fish-name">
                    {name}
                    <span className="price">
                        {formatPrice(price)}
                    </span>
                </h3>
                <p>{desc}</p>
                <button 
                    // () => arrow function allows us to pass a parameter
                    // to a props function without immediately triggering it on page load
                    onClick={() => this.props.addToOrder(this.props.index)} 
                    disabled={!isAvailable}>
                    {buttonText}
                </button>
            </li>
        );    
    }

}

export default Fish;
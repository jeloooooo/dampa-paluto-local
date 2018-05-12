import React from 'react';
import { getFunName } from '../helpers';
import PropTypes from "prop-types";

class StorePicker extends React.Component{
    // constructor is also used to implicitly bind other methods in this component
    constructor() {
        super();
        this.goToStore = this.goToStore.bind(this);
        this.myInput = React.createRef();
    }

    static propTypes = {
        history: PropTypes.object
      };
    
    goToStore(event) {
        // stop the form from submitting/refreshing page
        event.preventDefault(); 

        // grab text from box
        const storeName = this.myInput.current.value;

        // transition from / to /store/:storeId
        this.props.history.push(`/store/${storeName}`);
    };

    render() {
        return ( 
            // Add parentheses if return will be multi-line
            // render() is automatically bound to the component, that's why we can use 'this' inside of it
            <form className="store-selector" onSubmit={this.goToStore}>
                {/* This is a comment inside jsx*/}
                <h2>Please Enter A Store</h2>
                <input 
                    type="text" 
                    required 
                    placeholder="Store Name" 
                    defaultValue={getFunName()} 
                    //ref={(input) => { this.storeInput = input }}
                    ref={this.myInput}
                    />
                <button type="submit">Visit Store -></button>
            </form>
        )
    };
}


export default StorePicker;
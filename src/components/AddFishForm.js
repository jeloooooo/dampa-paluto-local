import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component{
    constructor() {
        super();
        this.createFish = this.createFish.bind(this);
        this.nameRef = React.createRef();
        this.priceRef = React.createRef();
        this.statusRef = React.createRef();
        this.descRef = React.createRef();
        this.imageRef = React.createRef();
    }
    
    // typechecking, ensures addFish is a function
    // propTypes are only checked in development mode
    static propTypes = {
        addFish: PropTypes.func
      };

    createFish(event) {
        event.preventDefault();

        // create the fish object from refs
        const fish = {
            name: this.nameRef.current.value,
            price: this.priceRef.current.value,
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value,
        }

        // Add fish to state
        this.props.addFish(fish);

        // Clear form values
        event.currentTarget.reset();
    }

    render() {
        return(
            <form className="fish-edit" onSubmit={this.createFish} >
                <input ref={this.nameRef} type="text" placeholder="Fish Name" />
                <input ref={this.priceRef} type="text" placeholder="Fish Price" />
                <select ref={this.statusRef}>
                    <option value="available">Meron Pa!</option>
                    <option value="unavailable">Wala Na!</option>
                </select>
                <textarea ref={this.descRef} type="text" placeholder="Fish Desc"></textarea>
                <input ref={this.imageRef} type="text" placeholder="Fish Image" />
                <button type="submit">+ Add Item</button>
            </form>
        )
    }
}

export default AddFishForm;
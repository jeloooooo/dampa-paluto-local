import React from 'react';
import PropTypes from "prop-types";
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component{
    constructor() {
        super();
        // getinitialState
        this.state = {
            fishes: {},
            order: {}
        }

        //bind the functions
        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
    }

    static propTypes = {
        match: PropTypes.object
      };

    componentDidMount() {
        // this runs before the <app></app> is rendered
        const { params } = this.props.match;
        
        // do not load local storage if this is an online store
        if (!`${params.storeId}/fishes`.includes('online'))
        {
            // first reinstate our localStorage
            const localStorageRef = localStorage.getItem(params.storeId);
            if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
            }
        }
    
        // only the fishes get to be sync with firebase
        this.ref = base.syncState(`${params.storeId}/fishes`, {
          context: this,
          state: "fishes"
        });

        if (`${params.storeId}/fishes`.includes('online'))
        {
            this.ref2 = base.syncState(`${params.storeId}/order`, {
                context: this,
                state: "order"
              });
        }
      }

    // remove binding in case we switch store
    componentWillUnmount() {
        base.removeBinding(this.ref);
        base.removeBinding(this.ref2);
    }

    componentDidUpdate() {
        const { params } = this.props.match;
        // do not load local storage if this is an online store
        if (!`${params.storeId}/fishes`.includes('online'))
        {
            localStorage.setItem(
            params.storeId,
            JSON.stringify(this.state.order)
            );
        }
    }

    addFish(fish) {
        // take a copy of the existing state
        const toBeUpdatedFishes = {...this.state.fishes};
        // add in our new fish
        const timestamp = Date.now();
        toBeUpdatedFishes[`fish-${timestamp}`] = fish;
        // set state
        this.setState({ fishes: toBeUpdatedFishes})
        // OR
        // this.setState({ fishes: fishes})
        // OR
        // this.setState({ fishes })
    }

    updateFish(key, updatedFish) {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }

    removeFish(key) {
        const fishes = {...this.state.fishes}
        //delete fishes[key];
        fishes[key] = null; //firebase delete
        this.setState({ fishes });
    }

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder(key) {
        // take a copy of our state
        const order = {...this.state.order};
        // update or add the new number of fish ordered
        order[key] = order[key] + 1 || 1; // if fish is already added, +1 it. If add new 1
        // update our state
        this.setState({ order });
        // OR
        // this.setState({ order: order })
    }

    removeFromOrder(key) {
        const { params } = this.props.match;
        const order = {...this.state.order};
        console.log(`${params.storeId}/fishes`.includes('online') );
        `${params.storeId}/fishes`.includes('online') ? order[key] = null : delete order[key];//firebase delete
        this.setState({ order });
    }

    render() {
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Paluto"/>
                        <ul className="fishes">
                            {
                                // Make the state.fishes an array
                                // so we can iterate over it
                                Object
                                    .keys(this.state.fishes)
                                    .map(key => // key is for React, index is for you. deal wiht it
                                            (<Fish key={key} 
                                                    index={key}
                                                    details={this.state.fishes[key]}
                                                    addToOrder={this.addToOrder} />)
                                        )
                            }
                        </ul>
                </div>
                <Order fishes={this.state.fishes} 
                        order={this.state.order}
                        params={this.props.params}
                        removeFromOrder={this.removeFromOrder}
                        />
                <Inventory addFish={this.addFish} 
                            loadSamples={this.loadSamples}
                            fishes={this.state.fishes}
                            updateFish={this.updateFish}
                            removeFish={this.removeFish}
                            storeId={this.props.match.params.storeId} />
            </div>
        );
    }
}

export default App;
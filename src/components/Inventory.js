import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import firebase from "firebase";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component{

    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
        storeId: PropTypes.string.isRequired
      };

    state = {
        uid: null,
        owner: null
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            this.authHandler({ user });
          }
        });
      }

    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    };

    authHandler = async authData => {
        // 1 .Look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, { context: this});
        //console.log(store);
        // 2. Claim it if there is no owner
        if (!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        // 3. Set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
    };

    logout = async () => {
        console.log("Logging Out! Adios");
        await firebase.auth().signOut();
        // cleat uid in state
        this.setState({ uid: null });
    };

    render() {
        // logout button
        const logout = <button onClick={this.logout}>Log Out!</button>;

        // 1. Check if they are logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />;
        }

        // 2. check if they are not the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry you are not the owner! :(</p>
                    {logout}
                </div>
            );
        }

        // 3. They must be the owner, just render the inventory
        return(
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {/* looop through the fishes*/}
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm
                        key={key}
                        index={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                        removeFish={this.props.removeFish}
                    />
                ))}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>          
        )
    }
}

export default Inventory;
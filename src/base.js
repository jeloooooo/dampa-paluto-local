import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB_HZQgpaijLNYlMMb94LMFoWR9Ymui9TE",
    authDomain: "dampa-paluto.firebaseapp.com",
    databaseURL: "https://dampa-paluto.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;

// let's go!
import React from 'react';
// Import the render function only
import { render } from 'react-dom'; 
// Import below can also be used
// import ReactDom from 'react-dom'; 
// this will be called like ReactDom.render(....)
import Router from "./components/Router";
import "./css/style.css";

render(<Router/>, document.querySelector('#main'));
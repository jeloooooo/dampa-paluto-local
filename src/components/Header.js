import React from 'react';
import PropTypes from "prop-types";

//class Header extends React.Component 
// Converted to a Stateless Functional Component
// since we will not be adding ano other functions in here.
// Component is only used for rendering html in DOM
const Header = (props) => {
    return(
        <header className="top">
            <h1>
                Huli 
                <span className="ofThe">
                    <span className="of">of</span> 
                    <span className="the">the</span> 
                </span>
                Day
            </h1>
            <h3 className="tagline"><span>{props.tagline}</span></h3>
        </header>
    )
};

Header.propTypes = {
    // this should be a string and required
    // only shows in development 
    tagline: PropTypes.string.isRequired
};

export default Header;
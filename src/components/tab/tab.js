import React, { Component } from 'react';

// import SwitchTab from './switch_tab.js';

import './tab.css';

export default class Tab extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        onClos: this.props.onClose
    }

    onClose = (e) =>{
        e.stopPropagation();
        this.state.onClos();
    }

    


    render() {
        const { nameWP, text, onSwitch} = this.props;
        // let tabs = window.parent.document.getElementById('panel_WP');
        return (
            <span id={nameWP} className="tab_wp tab_wp_active" onClick={onSwitch}>
                <span>{text ? text : 'Tab'}</span>
                <span onClick={(e) =>this.onClose(e)}> X</span>
            </span>
        )
    }
}
import React, { Component } from 'react';

// import SwitchTab from './switch_tab.js';

import './tab.css';

export default class Tab extends Component {

    state = {
        onClos: this.props.onClose
    }

    onClose = (e) =>{
        e.stopPropagation();
        this.state.onClos();
    }

    
    render() {
        const {id_t, nameWP, text, onSwitch, clas} = this.props;
        const id_tab = `${nameWP}_${id_t}`
        // let tabs = window.parent.document.getElementById('panel_WP');
        return (
            <span id={id_tab} className={clas} onClick={onSwitch}>
                <span>{text ? text : 'Tab'}</span>
                <span onClick={(e) =>this.onClose(e)}> X</span>
            </span>
        )
    }
}
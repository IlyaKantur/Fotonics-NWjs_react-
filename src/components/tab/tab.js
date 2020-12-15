import React, { Component } from 'react';

// import SwitchTab from './switch_tab.js';

import './tab.css';

export default class Tab extends Component {

    switch = (id) => {
        console.log(`Click tab: ${id}`)
        // SwitchTab.switchTab(id)
    }

    close = (event) => {
        event.stopPropagation();
        console.log("Click close tab")
    }

    render() {
        const {nameWP, text} = this.props;
        let tabs = window.parent.document.getElementById('panel_WP');

        return (
            <span id={nameWP} className="tab_wp tab_wp_active" onClick={() =>{this.switch(nameWP)}}>
                <span>{text ? text : 'Tab'}</span>
                <span  onClick={this.close}> X</span>
            </span>
        )

    }
}
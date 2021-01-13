import React, { Component } from 'react';

import "./alert.css";

export default class Alert extends Component {

    render() {
        const { activeAlert } = this.props;
        return (
            <div id = "alert_Cont">
                <Al activeAlert = {activeAlert}></Al>
            </div>
            
        )
    }
}

const Al = ({ activeAlert }) => {
    const element = activeAlert.map((item) => {
        const {text, id} = item
        return (
            <div key = {id}>
                <div id={`alert_win_${id}`} className = 'alert_win'>
                    <span id={`alert_text_${id}`} className = 'alert_text'>{text}</span>
                </div>
            </div>
        )
    })
    return(
        element
    )
}

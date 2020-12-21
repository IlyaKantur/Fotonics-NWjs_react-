import React, { Component } from 'react';

export default class Coor extends Component{
    render(){
        return(
            <ul id="coor" className="bar">
                <div id="coordinatesPanel"></div>
                <div id="CPButtom">
                    <button id="apply_Coor">Применить</button>
                    <button id="return_Coor">Отмена</button>
                </div>
            </ul>
        )
    }
}
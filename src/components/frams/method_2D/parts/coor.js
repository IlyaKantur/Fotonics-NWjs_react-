import React, { Component } from 'react';

export default class Coor extends Component{
    render(){
        const {massum, applyCoor, returnCoor} = this.props;
        return(
            <ul id="coor" className="bar">
                <div id="coordinatesPanel">
                    <Coordinat
                        massum = {massum}
                    ></Coordinat>
                </div>
                <div id="CPButtom">
                    <button id="apply_Coor" onClick = {applyCoor}>Применить</button>
                    <button id="return_Coor" onClick = {returnCoor}>Отмена</button>
                </div>
            </ul>
        )
    }
}
const Coordinat = ({massum}) => {
    const element = massum.map((count, x) =>{
        return(
            <div key = {`x_${x}`} >
                <div className = 'coor_element'>    x: {x}   y:</div> 
                <div className = 'coor_element'> 
                    <input 
                        className = 'y_input' 
                        id = {`x_${x}`} 
                        type="text" 
                        defaultValue = {count}
                    />
                </div>
            </div>
        )
    })
    return(
        element
    )
}
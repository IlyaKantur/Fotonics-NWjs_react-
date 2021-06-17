import React, { PureComponent } from 'react';

export default class Coor extends PureComponent {
    render() {
        const { className, masx, massum, applyCoor, returnCoor } = this.props;
        return (
            <ul id="coor_2D" className={`bar ${className}`}>
                <div id="coordinatesPanel">
                    <Coordinat
                        masx={masx}
                        massum={massum}
                    ></Coordinat>
                </div>
                <div id="CPButtom_2D">
                    <button id="apply_Coor_2D" onClick={applyCoor}>Применить</button>
                    <button id="return_Coor_2D" onClick={returnCoor}>Отмена</button>
                </div>
            </ul>
        )
    }
}
const Coordinat = ({ masx, massum }) => {
    const element = massum.map((count, i) => {
        return (
            <div key={`x_${i}`} >
                <div className='coor_element_2D'>
                    x: <div className='x_element_2D'>{masx[i]}</div>
                    y: <input
                            className='y_input_2D'
                            id={`x_${i}`}
                            type="text"
                            defaultValue={count}
                        />
                </div>
            </div>
        )
    })
    return (
        element
    )
}
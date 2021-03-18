import React, { Component } from 'react';

import Plotly from 'plotly.js/lib/core';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

import './method_1D.css';

export default class Method_1D extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        data: [],
        revision: 0
    }

    reloadData = (masx, massum) => {
        const data = [
            {
                x: masx,
                y: massum,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' }
            }];
        this.setState({
            data: data,
            revision: this.state.revision + 1
        })
    }

    render() {
        const { revision } = this.state;
        const data = [];
        const massum = [];
        return (
            <div id="work_panel">
                <div id="control_panel">
                    <h3>Файл</h3>
                    <button>Открыть</button>
                    <button>Сохранить</button>
                    <h3>Обработка</h3>
                    <button>Суммировать</button>
                </div>
                <div id="view_panel">
                    <div id="graph">
                        <Plot
                            data={data}
                            graphDiv="graph"
                            layout={{ title: 'Intensivity', datarevision: { revision }, width: 800, height: 600 }}
                            revision={revision}
                        />
                    </div>
                    <div>
                        <Coor
                            massum={massum}
                        ></Coor>
                    </div>

                </div>
            </div>

        )
    }
}

class Coor extends Component {
    render() {
        const { massum } = this.props;
        return (
            <div id="coorPanel">
                <Coordinat
                    massum={massum}
                ></Coordinat>
            </div>
        )
    }
}
const Coordinat = ({ massum }) => {
    const element = massum.map((count, x) => {
        return (
            <div key={`x_${x}`} >
                <div className='coor_element'>    x: {x}   y:</div>
                <div className='coor_element'>
                    <input
                        className='y_input'
                        id={`x_${x}`}
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
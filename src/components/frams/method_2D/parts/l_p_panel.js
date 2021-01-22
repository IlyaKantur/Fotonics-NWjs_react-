import React, { Component } from 'react';
import Bars from './bars.js';
import Coor from './coor.js';
import Console from '../../../console/console.js';

import Plotly from 'plotly.js/lib/core';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);



export default class L_P_Panel extends Component {

    state = {
        active_l_t: 1,
    }

    switch_l_t = (id) => {
        this.setState({
            active_l_t: id
        })
    }

    render() {
        const { loadFolder, loadFoldImg, loadFonImg, startPush, massum, applyCoor, returnCoor, data, consoleMessage, onConsoleMessage } = this.props;
        const { active_l_t } = this.state;
        let element, button_active_1, button_active_2;
        if (active_l_t == 1) {
            element = <Bars
                loadFolder={loadFolder}
                loadFoldImg={loadFoldImg}
                loadFonImg={loadFonImg}
                startPush={startPush}
            ></Bars>;
            button_active_1 = "button_active";
            button_active_2 = "";
        }
        else {
            element = <Coor
                massum={massum}
                applyCoor={applyCoor}
                returnCoor={returnCoor}
            >
            </Coor>
            button_active_1 = "";
            button_active_2 = "button_active";
        }
        return (
            <div id="l_p_panel">
                <div id="left_Panel" className="panel">
                    <div id="wrapper">
                        <button id="TabOne" className={button_active_1} target="#TabOne" onClick={() => this.switch_l_t(1)}>P</button>
                        <button id="TabTwo" className={button_active_2} target="#TabTwo" onClick={() => this.switch_l_t(2)}>C</button>
                    </div>
                    {element}
                </div>
                <div id="midle_Panel">
                    <div id="up_Panel" className="panel">
                        <div id="img">
                            <canvas id="ImgNew"></canvas>
                            <canvas id="ImgSum"></canvas>
                        </div>
                        <div id="graf">
                            <div id="React_Chart">
                                <Grafic data={data}></Grafic>
                            </div>
                            {/* <div id="Graf"> */}

                            {/* <canvas id="myChart">
                                </canvas> */}
                            {/* </div> */}
                        </div>
                        <div id="hidden_elem">
                            <canvas id="hiddenimg"></canvas>
                            <canvas id="hiddenimgsum"></canvas>
                        </div>
                    </div>

                    <div id="bottom_Panel" className="panel">
                        <div id="panel_mid_bot">
                            <div className="tab">Консоль</div>
                        </div>
                        <div id="Consol">
                            <Console
                                consoleMessage = {consoleMessage}
                            ></Console>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
const Grafic = ({ data }) => {
    return (
        <Plot
            data={data}
            layout={{ title: 'Intensivity' }}
        />
    )
}
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
        const { loadFolder, loadFoldImg, loadFonImg, startPush, massum, applyCoor, returnCoor, data, consoleMessage, onConsoleMessage, id_item} = this.props;
        const { active_l_t } = this.state;
        const { id_f, nameF } = id_item;
        const id_f_nameF = `${nameF}_${id_f}`;
        let element, button_active_1, button_active_2, z1, z2;
        if (active_l_t == 1) {
            button_active_1 = "button_active";
            button_active_2 = "";
            z1 = "active_l_t"
            z2 = "l_t"
        }
        else {
            button_active_1 = "";
            button_active_2 = "button_active";
            z1 = "l_t"
            z2 = "active_l_t"
        }
        element =
        <>
            <Bars 
                className = {z1}
                loadFolder={loadFolder}
                loadFoldImg={loadFoldImg}
                loadFonImg={loadFonImg}
                startPush={startPush}
                id_item = {id_item}
            ></Bars>;
            <Coor
                className = {z2}
                massum={massum}
                applyCoor={applyCoor}
                returnCoor={returnCoor}
                id_item = {id_item}
            >
            </Coor>
        </>
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
                            <canvas className = "ImgNew" id={`ImgNew_${id_f_nameF}`}></canvas>
                            <canvas className = "ImgSum" id={`ImgSum_${id_f_nameF}`}></canvas>
                        </div>
                        <div id="graf">
                            <div className = "React_Chart" id={`React_Chart_${id_f_nameF}`}>
                                <Grafic data={data}></Grafic>
                            </div>
                            {/* <div id="Graf"> */}

                            {/* <canvas id="myChart">
                                </canvas> */}
                            {/* </div> */}
                        </div>
                        <div id="hidden_elem">
                            <canvas className = "hiddenimg" id={`hiddenimg_${id_f_nameF}`}></canvas>
                            <canvas className = "hiddenimgsum" id={`hiddenimgsum_${id_f_nameF}`}></canvas>
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
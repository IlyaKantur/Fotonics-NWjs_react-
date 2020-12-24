import React, { Component } from 'react';
import Bars from './bars.js';
import Coor from './coor.js';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

export default class L_P_Panel extends Component {

    state = {
        active_l_t: 1
    }

    switch_l_t = (id) => {
        this.setState({
            active_l_t: id
        })
    }

    render() {
        const { loadFolder, loadFoldImg, loadFonImg, startPush, massum, applyCoor, returnCoor } = this.props;
        const { active_l_t } = this.state;
        const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];
        const renderLineChart = (
            <LineChart width={400} height={300} data={data}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          );
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
                            <div id="Graf">
                                {renderLineChart}
                                {/* <canvas id="myChart">
                                </canvas> */}
                            </div>
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
                        <div id="Consol"></div>
                    </div>
                </div>
            </div>
        )
    }

}


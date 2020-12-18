import React, { Component } from 'react';

import './method_2D.css';

export default class Method_2D extends Component {
    render() {
        return (
            <div id="l_p_panel">
                <div id="left_Panel" className="panel">

                </div>
                <div id="midle_Panel">
                    <div id="up_Panel" className="panel">
                        <div id="img">
                            <canvas id="ImgNew"></canvas>
                            <canvas id="ImgSum"></canvas>
                        </div>
                        <div id="graf">
                            <div id="Graf">
                                <canvas id="myChart"></canvas>
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

Method_2D;
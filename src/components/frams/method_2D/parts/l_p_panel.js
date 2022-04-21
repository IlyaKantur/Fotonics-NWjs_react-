import React, { PureComponent } from 'react';
import Bars from './bars.js';
import Coor from './coor.js';
import Console from '../../../console/console.js';

// import Plotly from 'plotly.js/lib/core';
// import createPlotlyComponent from 'react-plotly.js/factory';
// const Plot = createPlotlyComponent(Plotly);
// import Plot from 'react-plotly.js';



export default class L_P_Panel extends PureComponent {


    state = {
        active_l_t: 1,
    }

    switch_l_t = (id) => {
        this.setState({
            active_l_t: id
        })
    }

    render() {
        const { loadFolder, loadFoldImg, loadFonImg,
            startPush, applyCoor, returnCoor, data,
            revision, consoleMessage, onConsoleMessage,
            id_item, finished, masInformation_2D, stored_value,
            calibration, search_energe, save, smoothing, coor_massum, coor_masx,
            switch_k, Levels, PauseContinue, Stop, style
        } = this.props;
        let { Plot } = this.props;
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
                    className={z1}
                    loadFolder={loadFolder}
                    loadFoldImg={loadFoldImg}
                    loadFonImg={loadFonImg}
                    startPush={startPush}
                    calibration={calibration}
                    search_energe={search_energe}
                    id_item={id_item}
                    masInformation_2D={masInformation_2D}
                    stored_value={stored_value}
                    save={save}
                    smoothing={smoothing}
                    switch_k={switch_k}
                    PauseContinue={PauseContinue}
                    Stop={Stop}
                    style={style}
                ></Bars>;
                <Coor
                    className={z2}
                    masx={coor_masx}
                    massum={coor_massum}
                    applyCoor={applyCoor}
                    returnCoor={returnCoor}
                    id_item={id_item}
                    style={style}
                >
                </Coor>
            </>
        return (
            <div id="l_p_panel">
                <div id="left_Panel" className="panel">
                    <div style={{background: style.left_switch}} className = "left_switch" id="wrapper">
                        <button id="TabOne" className={button_active_1} target="#TabOne" onClick={() => this.switch_l_t(1)}>P</button>
                        <button id="TabTwo" className={button_active_2} target="#TabTwo" onClick={() => this.switch_l_t(2)}>C</button>
                    </div>
                    {element}
                </div>
                <div id="midle_Panel">
                    <div id="up_Panel" className="panel">
                        <div id="img">
                            <canvas className="ImgNew" id={`ImgNew_${id_f_nameF}`}></canvas>
                            <canvas className="ImgSum" id={`ImgSum_${id_f_nameF}`}></canvas>
                        </div>
                        <div id="graf">
                            <Plot_Graph
                                data={data}
                                masInformation_2D={masInformation_2D}
                                Plot = {Plot}
                                revision = {revision}
                            />
                        </div>
                        <div id="hidden_elem">
                            <canvas className="hiddenimg" id={`hiddenimg_${id_f_nameF}`}></canvas>
                            <canvas className="hiddenimgsum" id={`hiddenimgsum_${id_f_nameF}`}></canvas>
                            <canvas className="hiddenimgClear" id={`hiddenimgClear_${id_f_nameF}`}></canvas>
                        </div>
                    </div>

                    <div id="bottom_Panel" className="panel">
                        <div id="panel_mid_bot">
                            <div className="tab">Консоль</div>
                        </div>
                        <div id="Consol">
                            <Console
                                consoleMessage={consoleMessage}
                            ></Console>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

class Plot_Graph extends PureComponent {

    render() {
        const {data, masInformation_2D, revision, Plot} = this.props;
        const config = {displaylogo:false, displayModeBar: false}//помогает но не сильно
        return (
            <div className="React_Chart" id={`React_Chart`}>
                <Plot
                    graphDiv="graph"
                    data={data}
                    layout={{
                        title: masInformation_2D.nameElement, datarevision: { revision },
                        width: 700, height: 525,
                        xaxis: {
                            title: masInformation_2D.AxisX,
                            // showgrid: false,
                            // zeroline: false
                        },
                        yaxis: {
                            title: masInformation_2D.AxisY,
                            // showline: false
                        }
                    }}

                    revision={revision}
                    
                />
            </div>
        )
    }
}

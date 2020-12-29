import React, { Component } from 'react';
import Bars from './bars.js';
import Coor from './coor.js';

// import V, { VictoryBar, VictoryLine, VictoryChart, VictoryTheme, VictoryZoomContainer, VictoryTooltip, VictoryScatter } from 'victory';
// import {ResponsiveLine} from '@nivo/line';
// import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, Crosshair} from 'react-vis';

import { Label, Connector, CircleSubject, LineSubject } from '@visx/annotation';
import { LinePath } from '@visx/shape';
import ExampleControls from './ExampleControls';
import findNearestDatum from './findNearestDatum';

export default class L_P_Panel extends Component {

    state = {
        active_l_t: 1,
        value: false
    }

    switch_l_t = (id) => {
        this.setState({
            active_l_t: id
        })
    }

    render() {
        const { loadFolder, loadFoldImg, loadFonImg, startPush, massum, applyCoor, returnCoor, data } = this.props;
        const { active_l_t, value } = this.state;
        let graph;
        if (data.length != 0) {
            // graph = (
            //     <VictoryChart
            //         theme={VictoryTheme.material}
            //         containerComponent={
            //             <VictoryZoomContainer />
            //         }
            //     >
            //         <VictoryLine
            //             style = {{data: {strokeWidth: 1}}}
            //             data={data}
            //             x='x'
            //             y='y'
            //         />
            //         <VictoryScatter
            //             size={({ active }) => active ? 2 : 1}
            //             labels={({ datum }) => `x:${datum.x} y:${datum.y}`}
            //             labelComponent={<VictoryTooltip />}
            //             data={data}
            //             x='x'
            //             y='y'

            //         />

            //     </VictoryChart>
            // )
            // graph = (
            //     <ResponsiveLine
            //         data={data}
            //         margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            //         xScale={{ type: 'point' }}
            //         yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            //         yFormat=" >-.2f"
            //         axisTop={null}
            //         axisRight={null}
            //         axisBottom={{
            //             orient: 'bottom',
            //             tickSize: 5,
            //             tickPadding: 5,
            //             tickRotation: 0,
            //             legend: 'transportation',
            //             legendOffset: 36,
            //             legendPosition: 'middle'
            //         }}
            //         axisLeft={{
            //             orient: 'left',
            //             tickSize: 5,
            //             tickPadding: 5,
            //             tickRotation: 0,
            //             legend: 'count',
            //             legendOffset: -40,
            //             legendPosition: 'middle'
            //         }}
            //         pointSize={10}
            //         pointColor={{ theme: 'background' }}
            //         pointBorderWidth={2}
            //         pointBorderColor={{ from: 'serieColor' }}
            //         pointLabelYOffset={-12}
            //         useMesh={true}
            //         legends={[
            //             {
            //                 anchor: 'bottom-right',
            //                 direction: 'column',
            //                 justify: false,
            //                 translateX: 100,
            //                 translateY: 0,
            //                 itemsSpacing: 0,
            //                 itemDirection: 'left-to-right',
            //                 itemWidth: 80,
            //                 itemHeight: 20,
            //                 itemOpacity: 0.75,
            //                 symbolSize: 12,
            //                 symbolShape: 'circle',
            //                 symbolBorderColor: 'rgba(0, 0, 0, .5)',
            //                 effects: [
            //                     {
            //                         on: 'hover',
            //                         style: {
            //                             itemBackground: 'rgba(0, 0, 0, .03)',
            //                             itemOpacity: 1
            //                         }
            //                     }
            //                 ]
            //             }
            //         ]}
            //     />
            // )
            // const lineSeriesProps = {
            //     animation: true,
            //     opacityType: 'literal',
            //     strokeWidth: 1,
            //     data,
            //     onNearestX: d => this.setState({value: d})
            //   };
            // graph = (
            //     <div id = 'VIS'>
            //         <XYPlot 
            //             onMouseLeave={() => this.setState({value: false})}
            //             width={700} 
            //             height={600} 
            //         >
            //             <VerticalGridLines />
            //             <HorizontalGridLines />
            //             <XAxis />
            //             <YAxis />
            //             <LineSeries data={data} {...lineSeriesProps}/>
            //             {value && <Crosshair values={[value]} />}
            //         </XYPlot>
            //     </div>

            // )

        }
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
                                {graph}
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

const visx = () =>{
    
}


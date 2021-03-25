import React, { Component } from 'react';

import Plotly from 'plotly.js/lib/core';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

import './method_1D.css';
const fs = window.require('fs');

export default class Method_1D extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        active_tab: 1,
        data: [],
        masDataX: [],
        masDataY: [],
        revision: 0,
        massum: [],
        coor: [],
        data_file: [],
        coor_file: [],
        massum_file: [],
        countSum: 1,
        en_first_point: 0,
        en_second_point: 0,
        n_first_point: 0,
        n_second_point: 0
    }

    switch_tab = (id) => {
        this.setState({
            active_tab: id
        })
    }

    stored_value = (name, value) => {
        this.setState((state) => {
            return state[name] = value
        });
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

    // Начала считывания

    click_loadFolder = () => {
        this.loadFolder(this.loadFolderData).then(({ masData }) => {
            this.complite_data(masData);
        })
    }

    complite_data = (masData) => {
        let masDataX = [], masDataY = [], X = [], Y = [];
        masData.map((item) => {
            for (let i = 0; i < item.length; i++) {
                let xy = item[i].split(' ');
                X[i] = xy[0];
                Y[i] = xy[1];
            }
            masDataX.push(X);
            masDataY.push(Y);

        })
        this.setState({
            masDataX: masDataX,
            masDataY: masDataY
        })

    }

    click_loadFile = () => {
        this.loadFile(this.loadData).then(({ masData }) => {
            this.complite_data(masData);
        })
    }

    loadFile = (loadData) => {
        return new Promise((resolve) => {
            let i = document.createElement('input')
            i.type = 'file'
            i.multiple = true;
            i.click();

            i.onchange = function () {
                let masFold = [];
                let dataFolder = i.files[0].path.replace(i.files[0].name, '');
                for (let j = 0; j < i.files.length; j++) {
                    masFold[j] = i.files[j].name;
                }
                loadData(dataFolder, masFold).then(({ masData }) => {
                    resolve({ masData })
                })
            }
        })
    }


    loadFolder = (loadFolderData) => {
        return new Promise((resolve) => {
            let i = document.createElement('input')
            i.type = 'file';
            i.nwdirectory = 'directory';
            i.click();
            i.onchange = function () {
                let dataFolder = String(this.value)
                loadFolderData(dataFolder).then(({ masData }) => {
                    resolve({ masData })
                })
            }
        })
    }

    loadFolderData = (dataFolder) => {
        return new Promise((resolve) => {
            fs.readdir(dataFolder, (err, masFold) => {
                if (err) {
                    console.error(err);
                    return
                }
                this.loadData(dataFolder, masFold).then(({ masData }) => {
                    resolve({ masData })
                })
            })
        })
    }

    loadData = (dataFolder, masFold) => {
        return new Promise((resolve) => {
            let masData = [];
            for (let i = 0; i < masFold.length; i++) {
                let file = new File(`${dataFolder}/${masFold[i]}`, `${masFold[i]}`)
                let reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function () {
                    let result = reader.result.split('\n');
                    //Пока что пропускать первые 3 строчки
                    result = result.filter(item => !/[a-zа-яё]/i.test(item))
                    result = result.filter(item => item.length !== 0)
                    masData[i] = result;
                    if (i == masFold.length - 1) { resolve({ masData }) }
                }
            }
        })
    }

    // Конец считывания

    click_save = () => {
        const { coor, massum } = this.state;
        const path_save = './result/TestObr/1D/test.dat';

        let file = fs.createWriteStream(path_save);
        file.on('error', function (err) { console.log(err) })
        coor.forEach((item, i) => file.write(`${item} ${massum[i]} \n`));
        file.end();
    }

    click_sum = () => {
        if (this.state.masDataX.length !== 0 && this.state.masDataX.length !== 0) {
            const { masDataX, masDataY, countSum } = this.state;
            let sum = [], coor = [];
            masDataY.map((item, j) => {
                if (j === 0) sum = Array.apply(null, Array(Math.ceil(item.length / countSum))).map(Number.prototype.valueOf, 0);
                let midle = 0, k = 0, x = 0;
                item.map((y, i) => {
                    midle += Number(y);
                    k++;
                    if (k == countSum || i == item.length - 1) {
                        // sum[x] = sum[x] + Math.round(midle/countSum);
                        sum[x] = sum[x] + midle
                        coor[x] = x;
                        k = 0; midle = 0; x++;
                    }
                })
            })
            this.reloadData(coor, sum);
            this.setState({
                coor: coor,
                massum: sum
            })
        }
    }

    click_calibration = () => {
        const { coor, massum, en_first_point, en_second_point, n_first_point, n_second_point } = this.state;
        let del_en = (en_second_point - en_first_point) / (n_second_point - n_first_point);
        let newCoor = [];
        newCoor[0] = en_first_point - del_en.toFixed(5) * n_first_point
        for (let i = 1; i < coor.length; i++) {
            newCoor[i] = Number((newCoor[i - 1] + del_en).toFixed(5));
        }
        this.reloadData(newCoor, massum);
        this.setState({
            coor: newCoor
        })
    }

    render() {
        const { active_tab, data, revision, coor, massum, data_file, coor_file, massum_file, countSum } = this.state;
        let element, button_active_1, button_active_2;
        if (active_tab == 1) {
            button_active_1 = "button_tab_1D button_active_1D";
            button_active_2 = "button_tab_1D";
            let class_HT = 
            element =
                (
                    <div id="sum_graph">
                        <div id="control_panel">
                            <h3>Файл</h3>
                            <div className = {`hidden_menu ${class_HT}`}>
                                <button onClick={this.click_loadFolder}>Папка</button>
                                <button onClick={this.click_loadFile}>Выбрать</button>
                                <button onClick={this.click_save}>Сохранить</button>
                            </div>
                            <h3>Обработка</h3>
                            <div className = {`hidden_menu ${class_HT}`}>
                                <button id="click_sum" onClick={this.click_sum}>Суммировать</button>
                                <input id='countSum' type='number' placeholder="Сумма по"
                                    onChange={(e) => this.stored_value(e.target.id, e.target.value)}
                                    value={countSum}
                                ></input>
                                <button id="click_calibration" onClick={this.click_calibration}>Калибровка</button>
                                <input id='en_first_point' type='number' placeholder="Эн. первой точки"
                                    onChange={(e) => this.stored_value(e.target.id, e.target.value)}
                                ></input>
                                <input id='en_second_point' type='number' placeholder="Эн. второй точки"
                                    onChange={(e) => this.stored_value(e.target.id, e.target.value)}
                                ></input>
                                <input id='n_first_point' type='number' placeholder="N первой точки"
                                    onChange={(e) => this.stored_value(e.target.id, e.target.value)}
                                ></input>
                                <input id='n_second_point' type='number' placeholder="N второй точки"
                                    onChange={(e) => this.stored_value(e.target.id, e.target.value)}
                                ></input>
                                <button id=""></button>
                            </div>
                        </div>
                        <div id="view_panel">
                            <div id="graph">
                                <Plot
                                    data={data}
                                    graphDiv="graph"
                                    layout={{
                                        title: 'Intensivity',
                                        datarevision: { revision },
                                        width: 900, height: 675
                                    }}
                                    revision={revision}
                                />
                            </div>
                            <div>
                                <Coor
                                    coor={coor}
                                    massum={massum}
                                ></Coor>
                            </div>
                        </div>
                    </div>
                )
        }
        else {
            button_active_1 = "button_tab_1D";
            button_active_2 = "button_tab_1D button_active_1D";
            element = (
                <div id="list_graph">
                    <div id="list_file"></div>
                    <div id="view_panel_file">
                        <div id="graph_file">
                            <Plot>
                                data = {data_file}
                            graphDiv="graph"
                            layout={{
                                    title: 'Intensivity',
                                    datarevision: { revision },
                                    width: 900, height: 675
                                }}
                            </Plot>
                        </div>
                        <Coor
                            coor={coor_file}
                            massum={massum_file}
                        ></Coor>
                    </div>

                </div>)
        }

        return (
            <div id="place_1D">
                <div id="left_tab_panel_1D">
                    <button className={button_active_1} onClick={() => { this.switch_tab(1) }}>G</button>
                    <button className={button_active_2} onClick={() => { this.switch_tab(2) }}>C</button>
                </div>
                <div id="work_panel_1D">
                    {element}
                </div>
            </div>
        )
    }
}

class Coor extends Component {
    render() {
        const { coor, massum } = this.props;
        return (
            <div id="coorPanel">
                <Coordinat
                    coor={coor}
                    massum={massum}
                ></Coordinat>
            </div>
        )
    }
}
const Coordinat = ({ coor, massum }) => {
    const element = massum.map((count, x) => {
        return (
            <div key={`x_${x}`} >
                <div className='coor_element'>    <b>X:</b> {coor[x]}   <b>Y:</b> {count}</div>
                {/* <div className='coor_element'>
                    <input
                        className='y_input'
                        id={`x_${x}`}
                        type="text"
                        defaultValue={count}
                    />
                </div> */}
            </div>
        )
    })
    return (
        element
    )
}
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
        data: [],
        masDataX: [],
        masDataY: [],
        revision: 0,
        massum: [],
        countSum: 5
    }

    stored_value = (name, value) =>{
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
                this.loadData(dataFolder, masFold).then((masData) => {
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
                    if (i == masFold.length - 1) { resolve(masData) }
                }
            }
        })
    }

    // Конец считывания

    click_sum = () => {
        if (this.state.masDataX.length !== 0 && this.state.masDataX.length !== 0) {
            const {masDataX, masDataY, countSum} = this.state;
            let sum = [];
            masDataY.map((item, j) => {
                if(j === 0) sum = Array.apply(null, Array(Math.ceil(item.length/countSum))).map(Number.prototype.valueOf, 0);
                let midle = 0, k = 0;
                item.map((y, i) => {
                    midle += Number(y);
                    k++;
                    if(k == countSum || i == item.length - 1)
                    {
                        sum[i] = sum[i] + midle;
                        k = 0;
                        midle = 0;
                    }
                })
            })
            this.reloadData(masDataX[0], sum);
            this.setState({
                massum: sum
            })
        }
    }

    render() {
        const {data ,revision, massum, countSum } = this.state;

        return (
            <div id="work_panel">
                <div id="control_panel">
                    <h3>Файл</h3>
                    <button onClick={this.click_loadFolder}>Папка</button>
                    <button onClick={this.click_loadFile}>Выбрать</button>
                    <button>Сохранить</button>
                    <h3>Обработка</h3>
                    <button onClick = {this.click_sum}>Суммировать</button>
                    <input id = 'countSum' type='number' placeholder="Сумма по" 
                        onChange = {(e) => this.stored_value(e.target.id,e.target.value)}
                        value = {countSum}
                    ></input>
                    <button>Калибровка</button>
                    <h3>Парам. Калибровки</h3>
                    <input id='en_first_point' type='number' placeholder="Эн. первой точки"></input>
                    <input id='en_second_point' type='number' placeholder="Эн. второй точки"></input>
                    <input id='n_first_point' type='number' placeholder="N первой точки"></input>
                    <input id='n_second_point' type='number' placeholder="N второй точки"></input>
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
                <div className='coor_element'>    x: {x}   y: {count}</div>
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
import React, { Component } from 'react';

import Plotly from 'plotly.js/lib/core';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

import './method_1D.css';
const fs = window.require('fs');

export default class Method_1D extends Component {
    constructor(props) {
        super(props)

        this.masData = []
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

// Начала считывания

    click_loadFolder = () => {
        this.loadFolder(this.loadFolderData).then(({masData}) =>{
            this.masData = masData;
            console.log(masData);
        })
    }

    loadFolder = (loadFolderData) => {
        return new Promise((resolve) => {
            let i = document.createElement('input')

            i.type = 'file';
            i.nwdirectory = 'directory';

            i.click();
            i.onchange = function() {
                let dataFolder = String(this.value)
                loadFolderData(dataFolder).then(({masData}) =>{
                    resolve({masData})
                })
            }
        })
    } 

    loadFolderData = (dataFolder) =>{
        return new Promise((resolve) => {
            fs.readdir(dataFolder, (err, masFold) => {
                if (err) {
                    console.error(err);
                    return
                }
                this.loadData(dataFolder, masFold).then((masData) => {
                    resolve({masData})
                })
            })
        })
    }

    // load = (dataFolder, masFold) => {
    //     return new Promise((resolve) => {
    //         masFold.sort(function (a, b){
    //             return a.length - b.length;
    //         });
    //         if (dataFolder[0] == '.') dataFolder = `.${dataFolder}`;
    //         masFold = masFold.map(element => {
    //             return element = `${dataFolder}/${element}`
    //         })
    //         this.loadData(masFold).then(({masData}) => {
    //             resolve({masData})
    //         })
    //     })
    // }

    loadData = (dataFolder, masFold) => {
        return new Promise((resolve) => {
            let masData = [];
            for(let i = 0; i < masFold.length; i++)
            {
                let file = new File(`${dataFolder}/${masFold[i]}`, `${masFold[i]}`)
                let reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function(){
                    let result = reader.result.split('\n');
                    //Пока что пропускать первые 3 строчки
                    result = result.filter(item => !/[a-zа-яё]/i.test(item))
                    masData[i] = result;
                }
                if(i == masFold.length - 1){resolve(masData)}
            }
        })
    }

// Конец считывания

    click_sum = () => {
        
    }

    render() {
        const { revision } = this.state;
        const data = [];
        const massum = [];
        
        return (
            <div id="work_panel">
                <div id="control_panel">
                    <h3>Файл</h3>
                    <button onClick = {this.click_loadFolder}>Папка</button>
                    <button >Выбрать</button>
                    <button>Сохранить</button>
                    <h3>Обработка</h3>
                    <button>Суммировать</button>
                    <h3>Калибровка</h3>
                    <input id = 'en_first_point' type = 'number' placeholder = "Эн. первой точки"></input>
                    <input id = 'en_second_point' type = 'number' placeholder = "Эн. второй точки"></input>
                    <input id = 'n_first_point' type = 'number' placeholder = "N первой точки"></input>
                    <input id = 'n_second_point' type = 'number' placeholder = "N второй точки"></input>
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
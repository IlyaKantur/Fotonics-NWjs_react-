import React, {Component, PureComponent } from 'react';

// import Plotly from 'plotly.js/lib/core';
// import createPlotlyComponent from 'react-plotly.js/factory';
// const Plot = createPlotlyComponent(Plotly);
import Plot from 'react-plotly.js';

import './method_1D.css';
const fs = window.require('fs');

export default class Method_1D extends PureComponent {
    constructor(props) {
        super(props)
        this.masDataX = []
        this.masDataY = []
        this.revision = 0
        this.revision_file = 0
        this.masInformation = {
            method: 'Однокоординатный',
            Title: '',
            nameElement: '',
            checkeds = {
                kA: false,
                kB: false
            },
            AxisX: 'Energy',
            AxisY: 'Intensivnosti',
            countSum: 1,
            en_first_point: 0,
            en_second_point: 0,
            n_first_point: 0,
            n_second_point: 0,
            n_smoothing: 3,
            add_information: ''
        }
        this.nameInformation =
            [
                "Название метода:", "Название элемента:", "ОсьХ:", "ОсьY:", "Суммировать по:",
                "Эпергия первой точки:", "Энергия второй точки:", "Номер первой точки:",
                "Номер второй точки:", "Сглаживание по n точек:", `Дополнительная информация: \n`
            ]
        this.masTab = [{ text: 'Sum_graph' }, { text: 'List_graph' }]
        this.button_active_1 = "button_tab_1D button_active_1D";
        this.button_active_2 = "button_tab_1D";
    }

    state = {
        active_tab: 'Sum_graph',
        data: [],
        massum: [],
        coor: [],
        mas_name_file: [],
        data_file: [],
        coor_file: [],
        massum_file: [],
    }

    switch_tab = (id) => {
        switch (id) {
            case 'Sum_graph':
                this.button_active_1 = "button_tab_1D button_active_1D";
                this.button_active_2 = "button_tab_1D";
                break;
            case 'List_graph':
                this.button_active_1 = "button_tab_1D";
                this.button_active_2 = "button_tab_1D button_active_1D";
                break;
        }
        this.setState({
            active_tab: id
        })
    }

    stored_value = (name, value) => {
        this.masInformation[name] = value
    }

    reloadData = (masx, massum) => {
        const data = [
            {
                x: masx,
                y: massum,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {
                    color: 'rgb(128, 0, 128)',
                    size: 8
                },
                line: {
                    color: 'rgb(128, 0, 128)',
                    width: 1
                }
            }];
        this.revision++
        this.setState({
            massum: massum,
            coor: masx,
            data: data
        })
    }

    // Начала считывания

    click_loadFolder = () => {
        this.loadFolder(this.loadFolderData).then(({ masData, mas_name_file }) => {
            this.complite_data(masData);
            this.setState({
                mas_name_file: mas_name_file
            })
        })
    }

    complite_data = (masData) => {
        let masDataX = [], masDataY = [];
        masData.map((item) => {
            let X = [], Y = [];
            for (let i = 0; i < item.length; i++) {
                let xy = item[i].split(' ');
                X[i] = xy[0];
                Y[i] = xy[1];
            }
            masDataX.push(X);
            masDataY.push(Y);

        })
        this.masDataX = masDataX;
        this.masDataY = masDataY;

    }

    click_loadFile = () => {
        this.loadFile(this.loadData).then(({ masData, mas_name_file }) => {
            this.complite_data(masData);
            this.setState({
                mas_name_file: mas_name_file
            })
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
                    resolve({ masData, mas_name_file: masFold })
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
                loadFolderData(dataFolder).then(({ masData, mas_name_file }) => {
                    resolve({ masData, mas_name_file })
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
                    resolve({ masData, mas_name_file: masFold })
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
        
        const path_save = `./result/TestObr/1D/${this.masInformation.Title ? this.masInformation.Title : 'NoName'}.dat`;

        const file_1D = fs.createWriteStream(path_save);
        file_1D.on('error', function (err) { console.log(err) })
        coor.forEach((item, i) => file_1D.write(`${item} ${massum[i]} \n`));
        file_1D.end();
    }

    click_sum = () => {
        if (this.masDataY.length !== 0) {
            // let date_start = new Date().getTime();
            let sum = [], coor = [], countSum = this.masInformation.countSum;

            this.masDataY.map((item, j) => {
                if (j === 0) sum = Array.apply(null, Array(Math.ceil(item.length / countSum))).map(Number.prototype.valueOf, 0);
                let midle = 0, k = 0, x = 0;
                item.map((y, i) => {
                    midle += Number(y);
                    k++;
                    if (k == countSum || i == item.length - 1) {
                        // sum[x] = sum[x] + Math.ceil(midle / countSum);
                        sum[x] = sum[x] + midle
                        coor[x] = x;
                        k = 0; midle = 0; x++;
                    }
                })
            })
            this.reloadData(coor, sum);
            this.save_protocol()
            // console.log("время обработки: "+(new Date().getTime()-date_start)/1000)
        }
    }

    save_protocol = () => {
        const nameFolderProtocol = this.masInformation.Title || 'NoName';
        const date = new Date();
        const dataProtocol = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        const timeProtocol = `${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`
        const dir = `result/protocol/${nameFolderProtocol}`
        fs.mkdir(dir, err => {
            if (err.code != "EEXIST") { console.log(err); throw err };
            fs.mkdir(`${dir}/${dataProtocol}`, err => {
                if (err.code != "EEXIST") { console.log(err); throw err };
                let file = fs.createWriteStream(`./${dir}/${dataProtocol}/1D_${timeProtocol}.dat`);
                file.on('error', function (err) { console.log(err) })
                // const keys = Object.keys(this.masInformation);
                const values = Object.values(this.masInformation);
                file.write(
                    `Дата записи: ${dataProtocol}\nВремя записи: ${timeProtocol}\n`
                )
                this.nameInformation.forEach((item, i) => { file.write(`${item} ${values[i]} \n`) })
                file.end();
            })
        })
    }

    click_calibration = () => {

        const {baseElement} = this.props;
        const id = baseElement.findIndex((item) => item.name_el == this.masInformation.nameElement)
        if(this.masInformation.kA) console.log(baseElement[id].energy_foto[2])
        else console.log(baseElement[id].energy_foto[4])
        

        // const { coor, massum } = this.state;
        // let del_en = (this.masInformation.en_second_point - this.masInformation.en_first_point) /
        //     (this.masInformation.n_second_point - this.masInformation.n_first_point);
        // let newCoor = [];
        // newCoor[0] = this.masInformation.en_first_point - del_en.toFixed(5) * this.masInformation.n_first_point
        // for (let i = 1; i < coor.length; i++) {
        //     newCoor[i] = Number((newCoor[i - 1] + del_en).toFixed(5));
        // }
        // this.reloadData(newCoor, massum);
    }

    click_smoothing = () => {
        let { massum } = this.state;
        let n = Number(this.masInformation.n_smoothing);

        let sum = 0, del = 3, floor = Math.floor(n / 2);
        for (let i = 1; i < n; i++) {
            for (let j = 0; j < del; j++) {
                sum += massum[j];
            }
            massum[i] = Math.ceil(sum / del);
            del += 2;
        }
        for (let i = n; i < massum.length - floor; i++) {
            sum = 0;
            for (let j = 0; j < n; j++) {
                sum += massum[i + j - floor];
            }
            massum[i] = Math.ceil(sum / n);
        }
        this.reloadData(this.state.coor, massum);
    }

    click_graph_file = (id) => {
        const data = [
            {
                x: this.masDataX[id],
                y: this.masDataY[id],
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' }
            }];
        this.revision_file++
        this.setState({
            data_file: data,
            coor_file: this.masDataX[id],
            massum_file: this.masDataY[id]
        })
    }

    render() {
        const {
            active_tab, coor, massum, coor_file, massum_file,
            mas_name_file, revision, data, data_file
        } = this.state;
        const elements = this.masTab.map((item) => {
            const { text } = item;
            let clas, element;
            if (text === active_tab) { clas = 'tab_1D tab_1D_active' }
            else { clas = 'tab_1D' }
            switch (text) {
                case 'Sum_graph':
                    element = <Sum_graph
                        click_loadFolder={this.click_loadFolder}
                        click_loadFile={this.click_loadFile}
                        click_save={this.click_save}
                        click_sum={this.click_sum}
                        stored_value={this.stored_value}
                        click_calibration={this.click_calibration}
                        click_smoothing={this.click_smoothing}
                        data={data}
                        revision={revision}
                        coor={coor}
                        massum={massum}
                        masInformation = {this.masInformation}
                    />
                    break;
                case 'List_graph':
                    element = <List_graph
                        mas_name_file={mas_name_file}
                        click_graph_file={this.click_graph_file}
                        data_file={data_file}
                        revision_file={this.revision_file}
                        coor_file={coor_file}
                        massum_file={massum_file}
                        Title={this.masInformation.Title}
                        AxisX={this.masInformation.AxisX}
                        AxisY={this.masInformation.AxisY}
                    />
                    break;
            }
            return (
                <div key={text} className={clas}>
                    {element}
                </div>
            )
        })
        return (
            <div id="place_1D">
                <div id="left_tab_panel_1D">
                    <button className={this.button_active_1} onClick={() => { this.switch_tab('Sum_graph') }}>G</button>
                    <button className={this.button_active_2} onClick={() => { this.switch_tab('List_graph') }}>C</button>
                </div>
                <div id="work_panel_1D">
                    {elements}
                </div>
            </div>
        )
    }
}

class Sum_graph extends PureComponent {

    constructor(props)
    {
        super(props)
        // this.massum = this.props.massum
        this.masVisible = {
            file: false,
            processing: false,
            calibration: false,
            smoothing: false,
            details: false
        }
    }

    state = {
        reload: false
    }

    hide_parametr(id) {
        this.masVisible[id] = !this.masVisible[id];
        this.setState({
            reload: !this.state.reload
        })
    }

    // shouldComponentUpdate(nextProps){
    //     if(this.massum != nextProps.massum)
    //     {
    //         return true;
    //     }
    //     else{
    //         return false
    //     }
    // }

    switch_k(className, checked){

        let {checkeds} = this.props.masInformation

        if(checkeds[className] == true){
            
        }

        stored_value('kA', checkeds['kA'])
        stored_value('kB', checkeds['kB'])
    }

    render() {
        const { click_loadFolder, click_loadFile, click_save, click_sum,
            stored_value, click_calibration, click_smoothing,
            data, revision, coor, massum, masInformation
            // options
        } = this.props;

        return (
            <div id="sum_graph">
                <div id="control_panel">
                    <h3 onClick={() => this.hide_parametr('file')}>Файл</h3>
                    <div style={{ display: this.masVisible['file'] ? 'block' : 'none' }}>
                        <input id='Title' type='text' placeholder="Соединение"
                            onChange={(e) => stored_value(e.target.id, e.target.value)}
                        ></input>
                        <input id='nameElement' type='text' placeholder="Элемент"
                            onChange={(e) => stored_value(e.target.id, e.target.value)}
                        ></input>
                        <label className="container"> kA
                            <input className="kA" id={`kA`}
                                onChange={(e) => stored_value(e.target.className, e.target.checked)}
                                type="checkbox"
                                defaultChecked={masInformation.kA}
                            />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container"> kB
                            <input className="kB" id={`kB`}
                                onChange={(e) => stored_value(e.target.className, e.target.checked)}
                                type="checkbox"
                                defaultChecked={masInformation.kB}
                            />
                            <span className="checkmark"></span>
                        </label>
                        <input id='AxisX' type='text' placeholder="Ось X"
                            onChange={(e) => stored_value(e.target.id, e.target.value)}
                        ></input>
                        <input id='AxisY' type='text' placeholder="Ось Y"
                            onChange={(e) => stored_value(e.target.id, e.target.value)}
                        ></input>
                        <button onClick={click_loadFolder}>Папка</button>
                        <button onClick={click_loadFile}>Выбрать</button>
                        <button onClick={click_save}>Сохранить</button>

                    </div>
                    <h3 onClick={() => this.hide_parametr('processing')}>Обработка</h3>
                    <div style={{ display: this.masVisible['processing'] ? 'block' : 'none' }}>
                        <button id="click_sum" onClick={click_sum}>Суммировать</button>
                        <input id='countSum' type='number' placeholder="Сумма по: 1"
                            onChange={(e) => stored_value(e.target.id, e.target.value)}
                        ></input>
                    </div>
                    <h3 onClick={() => this.hide_parametr('calibration')}>Калибровка</h3>
                    <div style={{ display: this.masVisible['calibration'] ? 'block' : 'none' }}>
                        <button id="click_calibration" onClick={click_calibration}>Калибровка</button>
                        <input id='en_first_point' type='number' placeholder="Эн. первой точки"
                            onChange={(e) => stored_value(e.target.id, e.target.value)}
                        // value={en_first_point}
                        ></input>
                        <input id='en_second_point' type='number' placeholder="Эн. второй точки"
                            onChange={(e) => stored_value(e.target.id, e.target.value)}
                        // value={en_second_point}
                        ></input>
                        <input id='n_first_point' type='number' placeholder="N первой точки"
                            onChange={(e) => stored_value(e.target.id, e.target.value)}
                        // value={n_first_point}
                        ></input>
                        <input id='n_second_point' type='number' placeholder="N второй точки"
                            onChange={(e) => stored_value(e.target.id, e.target.value)}
                        // value={n_second_point}
                        ></input>
                    </div>
                    <h3 onClick={() => this.hide_parametr('smoothing')}>Сглаживание</h3>
                    <div style={{ display: this.masVisible['smoothing'] ? 'block' : 'none' }}>
                        <button id="click_smoothing" onClick={click_smoothing}>Сглаживание</button>
                        <input id='n_smoothing' type='number' placeholder="Точек: 3"
                            onChange={(e) => stored_value(e.target.id, e.target.value)}
                        // value={n_smoothing}
                        ></input>
                    </div>
                    <h3 onClick={() => this.hide_parametr('processing')}>Детали экспермента</h3>
                    <div style={{ display: this.masVisible['processing'] ? 'block' : 'none' }}>
                        <textarea id='add_information' placeholder="Дополнительная информация"
                            onChange={(e) => stored_value(e.target.id, e.target.value)}
                        // value={n_smoothing}
                        ></textarea>
                    </div>
                </div>
                <div id="view_panel">
                    <div id="graph">
                        <Plot
                            data={data}
                            graphDiv="graph"
                            layout={{
                                title: `${masInformation.Title}`,
                                datarevision: { revision: revision },
                                width: 900, height: 675,
                                xaxis: {
                                    title: 'Energy',
                                    // showgrid: false,
                                    // zeroline: false
                                },
                                yaxis: {
                                    title: 'Intensivnosti',
                                    // showline: false
                                }
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
}

class List_graph extends PureComponent {

    render() {
        const { mas_name_file, click_graph_file, data_file,
            coor_file, massum_file, revision_file, Title
            // ptions
        } = this.props;
        return (
            <div id="list_graph">
                <div id="list_file">
                    {mas_name_file.map((item, i) => {
                        return (
                            <a onClick={() => click_graph_file(i)} key={i}>{item}</a>
                        )
                    })}
                </div>
                <div id="view_panel_file">
                    <div id="graph_file">
                        <Plot
                            data={data_file}
                            graphDiv="graph"
                            layout={{
                                title: `${Title}`,
                                datarevision: { revision: revision_file },
                                width: 900, height: 675,
                                xaxis: {
                                    title: 'Energy',
                                    // showgrid: false,
                                    // zeroline: false
                                },
                                yaxis: {
                                    title: 'Intensivnosti',
                                    // showline: false
                                }
                            }}
                            revision={revision_file}
                        />
                    </div>
                    <Coor
                        coor={coor_file}
                        massum={massum_file}
                    ></Coor>
                </div>
            </div>
        )
    }
}

class Coor extends PureComponent {
    constructor(props) {
        super(props)
        this.massum = this.props.massum
    }

    // shouldComponentUpdate(nextProps) {
    //     if (this.massum !== nextProps.massum) {
    //         return true;
    //     }
    //     else {
    //         return false
    //     }
    // }

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
                <div className='coor_element_1D'>    <b>X:</b> {coor[x]}   <b>Y:</b> {count}</div>
            </div>
        )
    })
    return (
        element
    )
}
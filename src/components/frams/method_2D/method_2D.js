
import React, { Component } from 'react';

import './method_2D.css';

export default class Method_2D extends Component {

    state ={
        active_l_t: 1
    }

    switch_l_t = (id) =>{
        this.setState({
            active_l_t : id
        })
    }

    render() {

        const {active_l_t} = this.state;
        let element, button_active_1, button_active_2;
        if(active_l_t == 1)
        {
            element = <Bars></Bars>;
            button_active_1 = "button_active";
            button_active_2 = "";
        }
        else{
            element = <Coor></Coor>
            button_active_1 = "";
            button_active_2 = "button_active";
        }

        return (
            <div id="l_p_panel">
                <div id="left_Panel" className="panel">
                    <div id="wrapper">
                        <button id="TabOne" className = {button_active_1} target="#TabOne" onClick = {() => this.switch_l_t(1)}>P</button>
                        <button id="TabTwo" className = {button_active_2} target="#TabTwo" onClick = {() => this.switch_l_t(2)}>C</button>
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

const Bars = ({ }) => {
    return (
        <ul id="navbar" className="bar">
            <li><a href="#">Обработка</a>
                <ul>
                    <li>
                        <label className="container">Режим
                            <input id="chek_obsorv" type="checkbox" defaultChecked='checked'/>
                            <span className="checkmark"></span>
                        </label>
                    </li>
                </ul>
            </li>

            <li><a href="#">Файл</a>
                <ul>
                    <li><button id="Folder">Папка</button></li>
                    <li><button id="Fold">Выбор</button></li>
                    <li><button id="Save">Сохранить</button></li>
                    <li><label className="container">Только последний
                        <input id="SaveLast" type="checkbox"/>
                        <span className="checkmark"></span>
                        </label>
                    </li>
                </ul>
            </li>

            <li><a href="#">Обработка</a>
                <ul>
                    <li><label className="container">Ограничение
                        <input id="Iter" type="checkbox"/>
                        <span className="checkmark"></span>
                    </label></li>
                    <li><input id="IterN" type="text"/></li>
                    <li><button id="Start">Старт</button></li>
                    <li><button id="Restart">Очистка</button></li>
                </ul>
            </li>

            <li><a href="#">Фон</a>
                <ul>
                    <li><label className="container">Без фона
                        <input id="BF" type="checkbox"/>
                        <span className="checkmark"></span>
                    </label></li>
                    <li><label className="container">Вычет шума
                        <input id="Delta" type="checkbox"/>
                        <span className="checkmark"></span>
                    </label></li>
                    <li><input id="DFon" type="number" defaultValue="3"/></li>
                    <li><label className="container">Вычет битого
                        <input id="BPix" type="checkbox"/>
                        <span className="checkmark"></span>
                    </label></li>
                    <li><button id="Fonfold">Фон</button></li>
                </ul>
            </li>

            <li><a href="#">Границы</a>
                <ul>
                    <li><label className="container">Границы
                        <input id="Gran" type="checkbox"/>
                        <span className="checkmark"></span>
                    </label></li>X
                    <li><input id="Xx" type="number" defaultValue="200"/></li>
                    <li><input id="XX" type="number" defaultValue="1000"/></li>Y
                    <li><input id="Yy" type="number" defaultValue="100"/></li>
                    <li><input id="YY" type="number" defaultValue="800"/></li>
                </ul>
            </li>

        </ul>
    )
}

const Coor = ({}) => {
    return(
        <ul id="coor" className="bar">
            <div id="coordinatesPanel"></div>
            <div id="CPButtom">
                <button id="apply_Coor">Применить</button>
                <button id="return_Coor">Отмена</button>
            </div>
        </ul>
    )
}

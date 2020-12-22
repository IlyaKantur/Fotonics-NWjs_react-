import React, { Component } from 'react';

export default class Bars extends Component{
    render(){
        const {loadFolder} = this.props
        return(
            <ul id="navbar" className="bar">
                <li><a href="#">Режим</a>
                    <ul>
                        <li>
                            <label className="container">Режим
                                <input id="chek_obsorv" type="checkbox" />
                                {/* defaultChecked='checked' */}
                                <span className="checkmark"></span>
                            </label>
                        </li>
                    </ul>
                </li>

                <li><a href="#">Файл</a>
                    <ul>
                        <li><button id="Folder" onClick = {loadFolder}>Папка</button></li>
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
}
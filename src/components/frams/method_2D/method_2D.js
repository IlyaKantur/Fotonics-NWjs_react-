import React, {Component} from 'react';

import './method_2D.css';

export default class Method_2D extends Component{
    render()
    {
        return(
        <>
            <div id = "l_p_panel">
                <div id = "left_Panel" className = "panel">
                    <button id = "TabOne" className = "barbut" target = "#TabOne"></button>
                    <button id = "TabTwo" className = "barbut" target = "#TabTwo"></button>
                </div>
                <div id = "Bars">
                    <ul id = "navber" className = "bar">
                        <li><a href = "#">Режим</a>
                            <ul>
                                <li><label className = "container">Наблюдение
                                        <input id = "chek_obsorv" type = "checkbox" defaultChecked = "checked"/>
                                        <span className = "checkmark"/>
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
                        <li><a href = "#">Фон</a>
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
                        <li><a href = "#">Границы</a>
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
                    <ul id = "coor" className = "bar">
                        <div id="coordinatesPanel"></div>
                        <div id="CPButtom">
                            <button id="apply_Coor">Применить</button>
                            <button id="return_Coor">Отмена</button>
                        </div>
                    </ul>
                </div>
            </div>
            <div id = "midle_Panel">
                <div id = "up_Panel" className = "panel">
                    <div id = "img">
                        <canvas id="ImgNew"></canvas>
                        <canvas id="ImgSum"></canvas>
                    </div>
                    <div id="graf">
                        <div id="Graf">
                            <canvas id="myChart"></canvas>
                        </div>
                    </div>
                    {/* <div id="hidden_elem">
                        <canvas id="hiddenimg" hidden="true"></canvas>
                        <canvas id="hiddenimgsum" hidden="true"></canvas>
                    </div> */}
                </div>
                <div id = "bottom_Panel" className = "panel">
                    <div id = "panel_mid_bot">
                        <div className = "tab">Консоль</div>
                    </div>
                    <div>
                        <div id = "Consol"></div>
                    </div>
                </div>
            </div>
        </>
        )
    }
    
}

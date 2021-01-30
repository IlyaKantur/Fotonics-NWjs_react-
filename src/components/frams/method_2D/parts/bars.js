import React, { Component } from 'react';

export default class Bars extends Component{
    render(){
        const {loadFolder, loadFoldImg, loadFonImg, startPush, id_item} = this.props;
        const {id_f, nameF} = id_item;
        const id_f_nameF = `${nameF}_${id_f}`;
        return(
            <ul id="navbar" className="bar">
                <li><a href="#">Режим</a>
                    <ul>
                        <li>
                            <label className="container">Наблюдение
                                <input className = "chek_obsorv" id={`chek_obsorv_${id_f_nameF}`} type="checkbox"/>
                                {/* defaultChecked='checked' */}
                                <span className="checkmark"></span>
                            </label>
                        </li>
                    </ul>
                </li>

                <li><a href="#">Файл</a>
                    <ul>
                        <li><button id="Folder" onClick = {() => loadFolder(id_f_nameF)}>Папка</button></li>
                        <li><button id="Fold" onClick = {() => loadFoldImg(id_f_nameF)}>Выбор</button></li>
                        <li><button id="Save">Сохранить</button></li>
                        <li><label className="container">Только последний
                            <input className = "SaveLast" id={`SaveLast_${id_f_nameF}`} type="checkbox"/>
                            <span className="checkmark"></span>
                            </label>
                        </li>
                    </ul>
                </li>

                <li><a href="#">Обработка</a>
                    <ul>
                        <li><label className="container">Ограничение
                            <input className = "Iter" id={`Iter_${id_f_nameF}`} type="checkbox"/>
                            <span className="checkmark"></span>
                        </label></li>
                        <li><input className = "IterN" id={`IterN_${id_f_nameF}`} type="text"/></li>
                        <li><button id="Start" onClick = {() => startPush(id_f_nameF)}>Старт</button></li>
                        <li><button id="Restart">Очистка</button></li>
                    </ul>
                </li>

                <li><a href="#">Фон</a>
                    <ul>
                        <li><label className="container">Без фона
                            <input className = "BF" id={`BF_${id_f_nameF}`} type="checkbox"/>
                            <span className="checkmark"></span>
                        </label></li>
                        <li><label className="container">Вычет шума
                            <input className = "Delta" id={`Delta_${id_f_nameF}`} type="checkbox"/>
                            <span className="checkmark"></span>
                        </label></li>
                        <li><input className = "DFon" id={`DFon_${id_f_nameF}`} type="number" defaultValue="3"/></li>
                        <li><label className="container">Вычет битого
                            <input className = "BPix" id={`BPix_${id_f_nameF}`} type="checkbox"/>
                            <span className="checkmark"></span>
                        </label></li>
                        <li><button id="Fonfold" onClick = {() => loadFonImg(id_f_nameF)}>Фон</button></li>
                    </ul>
                </li>

                <li><a href="#">Границы</a>
                    <ul>
                        <li><label className="container">Границы
                            <input className = "Gran" id={`Gran_${id_f_nameF}`} type="checkbox"/>
                            <span className="checkmark"></span>
                        </label></li>X
                        <li><input className = "Xx" id={`Xx_${id_f_nameF}`} type="number" defaultValue="200"/></li>
                        <li><input className = "XX" id={`XX_${id_f_nameF}`} type="number" defaultValue="1000"/></li>Y
                        <li><input className = "Yy" id={`Yy_${id_f_nameF}`} type="number" defaultValue="100"/></li>
                        <li><input className = "YY" id={`YY_${id_f_nameF}`} type="number" defaultValue="800"/></li>
                    </ul>
                </li>
           </ul>
        )
    }
}
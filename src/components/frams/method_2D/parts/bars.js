import React, { Component } from 'react';

export default class Bars extends Component{

    state = {
        chek_obsorv: false,
        SaveLast: false,
        Iter: false,
        IterN: 0,
        BF: false,
        Delta: false,
        DFon: 3,
        BPix: false,
        Gran: false,
        Xx: 200,
        XX: 1000,
        Yy: 100,
        YY: 800,
        nameElement: ''
    }

    stored_value(name ,value){
        this.setState((state) => {
            return state[name] = value
          });
    }

    render(){
        const {className, loadFolder, loadFoldImg, loadFonImg, startPush, id_item} = this.props;
        const {chek_obsorv, SaveLast, Iter, IterN, BF, Delte, DFon, BPix, Gran, Xx, XX, Yy, YY} = this.state
        const {id_f, nameF} = id_item;
        const id_f_nameF = `${nameF}_${id_f}`;
        return(
            <ul id="navbar" className={`bar ${className}`}>
                <li><a href="#">Режим</a>
                    <ul>
                        <li>
                            <label className="container">Наблюдение
                                <input className = "chek_obsorv" id={`chek_obsorv_${id_f_nameF}`} 
                                    onChange = {(e) => this.stored_value(e.target.className,e.target.checked)} 
                                    type="checkbox"
                                    checked = {chek_obsorv}
                                />
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
                            <input className = "SaveLast" id={`SaveLast_${id_f_nameF}`}
                                onChange = {(e) => this.stored_value(e.target.className,e.target.checked)}
                                type="checkbox"
                                checked = {SaveLast}
                            />
                            <span className="checkmark"></span>
                            </label>
                        </li>
                        <li><input id='nameElement' type='text' placeholder="Элемент"
                            onChange={(e) => stored_value(e.target.id, e.target.value)}
                        ></input></li>
                    </ul>
                </li>

                <li><a href="#">Обработка</a>
                    <ul>
                        <li><label className="container">Ограничение
                            <input className = "Iter" id={`Iter_${id_f_nameF}`}
                                onChange = {(e) => this.stored_value(e.target.className,e.target.checked)}
                                type="checkbox"
                                checked = {Iter}
                            />
                            <span className="checkmark"></span>
                        </label></li>
                        <li><input className = "IterN" id={`IterN_${id_f_nameF}`} 
                                onChange = {(e) => this.stored_value(e.target.className,e.target.value)}
                                type="number"
                                value = {IterN}
                        /></li>
                        <li><button id="Start" onClick = {() => startPush(id_f_nameF)}>Старт</button></li>
                        <li><button id="Restart">Очистка</button></li>
                    </ul>
                </li>

                <li><a href="#">Фон</a>
                    <ul>
                        <li><label className="container">Без фона
                            <input className = "BF" id={`BF_${id_f_nameF}`} 
                                onChange = {(e) => this.stored_value(e.target.className,e.target.checked)}
                                type="checkbox"
                                checked = {BF}
                            />
                            <span className="checkmark"></span>
                        </label></li>
                        <li><label className="container">Вычет шума
                            <input className = "Delta" id={`Delta_${id_f_nameF}`} 
                                onChange = {(e) => this.stored_value(e.target.className,e.target.checked)}
                                type="checkbox"
                                checked = {Delte}
                            />
                            <span className="checkmark"></span>
                        </label></li>
                        <li><input className = "DFon" id={`DFon_${id_f_nameF}`} 
                            onChange = {(e) => this.stored_value(e.target.className,e.target.value)}
                            type="number" 
                            defaultValue={DFon}/></li>
                        <li><label className="container">Вычет битого
                            <input className = "BPix" id={`BPix_${id_f_nameF}`} 
                                onChange = {(e) => this.stored_value(e.target.className,e.target.checked)}
                                type="checkbox"
                                checked = {BPix}
                            />
                            <span className="checkmark"></span>
                        </label></li>
                        <li><button id="Fonfold" onClick = {() => loadFonImg(id_f_nameF)}>Фон</button></li>
                    </ul>
                </li>

                <li><a href="#">Границы</a>
                    <ul>
                        <li><label className="container">Границы
                            <input className = "Gran" id={`Gran_${id_f_nameF}`} 
                                onChange = {(e) => this.stored_value(e.target.className,e.target.checked)}
                                type="checkbox"
                                checked = {Gran}
                            />
                            <span className="checkmark"></span>
                        </label></li>X
                        <li><input className = "Xx" id={`Xx_${id_f_nameF}`} 
                            onChange = {(e) => this.stored_value(e.target.className,e.target.value)}
                            type="number" 
                            defaultValue={Xx}/></li>
                        <li><input className = "XX" id={`XX_${id_f_nameF}`} 
                            onChange = {(e) => this.stored_value(e.target.className,e.target.value)}
                            type="number" 
                            defaultValue={XX}/></li>Y
                        <li><input className = "Yy" id={`Yy_${id_f_nameF}`} 
                            onChange = {(e) => this.stored_value(e.target.className,e.target.value)}
                            type="number" 
                            defaultValue={Yy}/></li>
                        <li><input className = "YY" id={`YY_${id_f_nameF}`} 
                            onChange = {(e) => this.stored_value(e.target.className,e.target.value)}
                            type="number" 
                            defaultValue={YY}/></li>
                    </ul>
                </li>
           </ul>
        )
    }
}
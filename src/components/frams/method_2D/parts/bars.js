import React, { PureComponent } from 'react';

export default class Bars extends PureComponent {

    // state = {
    //     // chek_obsorv: false,
    //     SaveLast: false,
    //     Iter: false,
    //     IterN: 0,
    //     BF: false,
    //     Delta: false,
    //     DFon: 3,
    //     BPix: false,
    //     Gran: false,
    //     Xx: 200,
    //     XX: 1000,
    //     Yy: 100,
    //     YY: 800,
    //     nameElement: ''
    // }

    // stored_value(name ,value){
    //     this.setState((state) => {
    //         return state[name] = value
    //       });
    // }

    constructor(props) {
        super(props)
        // this.styles = StyleSheet.create({
        //     visibility
        // })
        this.masVisible = {
            mode: false,
            file: false,
            processing: false,
            filtering: false,
            borders: false,
            details: false,
            calibration: false
        }
    }

    state = {
        reload: false
    }

    hide_parametr(id) {
        this.masVisible[id] = !this.masVisible[id]
        this.setState({
            reload: !this.state.reload
        })
    }

    render() {
        const { className, loadFolder, loadFoldImg,
            loadFonImg, startPush, id_item,
            masInformation_2D, stored_value,
            calibration
        } = this.props;
        const { id_f, nameF } = id_item;
        const id_f_nameF = `${nameF}_${id_f}`;
        return (
            <>
                <ul id="navbar" className={`bar ${className}`}>
                    <li><a href="#" onClick={() => this.hide_parametr('mode')}>Режим</a>
                        <ul style={{ display: this.masVisible['mode'] ? 'block' : 'none' }}>
                            <li>
                                <label className="container">Наблюдение
                                <input className="chek_obsorv" id={`chek_obsorv_${id_f_nameF}`}
                                        onChange={(e) => stored_value(e.target.className, e.target.checked)}
                                        type="checkbox"
                                        defaultChecked={masInformation_2D.chek_obsorv}
                                    />
                                    {/* defaultChecked='checked' */}
                                    <span className="checkmark"></span>
                                </label>
                            </li>
                        </ul>
                    </li>

                    <li><a href="#" onClick={() => this.hide_parametr('file')}>Файл</a>
                        <ul style={{ display: this.masVisible['file'] ? 'block' : 'none' }}>
                            <li><button id="Folder" onClick={() => loadFolder(id_f_nameF)}>Папка</button></li>
                            <li><button id="Fold" onClick={() => loadFoldImg(id_f_nameF)}>Выбор</button></li>
                            <li><button id="Save">Сохранить</button></li>
                            <li><label className="container">Только последний
                            <input className="SaveLast" id={`SaveLast_${id_f_nameF}`}
                                    onChange={(e) => stored_value(e.target.className, e.target.checked)}
                                    type="checkbox"
                                    defaultChecked={masInformation_2D.SaveLast}
                                />
                                <span className="checkmark"></span>
                            </label>
                            </li>
                            <li><input id='nameElement' type='text' placeholder="Элемент"
                                onChange={(e) => stored_value(e.target.id, e.target.value)}
                            ></input></li>
                            <li><input id='AxisX' type='text' placeholder="Ось X"
                                onChange={(e) => stored_value(e.target.id, e.target.value)}
                            ></input></li>
                            <li><input id='AxisY' type='text' placeholder="Ось Y"
                                onChange={(e) => stored_value(e.target.id, e.target.value)}
                            ></input></li>
                        </ul>
                    </li>

                    <li><a href="#" onClick={() => this.hide_parametr('processing')}>Обработка</a>
                        <ul style={{ display: this.masVisible['processing'] ? 'block' : 'none' }}>
                            <li><label className="container">Ограничение
                            <input className="Iter" id={`Iter_${id_f_nameF}`}
                                    onChange={(e) => stored_value(e.target.className, e.target.checked)}
                                    type="checkbox"
                                    defaultChecked={masInformation_2D.Iter}
                                />
                                <span className="checkmark"></span>
                            </label></li>
                            <li><input className="IterN" id={`IterN_${id_f_nameF}`}
                                onChange={(e) => stored_value(e.target.className, +e.target.value)}
                                type="number"
                                placeholder='Количество'
                            /></li>
                            <li><label className="container">Инт. Пикселя
                            <input className="IntPix" id={`IntPix_${id_f_nameF}`}
                                    onChange={(e) => stored_value(e.target.className, e.target.checked)}
                                    type="checkbox"
                                    defaultChecked={masInformation_2D.IntPix}
                                />
                                <span className="checkmark"></span>
                            </label></li>
                            <li><input className="MinInt" id={`MinInt_${id_f_nameF}`}
                                onChange={(e) => stored_value(e.target.className, +e.target.value)}
                                type="number"
                                placeholder={`Мин. инт: ${masInformation_2D.MinInt}`}
                            /></li>
                            <li><button id="Start" onClick={() => startPush(id_f_nameF)}>Старт</button></li>
                            {/* <li><button id="Restart">Очистка</button></li> */}
                        </ul>
                    </li>

                    <li><a href="#" onClick={() => this.hide_parametr('filtering')}>Фильтрация</a>
                        <ul style={{ display: this.masVisible['filtering'] ? 'block' : 'none' }}>
                            <li><label className="container">Без Фильтрация
                            <input className="BF" id={`BF_${id_f_nameF}`}
                                    onChange={(e) => stored_value(e.target.className, e.target.checked)}
                                    type="checkbox"
                                    defaultChecked={masInformation_2D.BF}
                                />
                                <span className="checkmark"></span>
                            </label></li>
                            <li><label className="container">Вычет шума
                            <input className="Delta" id={`Delta_${id_f_nameF}`}
                                    onChange={(e) => stored_value(e.target.className, e.target.checked)}
                                    type="checkbox"
                                    defaultChecked={masInformation_2D.Delta}
                                />
                                <span className="checkmark"></span>
                            </label></li>
                            <li><input className="DFon" id={`DFon_${id_f_nameF}`}
                                onChange={(e) => stored_value(e.target.className, +e.target.value)}
                                type="number"
                                placeholder="3"
                            />
                            </li>
                            <li><label className="container">Вычет битого
                            <input className="BPix" id={`BPix_${id_f_nameF}`}
                                    onChange={(e) => stored_value(e.target.className, e.target.checked)}
                                    type="checkbox"
                                    defaultChecked={masInformation_2D.BPix}
                                />
                                <span className="checkmark"></span>
                            </label></li>
                            <li><button id="Fonfold" onClick={() => loadFonImg(id_f_nameF)}>Фон</button></li>
                        </ul>
                    </li>

                    <li><a href="#" onClick={() => this.hide_parametr('borders')}>Границы</a>
                        <ul style={{ display: this.masVisible['borders'] ? 'block' : 'none' }}>
                            <li><label className="container">Границы
                            <input className="Gran" id={`Gran_${id_f_nameF}`}
                                    onChange={(e) => stored_value(e.target.className, e.target.checked)}
                                    type="checkbox"
                                    defaultChecked={masInformation_2D.Gran}
                                />
                                <span className="checkmark"></span>
                            </label></li>X
                        <li><input className="Xx" id={`Xx_${id_f_nameF}`}
                                onChange={(e) => stored_value(e.target.className, +e.target.value)}
                                type="number"
                                placeholder={masInformation_2D.Xx}
                            />
                            </li>
                            <li><input className="XX" id={`XX_${id_f_nameF}`}
                                onChange={(e) => stored_value(e.target.className, +e.target.value)}
                                type="number"
                                placeholder={masInformation_2D.XX}
                            />
                            </li>Y
                        <li><input className="Yy" id={`Yy_${id_f_nameF}`}
                                onChange={(e) => stored_value(e.target.className, +e.target.value)}
                                type="number"
                                placeholder={masInformation_2D.Yy}
                            />
                            </li>
                            <li><input className="YY" id={`YY_${id_f_nameF}`}
                                onChange={(e) => stored_value(e.target.className, +e.target.value)}
                                type="number"
                                placeholder={masInformation_2D.YY}
                            />
                            </li>
                        </ul>
                    </li>
                    <li><a href="#" onClick={() => this.hide_parametr('сalibration')}>Калибровка</a>
                        <ul style={{ display: this.masVisible['сalibration'] ? 'block' : 'none' }}>
                            <button id="click_calibration" onClick={calibration}>Калибровка</button>
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
                        </ul>
                    </li>
                    <li><a href="#" onClick={() => this.hide_parametr('details')}>Детали экспермента</a>
                        <ul style={{ display: this.masVisible['details'] ? 'block' : 'none' }}>
                            <li>
                                <textarea id='add_information' placeholder="Дополнительная информация"
                                    onChange={(e) => stored_value(e.target.id, e.target.value)}
                                // value={n_smoothing}
                                ></textarea>
                            </li>
                        </ul>
                    </li>
                </ul>
            </>
        )
    }
}
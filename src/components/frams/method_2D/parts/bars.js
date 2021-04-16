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

    render() {
        const { className, loadFolder, loadFoldImg,
            loadFonImg, startPush, id_item,
            masInformation_2D, stored_value
        } = this.props;

        const { id_f, nameF } = id_item;
        const id_f_nameF = `${nameF}_${id_f}`;
        return (
            <>
                <ul id="navbar" className={`bar ${className}`}>
                    <li><a href="#">Режим</a>
                        <ul>
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

                    <li><a href="#">Файл</a>
                        <ul>
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

                    <li><a href="#">Обработка</a>
                        <ul>
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
                            <li><button id="Start" onClick={() => startPush(id_f_nameF)}>Старт</button></li>
                            {/* <li><button id="Restart">Очистка</button></li> */}
                        </ul>
                    </li>

                    <li><a href="#">Фильтрация</a>
                        <ul>
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

                    <li><a href="#">Границы</a>
                        <ul>
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
                            // placeholder={masInformation_2D.Xx}
                            />
                            </li>
                            <li><input className="XX" id={`XX_${id_f_nameF}`}
                                onChange={(e) => stored_value(e.target.className, +e.target.value)}
                                type="number"
                            // placeholder={masInformation_2D.XX}
                            />
                            </li>Y
                        <li><input className="Yy" id={`Yy_${id_f_nameF}`}
                                onChange={(e) => stored_value(e.target.className, +e.target.value)}
                                type="number"
                            // placeholder={masInformation_2D.Yy}
                            />
                            </li>
                            <li><input className="YY" id={`YY_${id_f_nameF}`}
                                onChange={(e) => stored_value(e.target.className, +e.target.value)}
                                type="number"
                            // placeholder={masInformation_2D.YY}
                            />
                            </li>
                        </ul>
                    </li>
                    <li><a href="#">Детали экспермента</a>
                        <ul>
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
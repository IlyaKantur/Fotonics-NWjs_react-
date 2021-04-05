import React, { PureComponent } from 'react';

import './PTE.css';

export default class PTE extends PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        info_element_name: 'H',
        search_name: '',
        search_alert_text: {}
    }

    search_but = () => {
        let inp_search = document.getElementById(`inp_ser_el`)
        let name_search_el = inp_search.value;
        this.search(name_search_el)
    }

    search = (name_search_el) => {
        if (name_search_el) {
            const { baseElement } = this.props;
            name_search_el = name_search_el[0].toUpperCase() + name_search_el.slice(1).toLowerCase();
            if (baseElement.find(item => item.name_el == name_search_el)) {
                this.setState({
                    info_element_name: name_search_el
                })
            }
            else{
                this.setState({
                    search_alert_text:{text: "Неправильно введено"}
                })
            }
        }

    }

    info = (name) => {
        this.setState({
            info_element_name: name
        })
    }

    close_search_alert = () => {
        this.setState({
            search_alert_text: {}
        })
    }

    chek_name = (e) => {
        const char = /["a-zA-Z]/;
        const val = e.currentTarget.value;
        const test1 = char.test(val[0])
        const test2 = char.test(val[1])

        if (test1 && test2) {
            this.setState({
                search_name: val
            })
        }
        else {
            this.setState({
                search_alert_text: {text: 'Смени язык'}
            })
            if (test1) {
                this.setState({
                    search_name: val[0]
                })
            }
        }
    }

    render() {
        const { baseElement } = this.props;
        const { id_f, nameF } = this.props.id_item;
        const { info_element_name, search_name, search_alert_text } = this.state;
        const id_f_nameF = `${nameF}_${id_f}`;

        return (
            <div id="Panel_PT">
                <div id="left_panel">
                    <div id="search_element">
                        <input className='inp_ser_el'
                            id={`inp_ser_el`}
                            type="search"
                            placeholder="Поиск, в формате H"
                            maxLength="2"
                            value={search_name}
                            onChange={(e) => {
                                this.chek_name(e)
                            }}
                        />
                        <button id="but_ser_el" onClick={() => { this.search_but() }}>🔍</button>
                    </div>
                    <Search_alert
                        alert={search_alert_text}
                        close={this.close_search_alert}
                    />
                    <div>
                        {info_element(info_element_name, baseElement)}
                    </div>
                </div>
                <div id="PT">
                    <div id="up">
                        <div className="m_l_c">Пер.</div>
                        <div className="m_l_c">Ряд</div>
                        <div id="G1">I</div>
                        <div id="G2">II</div>
                        <div id="G3">III</div>
                        <div id="G4">IV</div>
                        <div id="G5">V</div>
                        <div id="G6">VI</div>
                        <div id="G7">VII</div>
                        <div id="G8">VIII</div>
                    </div>
                    <div id="midle">
                        <div id="left">
                            <div className="M_L_C">
                                <div className="m_l_c">
                                    <div>1</div>
                                </div>
                                <div className="m_l_c">
                                    <div>1</div>
                                </div>
                            </div>
                            <div className="M_L_C">
                                <div className="m_l_c">
                                    <div>2</div>
                                </div>
                                <div className="m_l_c">
                                    <div>2</div>
                                </div>
                            </div>
                            <div className="M_L_C">
                                <div className="m_l_c">
                                    <div>3</div>
                                </div>
                                <div className="m_l_c">
                                    <div>3</div>
                                </div>
                            </div>
                            <div className="M_L_C">
                                <div className="m_l_c" id="per">
                                    <div>4</div>
                                </div>
                                <div id="row">
                                    <div className="m_l_c_r">
                                        <div>4</div>
                                    </div>
                                    <div className="m_l_c_r">
                                        <div>5</div>
                                    </div>
                                </div>
                            </div>
                            <div className="M_L_C" id="Per">
                                <div className="m_l_c" id="per">
                                    <div>5</div>
                                </div>
                                <div id="row">
                                    <div className="m_l_c_r">
                                        <div>6</div>
                                    </div>
                                    <div className="m_l_c_r">
                                        <div>7</div>
                                    </div>
                                </div>
                            </div>
                            <div className="M_L_C" id="Per">
                                <div className="m_l_c" id="per">
                                    <div>6</div>
                                </div>
                                <div id="row">
                                    <div className="m_l_c_r">
                                        <div>8</div>
                                    </div>
                                    <div className="m_l_c_r">
                                        <div>9</div>
                                    </div>
                                </div>
                            </div>
                            <div className="M_L_C">
                                <div className="m_l_c">
                                    <div>7</div>
                                </div>
                                <div className="m_l_c">
                                    <div>10</div>
                                </div>
                            </div>
                        </div>
                        <div id="right">
                            <div className="Row" id="row_1">
                                {cell_PTE('#row_1', baseElement, this.info)}
                            </div>
                            <div className="Row" id="row_2">
                                {cell_PTE('#row_2', baseElement, this.info)}
                            </div>
                            <div className="Row" id="row_3">
                                {cell_PTE('#row_3', baseElement, this.info)}
                            </div>
                            <div className="Row" id="row_4">
                                {cell_PTE('#row_4', baseElement, this.info)}
                            </div>
                            <div className="Row" id="row_5">
                                {cell_PTE('#row_5', baseElement, this.info)}
                            </div>
                            <div className="Row" id="row_6">
                                {cell_PTE('#row_6', baseElement, this.info)}
                            </div>
                            <div className="Row" id="row_7">
                                {cell_PTE('#row_7', baseElement, this.info)}
                            </div>
                            <div className="Row" id="row_8">
                                {cell_PTE('#row_8', baseElement, this.info)}
                            </div>
                            <div className="Row" id="row_9">
                                {cell_PTE('#row_9', baseElement, this.info)}
                            </div>
                            <div className="Row" id="row_10">
                                {cell_PTE('#row_10', baseElement, this.info)}
                            </div>
                        </div>
                    </div>
                    <div id="bottom">
                        <div className="b_n">*ЛАНТАНОИДЫ</div>
                        <div id="lanthanides">
                            {cell_PTE('#lanthanides', baseElement, this.info)}
                        </div>
                        <div className="b_n">**АКТИНОИДЫ</div>
                        <div id="actinide">
                            {cell_PTE('#lanthanides', baseElement, this.info)}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const Search_alert = ({ close, alert }) => {
    let element = null;
    if(alert.text != undefined){
        element = (<S_a
            text={alert.text}
            close = {close}
        />)
        
    }
    return (
        <div>
            { element}
        </div>

    )
}

class S_a extends PureComponent {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { close } = this.props;
        setTimeout(close, 500)
    }

    render() {
        const {text} = this.props;
        return (
            <div id="search_alert">
                <span>{text}</span>
            </div>
        )
    }
}

const cell_PTE = (id, baseElement, info) => {
    const el = baseElement.filter(him => {
        return him.row_el == id
    })
    el.sort((a, b) => a.number_el - b.number_el)
    const elements = el.map((item) => {
        const { class_el,
            number_el,
            name_el,
            weight_el,
            f_name_el,
            // energy_lvl,
            // full_name_inf,
            // group_inf,
            // period_inf,
            // family_inf,
            // oxid_deg_inf,
            // el_conf_inf,
            l_r_el } = item;

        const inside = () => {
            if (l_r_el == 'left') {
                return (
                    <>
                        <div className="c_t"><div>{number_el}</div></div>
                        <div className="c_t"><div className="n_e">{name_el}</div><div>{weight_el}</div></div>
                        <div className="c_t"><div>{f_name_el}</div></div>
                    </>
                )
            }
            else if (l_r_el == 'right') {
                return (
                    <>
                        <div className="c_t"><div>{number_el}</div></div>
                        <div className="c_t"><div>{weight_el}</div><div className="n_e">{name_el}</div></div>
                        <div className="c_t"><div>{f_name_el}</div></div>
                    </>
                )
            }

        }
        return (<div
            key={f_name_el}
            className={class_el}
            id={name_el}
            tabIndex={'0'}
            onClick={() => info(name_el)}
        >
            {inside()}
        </div>)
    })

    // console.log(el)
    return (
        <>
            {elements}
        </>
    )
}

const info_element = (info_element_name, baseElement) => {
    if (baseElement.length == 0) {
        return (<h1>ЗАГРУЗКА</h1>)
    }
    else {
        const id = baseElement.findIndex((item) => item.name_el == info_element_name)
        let style = baseElement[id].class_el.split(' ')
        const element = (
            <>
                <div id="left_part_el">
                    <div>{baseElement[id].number_el}</div>
                    <div className="n_e">{baseElement[id].name_el}</div>
                    <div>{baseElement[id].f_name_el}</div>
                    <div>{baseElement[id].weight_el}</div>
                </div>
                <div id="right_part_el">
                    <div>
                        {baseElement[id].energy_lvl}
                    </div>
                </div>
            </>
        )
        let el_con = baseElement[id].el_conf_inf
        el_con = el_con.replace(/<sup>/g, '(');
        el_con = el_con.replace(/<\/sup>/g, ")")

        const info = (
            <>
                <div id="info_number">Номер: <b className="n_E">{baseElement[id].number_el}</b> </div>
                <div id="info_name">Имя: <b className="n_E">{baseElement[id].full_name_inf}</b> </div>
                <div id="info_weight">Масса: <b className="n_E">{baseElement[id].weight_el} а.е.м.</b> </div>
                <div id="info_g_p">Группа: <b className="n_E">{baseElement[id].group_inf}</b> Период: <b className="n_e">{baseElement[id].period_inf}</b></div>
                <div id="info_e-l">Эн. уровни: <b className="n_E">{baseElement[id].energy_lvl}</b></div>
                <div id="info_family">Семейство: <b className="n_E">{baseElement[id].family_inf}</b></div>
                <div id="info_o-d">Степень окис: <b className="n_E">{baseElement[id].oxid_deg_inf}</b></div>
                <div id="info_e-c">Электроная конф: <b className="n_E">{el_con}</b></div>
            </>
        )

        return (
            <>
                <div id="part_e_b-g">

                    <div id="element" className={style[1]}>
                        {element}
                    </div>
                    <button id="but_gr_el">📈</button>
                    <div id="panel_gr_el">
                        <div id="gr_el">
                            <canvas id="canvas_gr_el"></canvas>
                        </div>
                    </div>
                </div>
                <div id="info_element">
                    {info}
                </div>
            </>
        )
    }



}
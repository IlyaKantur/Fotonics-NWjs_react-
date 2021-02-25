import React, { Component } from 'react';

import './PTE.css';

export default class PTE extends Component {
    constructor(props) {
        super(props);


    }

    state = {

    }

    render() {

        return (
            <div id="Panel_PT">
                <div id="left_panel">
                    <div id="search_element">
                        <input id="inp_ser_el" type="search" placeholder="Поиск, в формате H" maxLength="2" />
                        <button id="but_ser_el">🔍</button>
                    </div>
                    <div>
                        <div id="part_e_b-g">
                            <div id="element">

                            </div>
                            <button id="but_gr_el">📈</button>
                            <div id="panel_gr_el">
                                <div id="gr_el">
                                    <canvas id="canvas_gr_el"></canvas>
                                </div>
                            </div>
                        </div>
                        <div id="info_element">

                        </div>
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

                            </div>
                            <div className="Row" id="row_2">

                            </div>
                            <div className="Row" id="row_3">

                            </div>
                            <div className="Row" id="row_4">

                            </div>
                            <div className="Row" id="row_5">

                            </div>
                            <div className="Row" id="row_6">

                            </div>
                            <div className="Row" id="row_7">

                            </div>
                            <div className="Row" id="row_8">

                            </div>
                            <div className="Row" id="row_9">

                            </div>
                            <div className="Row" id="row_10">

                            </div>
                        </div>
                    </div>
                    <div id="bottom">
                        <div className="b_n">*ЛАНТАНОИДЫ</div>
                        <div id="lanthanides">

                        </div>
                        <div className="b_n">**АКТИНОИДЫ</div>
                        <div id="actinide">

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
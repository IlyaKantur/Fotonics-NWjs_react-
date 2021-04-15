import React, { Component } from 'react';
const fs = window.require('fs');
import Menu from '../main/manu.js';
// import MenuBar from '../main/MenuBar';
import TabWP from '../tab/create_tab.js';
import Frame from '../frams/create_frame.js';
import Alert from '../alert/alert.js';

import './App.css';

export default class App extends Component {

    constructor(props){
        super(props)
        this.library_Tab = [
            { nameWP: "choice", text: "Выбор"},
            { nameWP: 'method_1D', text: "Обработка_1D"},
            { nameWP: "method_2D", text: "Обработка_2D"},
            { nameWP: "PTE", text: "PTE"},
            { nameWP: "camera", text: "Камера"}
        ]
    }

    state = {
        tab: [
            { nameWP: "choice", text: "Выбор", id_t: '1' },
            { nameWP: 'method_1D', text: "Обработка_1D", id_t: '1' },
            // { nameWP: "method_2D", text: "Обработка_2D", id_t: '1' },
            // { nameWP: "PTE", text: "PTE", id_t: '1' },
            { nameWP: "camera", text: "Камера", id_t: '1' }

        ],
        frame: [
            { nameF: "choice", id_f: '1' },
            { nameF: 'method_1D', id_f: '1' },
            // { nameF: "method_2D", id_f: '1' },
            // { nameF: "PTE", id_f: '1' },
            { nameF: "camera", id_f: '1' }
        ],
        activeFrame: { name: "method_1D", id: '1' },
        activeAlert: [{ text: 'test крестика', id: '0' }],
        baseElement: []
    }

    componentDidMount() {
        this.create_menu();
        this.load_base().then((baseElement) => {
            this.setState({
                baseElement: baseElement
            })
        })
    }

    create_menu = () => {
        CreateMenu(this.createTab)
    }

    createTab = (text) => {
        const {tab, frame} = this.state;
        const Tab = this.library_Tab.find(item => item.nameWP == text);
        const count = frame.filter(item => item.nameF == text).length + 1
        const newTab = {nameWP: text, text: Tab.text, id_t: count}
        const newFrame = {nameF: text, id_f: count}
        this.setState({
            tab:[...tab, newTab],
            frame:[...frame, newFrame],
            activeFrame:{name: text, id: count}
        })
    }

    load_base = () => {
        return new Promise((resolve, reject) => {
            const baseFolder = './Base';
            fs.readdir(baseFolder, (err, masFold) => {
                if (err) {
                    console.log(err);
                    return;
                }
                this.load_element(baseFolder, masFold).then((baseElement) => {
                    resolve(baseElement)
                });
            })
        });
    }

    load_element = (baseFolder, masFold) => {
        return new Promise((resolve, reject) => {
            let baseElement = [];
            for (let i = 0; i < masFold.length; i++) {
                let row_el, class_el, number_el, weight_el, f_name_el, l_r_el, name_el;
                let file = new File(`${baseFolder}/${masFold[i]}/${masFold[i]}.dat`, `${masFold[i]}.dat`)
                let reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function () {
                    let result = reader.result.split('\n');
                    result.forEach((str, i, result) => {
                        let from = str.search('/');
                        str = str.substring(from + 1, str.length)
                        result[i] = str;
                    })
                    row_el = result[0].trim();
                    class_el = result[1].trim();
                    number_el = result[3];
                    name_el = result[4].trim();
                    weight_el = result[6];
                    f_name_el = result[5].trim();
                    l_r_el = result[2].trim();
                    baseElement[i] = {
                        row_el: row_el,
                        class_el: class_el,
                        number_el: number_el,
                        name_el: name_el,
                        weight_el: weight_el,
                        f_name_el: f_name_el,
                        energy_lvl: result[7],
                        full_name_inf: result[8],
                        group_inf: result[9],
                        period_inf: result[10],
                        family_inf: result[11],
                        oxid_deg_inf: result[12],
                        el_conf_inf: result[13],
                        l_r_el: l_r_el
                    }
                    if (i == masFold.length - 1) {
                        resolve(baseElement)
                    }
                }
            }

        })
    }

    onSwitch = (nameWP, id_t) => {
        const { name, id } = this.state.activeFrame;

        if (`${nameWP}_tab_${id_t}` == `${name}_tab_${id}`) return;
        else {
            this.setState({
                activeFrame: { name: nameWP, id: id_t }
            })
        }
    }

    onClose = (nameWP, id_t) => {
        console.log(`Click close tab: ${nameWP}_tab_${id_t}`)
        this.setState(({ tab, frame, activeFrame }) => {
            let newActiveFrame, element;
            const index = tab.findIndex(elem => elem.nameWP === nameWP && elem.id_t === id_t);

            const beforeT = tab.slice(0, index);
            const beforeF = frame.slice(0, index);
            const afterT = tab.slice(index + 1);
            const afterF = frame.slice(index + 1);

            const newTab = [...beforeT, ...afterT];
            const newFrame = [...beforeF, ...afterF];

            if (nameWP === activeFrame.name && id_t === activeFrame.id) {
                let name, id;
                if (tab.length == 1) {
                    return {
                        tab: newTab,
                        frame: newFrame
                    }
                }
                if (index == 0) {
                    element = tab.slice(1, 2)
                }
                else {
                    element = tab.slice(index - 1, index);
                }
                name = element[0].nameWP;
                id = element[0].id_t;
                newActiveFrame = { name: name, id: id }
                return {
                    tab: newTab,
                    frame: newFrame,
                    activeFrame: newActiveFrame
                }
            }
            return {
                tab: newTab,
                frame: newFrame,
            }
        })
    }

    onAlert = (message) => {
        this.setState(({ activeAlert }) => {
            let id;
            if (activeAlert.length == 0) {
                id = 0;
            }
            else {
                id = activeAlert[activeAlert.length - 1].id + 1;
            }
            const before = activeAlert;
            const newAlert = { text: message, id: id };
            const newM = [...before, newAlert];
            // setTimeout(() =>{
            //     this.setState(({activeAlert}) =>{
            //         let after_1s = []
            //         if(!activeAlert.length == 1) after_1s = activeAlert.slice(activeAlert.length - 1);
            //         return{
            //             activeAlert: after_1s
            //         }
            //     })
            // },1000)
            return {
                activeAlert: newM
            }
        })
    }

    closeAlert = (id) => {
        this.setState(({ activeAlert }) => {
            const index = activeAlert.findIndex((item) => item.id == id)
            const before = activeAlert.slice(0, index);
            const after = activeAlert.slice(index + 1);
            const neew = [...before, ...after];

            return {
                activeAlert: neew
            }
        })
    }

    render() {
        const { tab, frame, activeFrame, activeAlert, baseElement } = this.state
        return (
            <>
                <Alert activeAlert={activeAlert} closeAlert={this.closeAlert} />
                {/* <MenuBar /> */}
                <div id="work_place" className="panel">
                    <div id="panel_WP">
                        <TabWP
                            posts={tab}
                            onSwitch={this.onSwitch}
                            onClose={this.onClose}
                            activeFrame={activeFrame}
                        ></TabWP>
                    </div>
                    <div id="frames">
                        <Frame
                            posts={frame}
                            activeFrame={activeFrame}
                            onAlert={this.onAlert}
                            baseElement={baseElement}
                            createTab={this.createTab}
                        ></Frame>
                    </div>
                </div>
            </>
        )

    }

}

const CreateMenu = (create) => {
    let menuBar = Menu().create;

    let MENU = {
        file: {
            label: 'Файл',
            submenu: [
                // {
                //     label: 'Файлы',
                //     click: () => { }
                // },
                // {
                //     label: 'Сохранить',
                //     click: () => { }
                // },
                {
                    label: 'Закрыть',
                    click: () => {
                        window.close();
                    }

                }
            ]
        },
        choice: {
            label: 'Метод',
            submenu: [
                {
                    label: 'Одномерный детектор',
                    click: () => {
                        create("method_1D")
                        // console.log("1D")
                    }
                },
                {
                    label: 'Двумерный детектор',
                    click: () => {
                        create("method_2D")
                    }
                },
                {
                    label: 'Камера',
                    click: () => {
                        create("camera")
                    }
                }
            ]
        },
        reference: {
            label: 'Справка',
            submenu: [{
                label: 'Пер. таблица',
                click: () => {
                    create("PTE")
                }
            }]
        }
    };
    menuBar(MENU);
}
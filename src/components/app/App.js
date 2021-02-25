import React, { Component } from 'react';

import Menu from '../main/manu.js';
import TabWP from '../tab/create_tab.js';
import Frame from '../frams/create_frame.js';
import Alert from '../alert/alert.js';

import './App.css';

export default class App extends Component {

    state = {
        tab: [
            { nameWP: "choice", text: "Выбор", id_t: '1' },
            { nameWP: "method_2D", text: "Обработка", id_t: '1' },
            { nameWP: "PTE", text: "PTE", id_t: '1'}
        ],
        frame: [
            { nameF: "choice", id_f: '1' },
            { nameF: "method_2D", id_f: '1' },
            { nameF: "PTE", id_f: '1'}
        ],
        activeFrame: { name: "PTE", id: '1' },
        activeAlert: [ {text: 'test крестика', id: '0'}]
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
            if(activeAlert.length == 0)
            {
                id = 0;
            }
            else{
                id = activeAlert[activeAlert.length - 1].id + 1;
            }
            const before = activeAlert;
            const newAlert = { text: message, id: id};
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
            const neew = [... before, ...after];

            return {
                activeAlert: neew
            }
        })
    }

    render() {

        const { tab, frame, activeFrame, activeAlert } = this.state
        return (
            <>
                <Alert activeAlert={activeAlert} closeAlert = {this.closeAlert}/>
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
                        ></Frame>
                    </div>
                </div>
            </>
        )

    }

}

window.addEventListener('DOMContentLoaded', () => {

    let menuBar = Menu().create;
    // let createTab = CreateTab().create;

    // (function () {
    //     let main_frame_fold = 'choice.html';
    //     let main_frame_name = 'Режим';
    //     let main_frame_id = main_frame_fold.substring(0, main_frame_fold.length - 5);
    //     createTab({
    //         foldWP: main_frame_fold,
    //         nameWP: main_frame_name
    //     })
    // }());

    let MENU = {
        file: {
            label: 'Файл',
            submenu: [{
                label: 'Файлы',
                click: () => { }
            },
            {
                label: 'Сохранить',
                click: () => { }
            },
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
            submenu: [{
                label: 'Двумерный детектор',
                click: () => {
                    createTab({
                        foldWP: 'metodDD.html',
                        nameWP: 'Двумерный'
                    })
                }
            }]
        },
        reference: {
            label: 'Справка',
            submenu: [{
                label: 'Пер. таблица',
                click: () => {
                    createTab({
                        foldWP: 'periodic_table.html',
                        nameWP: 'Пер. Таблица'
                    })
                }
            }]
        }
    };
    menuBar(MENU);
})
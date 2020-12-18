import React, {Component} from 'react';

import Menu from '../main/manu.js';
import TabWP from '../tab/create_tab.js';
import Frame from '../frams/create_frame.js';

import './App.css';

export default class App extends Component{

    state = {
        tab: [
            {nameWP: "choice", text: "Выбор", id_t: '1'},
            {nameWP: "method_2D", text: "Обработка", id_t: '1'}
        ], 
        frame: [
            {nameF: "choice", id_f: '1'},
            {nameF: "method_2D", id_f: '1'}
        ],
        activeFrame: {name: "choice", id: '1'}
    }

    onSwitch = (nameWP, id_t) => {
        const {name, id} = this.state.activeFrame;

        if(`${nameWP}_tab_${id_t}` == `${name}_tab_${id}`) return;
        else{
            this.setState({
               activeFrame: {name: nameWP, id: id_t}
            })
        }
    }

    onClose = (id) => {
        console.log(`Click close tab: ${id}`)
    }
        
    render(){

        const {tab, frame, activeFrame} = this.state

        return(
            <>
                <div id="work_place" className="panel">
                    <div id="panel_WP">
                        <TabWP 
                            posts = {tab}
                            onSwitch = {this.onSwitch}
                            onClose = {this.onClose}
                            activeFrame = {activeFrame}
                        ></TabWP>
                    </div>
                    <div id="frames">
                        <Frame
                            posts = {frame}
                            activeFrame = {activeFrame}
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
                    click: () => {}
                },
                {
                    label: 'Сохранить',
                    click: () => {}
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
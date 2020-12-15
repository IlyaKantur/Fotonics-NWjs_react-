import React, {Component} from 'react';

import Menu from '../main/manu.js';
import TabWP from '../tab/create_tab.js';
import Choise from '../choice/choice.js';

import './App.css';

export default class App extends Component{

    state = {
        tab: [
            {nameWP: "choice", text: "Выбор", id: '1'},
        ],
        frame: [
            
        ]
    }

    onSwitch = (id) => {
        console.log(`Click tab: ${id}`)
        // SwitchTab.switchTab(id)
    }

    onClose = (id) => {
        console.log(`Click close tab: ${id}`)
    }
        
    render(){

        const {tab} = this.state

        return(
            <>
                <div id="work_place" className="panel">
                    <div id="panel_WP">
                        <TabWP 
                            posts = {tab}
                            onSwitch = {this.onSwitch}
                            onClose = {this.onClose}
                        ></TabWP>
                    </div>
                    <div id="frames">
                        <Choise id = 'choice' className = "frame" zindex = '0' ></Choise>
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
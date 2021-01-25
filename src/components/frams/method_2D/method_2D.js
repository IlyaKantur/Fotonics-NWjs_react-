import React, { Component } from 'react';
import L_P_Panel from './parts/l_p_panel.js';
import loadImg from './function/loadImg.js';
import processing from './function/processing.js';
// import regeneratorRuntime from "regenerator-runtime";

import './method_2D.css';

export default class Method_2D extends Component {

    constructor(props) {
        super(props);
        this.defolt_folder_base = './Foto/Foto_base';
        this.defolt_folder_observ = './Foto/Foto_observ';
        this.imgFolder = null;
        this.masImg = [],
        this.imgFon = [],
        this.finished = false,
        this.imgnum = 0
    }

    state = {
        masx: [],
        data: [],
        oldY: [],
        massum: [],
        consoleMessage: []
    }

    reloadData = (masx, massum) => {
        const data = [
            {
                x: masx,
                y: massum,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'}
            }];
        return data;
    }

    loadFolder = () => {
        const chek_obsorv = document.getElementById("chek_obsorv");
        loadImg().loadFolder(chek_obsorv.checked).then((folder) => {
            this.imgFolder = folder;
        });
    }

    loadFoldImg = () => {
        loadImg().loadFoldImg().then((mas) => {
            this.masImg = mas;
        })
    }

    loadFonImg = () => {
        loadImg().loadFonImg().then((fon) => {
            this.imgFon = fon;
        })
    }

    startPush = () => {
        const chek_obsorv = document.getElementById("chek_obsorv");
        const { imgFolder } = this.state;
        if (chek_obsorv.checked) {
            console.log("Наблюдение")
            let folder = imgFolder || this.defolt_folder_observ;
            loadImg().loadObservation(folder, 0).then((mas) => {
                this.masImg = mas
                this.start();
            })
        } else {
            if (this.masImg.length == 0) {
                loadImg().loadFolderImg(this.defolt_folder_base).then((mas) => {
                    this.masImg = mas;
                    this.start();
                })
            } else {
                this.start();
            }
        }
    }

    applyCoor = () => {
        const {masx} = this.state;
        let massum = [];
        if (this.finished == true) {
            let masInput = document.querySelectorAll('.y_input');
            for (let i = 0; i < masInput.length; i++) {
                massum[i] = masInput[i].value;
            }
            const data = this.reloadData(masx, massum)
            this.setState({
                data: data,
                massum: massum
            })
        }
    }

    returnCoor = () => {
        const {oldY, masx} = this.state;
        let massum = [];
        if (this.finished == true) {
            let masInput = document.querySelectorAll('.y_input');
            for (let i = 0; i < masInput.length; i++) {
                masInput[i].value = oldY[i];
                massum[i] = masInput[i].value;
            }
            const data = this.reloadData(masx, oldY)
            this.setState({
                data: data,
                massum: massum
            })
        }
    }

    start = () => {
        console.log("Click Start");
        this.setState({
            finished: false,
            imgnum: 0
        });
        this.finished = false;
        this.imgnum = 0;
        processing({onConsoleMessage: this.onConsoleMessage}).start({ mas: this.masImg, fon: this.imgFon, num: this.imgnum, finish: this.finished,  }).then(({massum, masx, finished, oldY}) => {

            const data = this.reloadData(masx, massum)
            this.finished = finished;
            this.setState({
                masx: masx,
                data: data,
                oldY: oldY,
                massum: massum,
            })
        })
    }

    onConsoleMessage = (message) => {
        this.setState(({ consoleMessage }) => {
            let id;
            if (consoleMessage.length == 0) { id = 0; }
            else { id = consoleMessage[consoleMessage.length - 1].id + 1; }
            let hours = new Date().getHours();
            let minutes = new Date().getMinutes();
            let seconds = new Date().getSeconds();
            if (hours < 10) hours = `0${hours}`;
            if (minutes < 10) minutes = `0${minutes}`;
            if (seconds < 10) seconds = `0${seconds}`;
            const time = `${hours}:${minutes}:${seconds}`
            const before = consoleMessage;
            const newMessage = { message: message, id: id, time: time };
            const newM = [...before, newMessage];
            return{
                consoleMessage: newM
            } 
        })
    }

    render() {
        const {data, massum, consoleMessage} = this.state
        return (
            <L_P_Panel
                loadFolder={this.loadFolder}
                loadFoldImg={this.loadFoldImg}
                loadFonImg={this.loadFonImg}
                startPush={this.startPush}
                massum={massum}
                applyCoor={this.applyCoor}
                returnCoor={this.returnCoor}
                data={data}
                consoleMessage = {consoleMessage}
                onConsoleMessage = {this.onConsoleMessage}

            ></L_P_Panel>
        )
    }

}



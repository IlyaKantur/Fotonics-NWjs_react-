import React, { Component } from 'react';
import L_P_Panel from './parts/l_p_panel.js';
import loadImg from './function/loadImg.js';
import Processing from './function/processing.js'
// import regeneratorRuntime from "regenerator-runtime";

import './method_2D.css';

export default class Method_2D extends Component {

    constructor(props) {
        super(props);
        this.defolt_folder_base = './Foto/Foto_base';
        this.defolt_folder_observ = './Foto/Foto_observ';

        this.imgnum = 0;
        this.imgFolder = null;
        this.masImg = [];
        this.imgFon = [];
        this.finished = false

        this.proces;
    }

    state = {
        masx: [],
        data: [],
        revision: 0,
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
                marker: { color: 'red' }
            }];
        this.setState({
            data: data,
            revision: this.state.revision + 1
        })
    }

    loadFolder = (id_f_nameF) => {
        const chek_obsorv = document.getElementById(`chek_obsorv_${id_f_nameF}`).checked
        loadImg().loadFolder(chek_obsorv).then(({ masImg, imgFolder }) => {
            this.imgFolder = imgFolder;
            if (!chek_obsorv) {
                this.masImg = masImg
            }
        });
    }

    loadFoldImg = (id_f_nameF) => {
        const chek_obsorv = document.getElementById(`chek_obsorv_${id_f_nameF}`).checked
        loadImg().loadFoldImg().then(({ masImg, imgFolder }) => {
            this.masImg = masImg;
            this.imgFolder = imgFolder;
        })
    }

    loadFonImg = (id_f_nameF) => {
        const chek_obsorv = document.getElementById(`chek_obsorv_${id_f_nameF}`).checked
        loadImg().loadFonImg().then((fon) => {
            this.imgFon = fon;
        })
    }

    startPush = (id_f_nameF) => {
        const { imgFolder } = this.state;
        const chek_obsorv = document.getElementById(`chek_obsorv_${id_f_nameF}`).checked;
        if (chek_obsorv) {
            // вставить надпись в консоль о начале наблюдения
            console.log("Наблюдение")
            let folder = imgFolder || this.defolt_folder_observ;
            loadImg().loadObservation(folder, 0).then((mas) => {
                this.masImg = mas
                this.start({ id_f_nameF, chek_obsorv });
            })
        } else {
            if (this.masImg.length == 0) {
                loadImg().loadFolderImg(this.defolt_folder_base).then((mas) => {
                    this.masImg = mas;
                    this.start({ id_f_nameF, chek_obsorv });
                })
            } else {
                this.start({ id_f_nameF, chek_obsorv });
            }
        }
    }

    applyCoor = () => {
        const { masx } = this.state;
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
        const { oldY, masx } = this.state;
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

    start = ({ id_f_nameF, chek_obsorv }) => {
        console.log("Click Start");
        this.finished = false;
        this.imgnum = 0;

        const onConsoleMessage = this.onConsoleMessage;
        const imgnum = this.imgnum;
        const imgFolder = this.imgFolder;
        const masImg = this.masImg;
        this.proces = new Processing({ onConsoleMessage: onConsoleMessage, id_f_nameF: id_f_nameF, chek_obsorv: chek_obsorv, imgFolder: imgFolder, imgnum: imgnum, masImg: masImg, fon: this.imgFon })

        this.proces.start().then(({ massum, masx, finished, oldY, imgnum }) => {
            this.reloadData(masx, massum)
            this.imgnum = imgnum;
            this.finished = finished;
            this.setState({
                masx: masx,
                oldY: oldY,
                massum: massum,
            })
            if (!finished) {
                this.timerId = setInterval(this.work, 10)
            }

        })
    }
    work = () => {
        this.proces.workOnImg().then(({ massum, masx, finished, oldY, imgnum }) => {
            this.reloadData(masx, massum)
            this.imgnum = imgnum;
            this.finished = finished;
            this.setState({
                masx: masx,
                oldY: oldY,
                massum: massum,
            })
            if (finished) {
                this.timerId = clearInterval(this.timerId)
            }

            // let req = requestAnimationFrame(() => this.work(id_f_nameF, chek_obsorv));
            // if (finished) {
            //     cancelAnimationFrame(req);
            // }
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
            return {
                consoleMessage: newM
            }
        })
    }

    render() {
        const { id_item } = this.props;
        const { data, revision, massum, consoleMessage } = this.state
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
                revision={revision}
                consoleMessage={consoleMessage}
                onConsoleMessage={this.onConsoleMessage}
                id_item={id_item}
                finished={this.finished}
            ></L_P_Panel>
        )
    }

}



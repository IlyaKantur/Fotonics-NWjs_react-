import React, { Component } from 'react';
import L_P_Panel from './parts/l_p_panel.js';
import loadImg from './function/loadImg.js';
import Processing from './function/processing.js'
// import regeneratorRuntime from "regenerator-runtime";

import './method_2D.css';
const fs = window.require('fs');

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

        this.masInformation_2D={
            method: 'Двумерный',
            chek_obsorv: false,
            SaveLast: false,
            nameElement: '',
            AxisX: 'X',
            AxisY: 'Y',
            Iter: false,
            IterN: 0,
            BF: false,
            Delta: false,
            DFon: 3,
            BPix: false,
            Gran: false,
            Xx: 200,
            XX: 1000,
            Yy: 100,
            YY: 800,
            add_information: '',
        }
        this.nameInformation_2D =
        [
            "Название метода:", "*Режим наблюдения:", "*Сохранить последний:", "Название элемента:",
            "ОсьХ:", "ОсьY:", "*Ограниченное количество:", "Количество:", "*Без фильтрации:", "*Вычесть дельта:",
            "Дельта:", "*Вычет битого пикселя:", "*Включить границы:", "Начало по горизонтале:", "Конец по горизонтали",
            "Начало по вертикали:", "Конец по вертикали:", `Дополнительная информация \n`
        ]
    }

    state = {
        masx: [],
        data: [],
        revision: 0,
        oldY: [],
        massum: [],
        consoleMessage: []
    }

    stored_value = (name ,value) => {
        this.masInformation_2D[name] = value
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
        loadImg().loadFolder(this.masInformation_2D.chek_obsorv).then(({ masImg, imgFolder }) => {
            this.imgFolder = imgFolder;
            if (!this.masInformation_2D.chek_obsorv) {
                this.masImg = masImg
            }
        });
    }

    loadFoldImg = (id_f_nameF) => {
        loadImg().loadFoldImg().then(({ masImg, imgFolder }) => {
            this.masImg = masImg;
            this.imgFolder = imgFolder;
        })
    }

    loadFonImg = (id_f_nameF) => {
        loadImg().loadFonImg().then((fon) => {
            this.imgFon = fon;
        })
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

    startPush = (id_f_nameF) => {
        const { imgFolder } = this.state;
        const chek_obsorv = document.getElementById(`chek_obsorv_${id_f_nameF}`).checked;
        if (chek_obsorv) {
            // вставить надпись в консоль о начале наблюдения
            console.log("Наблюдение")
            let folder = imgFolder || this.defolt_folder_observ;
            loadImg().loadObservation(folder, 0).then(({masImg}) => {
                this.masImg = masImg
                this.start({ id_f_nameF, chek_obsorv });
            })
        } else {
            if (this.masImg.length == 0) {
                loadImg().loadFolderImg(this.defolt_folder_base).then(({masImg}) => {
                    this.masImg = masImg;
                    this.start({ id_f_nameF, chek_obsorv });
                })
            } else {
                this.start({ id_f_nameF, chek_obsorv });
            }
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
        this.proces = new Processing({ 
            onConsoleMessage: onConsoleMessage, id_f_nameF: id_f_nameF,
            chek_obsorv: chek_obsorv, imgFolder: imgFolder, imgnum: imgnum,
            masImg: masImg, fon: this.imgFon, masInformation_2D: this.masInformation_2D })

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
                this.save_protocol();
            }

            // let req = requestAnimationFrame(() => this.work(id_f_nameF, chek_obsorv));
            // if (finished) {
            //     cancelAnimationFrame(req);
            // }
        })
    }

    save_protocol = () => {
        const nameFolderProtocol = this.masInformation_2D.nameElement || 'NoName';
        const date = new Date();
        const dataProtocol = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        const timeProtocol = `${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`
        const dir = `result/protocol/${nameFolderProtocol}`
        fs.mkdir(dir, err => {
            if (err.code != "EEXIST") { console.log(err); throw err };
            fs.mkdir(`${dir}/${dataProtocol}`, err => {
                if (err.code != "EEXIST") { console.log(err); throw err };
                let file = fs.createWriteStream(`./${dir}/${dataProtocol}/2D_${timeProtocol}.dat`);
                file.on('error', function (err) { console.log(err) })
                // const keys = Object.keys(this.masInformation);
                const values = Object.values(this.masInformation_2D);
                file.write(
                    `Дата записи: ${dataProtocol}\nВремя записи: ${timeProtocol}\n`
                )
                this.nameInformation_2D.forEach((item, i) => { file.write(`${item} ${values[i]} \n`) })
                file.end();
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
            return {
                consoleMessage: newM
            }
        })
    }

    render() {
        const { id_item, Plot } = this.props;
        const { data, revision, massum, consoleMessage, } = this.state
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
                Plot = {Plot}
                masInformation_2D={this.masInformation_2D}
                stored_value={this.stored_value}
            ></L_P_Panel>
        )
    }

}



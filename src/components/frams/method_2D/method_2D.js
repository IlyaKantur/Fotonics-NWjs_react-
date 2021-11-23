import React, { PureComponent } from 'react';
import L_P_Panel from './parts/l_p_panel.js';
import loadImg from './function/loadImg.js';
import Processing from './function/processing.js'
// import regeneratorRuntime from "regenerator-runtime";

import './method_2D.css';
const fs = window.require('fs');

export default class Method_2D extends PureComponent {

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

        this.masInformation_2D = {
            method: 'Двумерный',
            chek_obsorv: false,
            double_processing: false,
            SaveLast: false,
            nameElement: '',
            AxisX: 'X',
            AxisY: 'Y',
            Iter: false,
            IterN: 0,
            IntPix: false,
            MinInt: 5,
            BF: false,
            Delta: false,
            DFon: 3,
            BPix: false,
            DBPix: 20,
            gain1: false,
            k_gain1: 0,
            minInt_gain1: 100,
            n_smoothing: 3,
            en_first_point: 0,
            en_second_point: 0,
            n_first_point: 0,
            n_second_point: 0,
            Gran: false,
            Xx: 300,
            XX: 1100,
            Yy: 100,
            YY: 900,
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
        coor_massum: [],
        coor_masx: [],
        consoleMessage: []
    }

    stored_value = (name, value) => {
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
            masx: masx,
            massum: massum,
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
        if (this.finished) {
            let masInput = document.querySelectorAll('.y_input_2D');
            for (let i = 0; i < masInput.length; i++) {
                massum[i] = +masInput[i].value;
            }
            this.reloadData(masx, massum)
            this.setState({
                coor_massum: massum,
                coor_masx: masx
            })
        }
    }

    returnCoor = () => {
        const { oldY, masx } = this.state;
        let massum = [];
        if (this.finished) {
            let masInput = document.querySelectorAll('.y_input_2D');
            for (let i = 0; i < masInput.length; i++) {
                masInput[i].value = oldY[i];
                massum[i] = oldY[i];
            }
            this.reloadData(masx, oldY)
            this.setState({
                coor_massum: massum,
                coor_masx: masx
            })
        }
    }

    startPush = (id_f_nameF) => {
        const { imgFolder } = this.state;
        this.setState({
            masx: [],
            massum: [],
            oldX: [],
            oldY: [],
            coor_masx: [],
            coor_massum: []
        })
        this.reloadData([], [])
        
        // let cookies = nw.Window.get().cookies.getAll
        // nw.App.clearAppCache(nw.App.manifest);//

        const chek_obsorv = document.getElementById(`chek_obsorv_${id_f_nameF}`).checked;
        let folder = imgFolder || this.defolt_folder_observ;
        if (chek_obsorv) {
            // вставить надпись в консоль о начале наблюдения
            console.log("Наблюдение")
            loadImg().loadObservation(folder, 0).then(({ masImg }) => {
                this.masImg = masImg
                this.start({ id_f_nameF, folder});
            })
        } else {
            if (this.masImg.length == 0) {
                loadImg().loadFolderImg(this.defolt_folder_base).then(({ masImg }) => {
                    this.masImg = masImg;
                    this.start({ id_f_nameF, folder});
                })
            } else {
                this.start({ id_f_nameF, folder});
            }
        }
    }

    start = ({ id_f_nameF, folder}) => {
        console.log("Click Start");
        const chek_obsorv = document.getElementById(`chek_obsorv_${id_f_nameF}`).checked;
        this.finished = false;
        this.imgnum = 0;
        const onConsoleMessage = this.onConsoleMessage;
        const imgnum = this.imgnum;
        const imgFolder = this.imgFolder;
        const masImg = this.masImg;
        this.proces = new Processing({
            onConsoleMessage: onConsoleMessage, id_f_nameF: id_f_nameF,
            chek_obsorv: chek_obsorv, imgFolder: imgFolder, imgnum: imgnum,
            masImg: masImg, fon: this.imgFon, masInformation_2D: this.masInformation_2D
        })

        this.proces.start().then(({ massum, masx, finished, oldY, imgnum }) => {
            this.reloadData(masx, massum)
            this.imgnum = imgnum;
            this.finished = finished;
            this.setState({
                masx: masx,
                oldY: oldY,
                massum: massum,
            })
            if (!finished && !chek_obsorv) {
                this.timerId = setInterval(() => this.work(folder), 10)
            }
            else if(!finished && chek_obsorv){
                if(this.masImg.length == imgnum){
                    loadImg().loadObservation(folder, imgnum).then(({ masImg }) => {
                        this.masImg = masImg
                        setTimeout(()=> this.work(folder), 0);
                    })
                }
                else{
                    setTimeout(()=> this.work(folder), 0);
                }
            }
            else {
                this.finished = finished;
                this.save_protocol();
                this.setState({
                    coor_massum: massum,
                    coor_masx: masx
                })
            }

        })
    }
    work = (folder) => {
        const {chek_obsorv} = this.masInformation_2D;
        this.proces.workOnImg(this.masImg, chek_obsorv).then(({ massum, masx, finished, oldY, imgnum }) => {
            if(chek_obsorv) this.masImg[this.imgnum] = null;
            this.reloadData(masx, massum)
            this.imgnum = imgnum;
            this.finished = finished;
            this.setState({
                oldY: oldY,
            })
            if(!finished && chek_obsorv){
                if(this.masImg.length == imgnum){
                    loadImg().loadObservation(folder, imgnum).then(({ masImg }) => {
                        this.masImg = masImg
                        setTimeout(()=> this.work(folder), 0);
                    })
                }
                else{
                    setTimeout(()=> this.work(folder), 0);
                }
            }
            if (finished) {
                this.finished = finished;
                this.timerId = clearInterval(this.timerId);
                this.save_protocol();
                this.setState({
                    coor_massum: massum,
                    coor_masx: masx
                })
            }

            // let req = requestAnimationFrame(() => this.work(id_f_nameF, chek_obsorv));
            // if (finished) {
            //     cancelAnimationFrame(req);
            // }
        })
    }

    // Сглаживание

    smoothing = () => {
        if (this.finished) {
            let { massum } = this.state;
            const n = Number(this.masInformation_2D.n_smoothing);

            let sum = 0, del = 3, floor = Math.floor(n / 2);
            for (let i = 1; i <= floor; i++) {
                for (let j = 0; j < del; j++) {
                    sum += massum[j];
                }
                massum[i] = Math.ceil(sum / del);
                del += 2;
                sum = 0;
            }
            for (let i = floor + 1; i < massum.length - floor; i++) {
                sum = 0;
                for (let j = 0; j < n; j++) {
                    sum += massum[i + j - floor];
                }
                massum[i] = Math.ceil(sum / n);
            }
            let masInput = document.querySelectorAll('.y_input_2D');
            for (let i = 0; i < masInput.length; i++) {
                masInput[i].value = massum[i];
            }
            this.reloadData(this.state.masx, massum);
            this.setState({
                coor_massum: massum,
                coor_masx: this.state.masx
            })
        }
    }
    
    // Калибровка
    search_energe = (name) => {
        console.log(name)
    }
    
    calibration = () => {
        if (this.finished) {
            const { masx, massum } = this.state;
            let del_en = (this.masInformation_2D.en_second_point - this.masInformation_2D.en_first_point) /
                (this.masInformation_2D.n_second_point - this.masInformation_2D.n_first_point);
            let newCoor = [];
            newCoor[0] = +(this.masInformation_2D.en_first_point - del_en * this.masInformation_2D.n_first_point).toFixed(8)
            for (let i = 1; i < masx.length; i++) {
                newCoor[i] = +Number((newCoor[i - 1] + del_en)).toFixed(8);
            }
            let masInput = document.querySelectorAll('.x_element_2D');
            for (let i = 0; i < masInput.length; i++) {
                masInput[i].innerHTML = `${newCoor[i]}`;
            }
            this.reloadData(newCoor, massum);
            this.setState({
                coor_massum: massum,
                coor_masx: newCoor
            })
        }
    }

    

    save_protocol = () => {
        const nameFolderProtocol = this.masInformation_2D.nameElement || 'NoName';
        const date = new Date();
        const dataProtocol = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        const timeProtocol = `${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`
        const dir = `result/protocol/${nameFolderProtocol}`
        fs.mkdir(dir, err => {
            if (err.code != "EEXIST" && err != null) { console.log(err)};
            fs.mkdir(`${dir}/${dataProtocol}`, err => {
                if (err.code != "EEXIST" && err != null) { console.log(err)};
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

    onConsoleMessage = (message, work) => {
        this.setState(({ consoleMessage }) => {
            let id;
            if (consoleMessage.length == 0) { id = 0; }
            else if(work) { id = consoleMessage[consoleMessage.length - 1].id; }
            else { id = consoleMessage[consoleMessage.length - 1].id + 1; }
            let hours = new Date().getHours();
            let minutes = new Date().getMinutes();
            let seconds = new Date().getSeconds();
            if (hours < 10) hours = `0${hours}`;
            if (minutes < 10) minutes = `0${minutes}`;
            if (seconds < 10) seconds = `0${seconds}`;
            const time = `${hours}:${minutes}:${seconds}`
            const before = consoleMessage;
            if(work) before.pop()
            const newMessage = { message: message, id: id, time: time };
            const newM = [...before, newMessage];
            return {
                consoleMessage: newM
            }
        })
    }

    save = () => {
        const { masx, massum } = this.state;
        const path_save = `./result/TestObr/2D/${this.masInformation_2D.nameElement ? this.masInformation_2D.nameElement : 'NoName'}.dat`;

        const file_2D = fs.createWriteStream(path_save);
        file_2D.on('error', function (err) { console.log(err) })
        masx.forEach((item, i) => file_2D.write(`${item} ${massum[i]} \n`));
        file_2D.end();
    }

    render() {
        const { id_item, Plot } = this.props;
        const { data, revision, consoleMessage, coor_massum, coor_masx } = this.state
        return (
            <L_P_Panel
                loadFolder={this.loadFolder}
                loadFoldImg={this.loadFoldImg}
                loadFonImg={this.loadFonImg}
                startPush={this.startPush}
                coor_massum={coor_massum}
                coor_masx={coor_masx}
                calibration={this.calibration}
                search_energe={this.search_energe}
                applyCoor={this.applyCoor}
                returnCoor={this.returnCoor}
                data={data}
                revision={revision}
                consoleMessage={consoleMessage}
                onConsoleMessage={this.onConsoleMessage}
                id_item={id_item}
                finished={this.finished}
                Plot={Plot}
                masInformation_2D={this.masInformation_2D}
                stored_value={this.stored_value}
                save={this.save}
                smoothing={this.smoothing}
            ></L_P_Panel>
        )
    }

}



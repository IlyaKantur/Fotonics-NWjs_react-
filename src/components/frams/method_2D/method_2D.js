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
        this.folder;

        this.imgnum = 0;
        this.imgFolder = null;
        this.masImg = [];
        this.imgFon = [];

        this.masx = [];
        this.massum = [];

        this.finished = false;
        this.continue = true;

        this.proces;

        this.timeWork = 0;

        this.masInformation_2D = {
            method: 'Двумерный',
            chek_obsorv: false,
            SaveLast: false,
            Сompound: '',
            nameElement: '',
            Levels: {
                kA: true,
                kB: false
            },
            AxisX: 'Энергия фотонов (эВ)',
            AxisY: 'Интенсивность (отн.ед.)',
            Iter: false,
            IterN: 0,
            IntPix: true,
            MinInt: 5,
            BF: false,
            Delta: false,
            DFonFrom: 0,
            DFonTo: 6,
            BPix: false,
            DBPix: 0,
            gain1: false,
            k_gain1: 0,
            minInt_gain1: 100,
            SumСolumn: false,
            SumСolumnN: 2,
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
            Levels: {
                kA: true,
                kB: false
            }
        }
        this.nameInformation_2D =
            [
                "Название метода:", "*Режим наблюдения:", "*Сохранить последний:", "Соединение:", "Элемент:",
                "ОсьХ:", "ОсьY:", "*Ограниченное количество:", "Количество:", "*Без фильтрации:", "*Вычесть дельта:",
                "Дельта:", "*Вычет битого пикселя:", "*Включить границы:", "Начало по горизонтале:", "Конец по горизонтали",
                "Начало по вертикали:", "Конец по вертикали:", `Дополнительная информация \n`
            ]
    }

    componentWillUnmount() {
        clearTimeout(this.timeWork);
        this.finished = true
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
        let mx = [], msum = [];
        mx = masx.slice();
        msum = massum.slice();
        const data = [
            {
                x: mx,
                y: msum,
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
        const { coor_masx } = this.state;
        let massum = [];
        if (this.finished) {
            let masInput = document.querySelectorAll('.y_input_2D');
            for (let i = 0; i < masInput.length; i++) {
                massum[i] = +masInput[i].value;
            }
            this.reloadData(coor_masx, massum)
            this.setState({
                coor_massum: massum,
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
            })
        }
    }

    startPush = (id_f_nameF) => {
        const imgFolder = this.imgFolder;
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
        this.folder = imgFolder || this.defolt_folder_observ;
        if (chek_obsorv) {
            // вставить надпись в консоль о начале наблюдения
            console.log("Наблюдение")
            loadImg().loadObservation(this.folder, 0).then(({ masImg }) => {
                this.masImg = masImg
                this.start({ id_f_nameF });
            })
        } else {
            if (this.masImg.length == 0) {
                loadImg().loadFolderImg(this.defolt_folder_base).then(({ masImg }) => {
                    this.masImg = masImg;
                    this.start({ id_f_name });
                })
            } else {
                this.start({ id_f_nameF });
            }
        }
    }

    start = ({ id_f_nameF }) => {
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
                // this.timerId = setInterval(() => this.work(folder), 0)
                this.work()
            }
            else if (!finished && chek_obsorv) {
                if (this.masImg.length == imgnum) {
                    loadImg().loadObservation(this.folder, imgnum).then(({ masImg }) => {
                        this.masImg = masImg
                        this.timeWork = setTimeout(() => this.work(), 0);
                    })
                }
                else {
                    this.timeWork = setTimeout(() => this.work(), 0);
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
    work = () => {
        const { chek_obsorv } = this.masInformation_2D;
        if (!this.finished && this.continue) {
            this.proces.workOnImg(this.masImg, chek_obsorv).then(({ massum, masx, finished, oldY, imgnum }) => {
                if (chek_obsorv) this.masImg[this.imgnum] = null;
                if (imgnum % 5 === 0 || finished) { this.reloadData(masx, massum) }
                this.imgnum = imgnum;
                this.finished = finished;
                this.setState({
                    oldY: oldY,
                })
                if (!finished && chek_obsorv) {
                    if (this.masImg.length == imgnum) {
                        loadImg().loadObservation(this.folder, imgnum).then(({ masImg }) => {
                            this.masImg = masImg
                            this.timeWork = setTimeout(() => this.work(), 0);
                        })
                    }
                    else {
                        this.timeWork = setTimeout(() => this.work(), 0);
                    }
                }

                this.masx = masx.slice();
                this.massum = massum.slice();

                if (finished) {
                    this.Finished();
                }
                else {
                    this.timeWork = setTimeout(() => this.work(), 0);
                }
            })
        }

    }

    Finished = () => {
        this.finished = true;
        this.timerId = clearInterval(this.timerId);
        this.save_protocol();
        this.setState({
            coor_massum: this.massum,
            coor_masx: this.masx
        })
    }

    PauseContinue = (text_PauseContinue) => {
        switch (text_PauseContinue) {
            case 'Пауза':
                clearTimeout(this.timeWork);
                this.continue = false;
                break;
            case 'Продолжить':
                this.continue = true;
                this.work();
                break;
        }
    }

    Stop = (stopSave) => {
        this.Finished()
        // if(stopSave) 
        // else{
            
        // }
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
            })
        }
    }

    // Калибровка
    search_energe = (name) => {
        console.log(name)
    }

    calibration = () => {
        if (this.finished) {

            let newCoor = [];
            const { baseElement } = this.props;
            const { masx, massum } = this.state;

            if(!this.masInformation_2D.en_first_point && !this.masInformation_2D.en_second_poin){
                const id = baseElement.findIndex((item) => item.name_el == this.masInformation_2D.nameElement)
                if (this.masInformation_2D.Levels.kA) {
                    this.masInformation_2D.en_first_point = +baseElement[id].energy_foto[0] * 1000;
                    this.masInformation_2D.en_second_point = +baseElement[id].energy_foto[1] * 1000;
                }
                else {
                    this.masInformation_2D.en_first_point = +baseElement[id].energy_foto[3] * 1000;
                    this.masInformation_2D.en_second_point = +baseElement[id].energy_foto[5] * 1000;
                }
            }

            let del_en = (this.masInformation_2D.en_second_point - this.masInformation_2D.en_first_point) /
                (this.masInformation_2D.n_second_point - this.masInformation_2D.n_first_point);

            newCoor[0] = +(this.masInformation_2D.en_first_point - del_en * this.masInformation_2D.n_first_point).toFixed(4)
            for (let i = 1; i < masx.length; i++) {
                newCoor[i] = +Number((newCoor[i - 1] + del_en)).toFixed(4);
            }
            this.reloadData(newCoor, massum);
            this.setState({
                coor_massum: massum,
                coor_masx: newCoor
            })
        }
    }



    save_protocol = () => {

        let { Сompound, nameElement, Levels } = this.masInformation_2D;

        const date = new Date();
        const dataProtocol = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        const timeProtocol = `${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`

        Сompound = Сompound || 'Сompound';
        nameElement = nameElement || 'Element';
        Levels = Object.keys(Levels).filter(key => { return Levels[key] })

        let path_save = `./result/protocol/2D/`;
        let name_file = `Protocol_${nameElement}${Levels}_${timeProtocol}.dat`

        if (Сompound != 'Сompound') {
            path_save += `${Сompound}/`;
            name_file = `Protocol_${Сompound}_${nameElement}${Levels}_${timeProtocol}.dat`
            fs.mkdir(path_save, (err) => {if (err != null) { console.log(err) }})
        }
        path_save += `${nameElement}/`;


        fs.mkdir(path_save, (err) => {
            if (err != null) { console.log(err) };
            path_save += `${Levels[0]}/`
            fs.mkdir(path_save, err => {
                if (err != null) { console.log(err) };
                path_save += `${dataProtocol}/`;
                fs.mkdir(path_save, err => {
                    let file = fs.createWriteStream(`${path_save}/${name_file}`);
                    file.on('error', (err) => { console.log(err) })
                    // const keys = Object.keys(this.masInformation);
                    const values = Object.values(this.masInformation_2D);
                    file.write(
                        `Дата записи: ${dataProtocol}\nВремя записи: ${timeProtocol}\n`
                    )
                    this.nameInformation_2D.forEach((item, i) => { file.write(`${item} ${values[i]} \n`) })
                    file.end();
                })
            })
        })
    }

    onConsoleMessage = (message, work) => {
        this.setState(({ consoleMessage }) => {
            let id;
            if (consoleMessage.length == 0) { id = 0; }
            else if (work) { id = consoleMessage[consoleMessage.length - 1].id; }
            else { id = consoleMessage[consoleMessage.length - 1].id + 1; }
            let hours = new Date().getHours();
            let minutes = new Date().getMinutes();
            let seconds = new Date().getSeconds();
            if (hours < 10) hours = `0${hours}`;
            if (minutes < 10) minutes = `0${minutes}`;
            if (seconds < 10) seconds = `0${seconds}`;
            const time = `${hours}:${minutes}:${seconds}`
            const before = consoleMessage;
            if (work) before.pop()
            const newMessage = { message: message, id: id, time: time };
            const newM = [...before, newMessage];
            return {
                consoleMessage: newM
            }
        })
    }

    save = () => {
        const { coor_masx, coor_massum } = this.state;
        let { Сompound, nameElement, Levels } = this.masInformation_2D;

        const date = new Date();
        const dataProtocol = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        const timeProtocol = `${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`;

        Сompound = Сompound || 'Сompound';
        nameElement = nameElement || 'Element';
        Levels = Object.keys(Levels).filter(key => { return Levels[key] })

        let path_save = `./result/Processed/2D/`;
        let name_file = `${nameElement}_${Levels}_${timeProtocol}.dat`

        if (Сompound != 'Сompound') {
            path_save += `${Сompound}/`;
            name_file = `${Сompound}_${nameElement}_${Levels}_${timeProtocol}.dat`
            fs.mkdirSync(path_save, (err) => { })
        }

        path_save += `${nameElement}/`;
        fs.mkdir(path_save, (err) => {
            if (err != null) { console.log(err) };
            path_save += `${Levels[0]}/`
            fs.mkdir(path_save, (err) => {
                if (err != null) { console.log(err) };
                path_save += `${dataProtocol}/`;
                fs.mkdir(path_save, (err) => {
                    if (err != null) { console.log(err) };
                    const file = fs.createWriteStream(`${path_save}/${name_file}`);
                    file.on('error', function (err) { console.log(err) })
                    coor_masx.forEach((item, i) => file.write(`${item} ${coor_massum[i]} \n`));
                    file.end();
                })
            })
        })
    }

    switch_k = (Levels) => {
        this.masInformation_2D.Levels = Levels
    }

    render() {
        const { id_item, Plot, style } = this.props;
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
                switch_k={this.switch_k}
                PauseContinue={this.PauseContinue}
                Stop={this.Stop}
                style={style}
            ></L_P_Panel>
        )
    }

}



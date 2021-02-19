import React, { useState, useEffect } from 'react';
import L_P_Panel from './parts/l_p_panel.js';
import loadImg from './function/loadImg.js';
import Processing from './function/processing.js';

import './method_2D.css';

function Method_2D({ id_f_nameF, onAlert, id_item }) {

    const defolt_folder_base = './Foto/Foto_base';
    const defolt_folder_observ = './Foto/Foto_observ';

    let proces;

    const [masX, updataMasx] = useState([]);
    const [data, updateData] = useState([]);
    const [oldY, updateOldY] = useState([]);
    const [masSum, updateMasSum] = useState([]);
    const [consoleMessage, updateConsoleMessage] = useState([]);

    const [imgNum, updateImgNum] = useState(0);
    const [imgFolder, updateImgFolder] = useState(null);
    const [masImg, updateMasImg] = useState([])
    const [imgFon, updateImgFon] = useState([])
    const [finished, updateFinished] = useState(false)

    let reloadData = (masX, masSum) => {
        const data = [
            {
                x: masX,
                y: masSum,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' }
            }];
        updateData(data);
    }

    // Нажатие папка
    let loadFolder = (id_f_nameF) => {
        const chek_obsorv = document.getElementById(`chek_obsorv_${id_f_nameF}`).checked
        loadImg().loadFolder(chek_obsorv).then(({masImg, imgFolder}) => {
            updateImgFolder(imgFolder);
            if (!chek_obsorv) {
                updateMasImg(masImg);
            }
        });
    }

    // Нажатие Выбор
    let loadFoldImg = () => {
        loadImg().loadFoldImg().then(({masImg, imgFolder}) => {
            updateMasImg(masImg);
            updateImgFolder(imgFolder);
        })
    }

    // Нажатие Фон
    let loadFonImg = () => {
        loadImg().loadFonImg().then((fon) => {
            updateImgFon(fon);
        })
    }

    // Применение редактирования координат
    let applyCoor = () => {
        let mas = [];
        if (finished) {
            let masInput = document.querySelectorAll('.y_input');
            for (let i = 0; i < masInput.length; i++) {
                mas[i] = masInput[i].value;
            }
            reloadData(masX, mas);
            updateMasSum(mas);
        }
    }

    // Отмена редактирвоания
    let returnCoor = () => {
        let massum = [];
        if (finished) {
            let masInput = document.querySelectorAll('.y_input');
            for (let i = 0; i < masInput.length; i++) {
                masInput[i].value = oldY[i];
                massum[i] = masInput[i].value;
            }
            reloadData(masX, oldY);
            updateMasSum(massum);
        }
    }

    // Нажатие старт
    let startPush = (id_f_nameF) => {
        updateImgNum(0);
        let imgnum = 0
        const chek_obsorv = document.getElementById(`chek_obsorv_${id_f_nameF}`).checked;
        if (chek_obsorv) {
            // вставить надпись в консоль о начале наблюдения
            console.log("Наблюдение")
            let folder = imgFolder || defolt_folder_observ;
            loadImg().loadObservation(folder, 0).then((mas) => {
                updateMasImg(mas);
                start(chek_obsorv, id_f_nameF, imgnum);
            })
        } else {
            if (masImg.length == 0) {
                loadImg().loadFolderImg(defolt_folder_base).then((mas) => {
                    updateMasImg(mas);
                    start(chek_obsorv, id_f_nameF, imgnum);
                })
            } else {
                start(chek_obsorv, id_f_nameF, imgnum);
            }
        }
    }

    let start = (chek_obsorv, id_f_nameF, imgnum) => {
        console.log("Click Start");
        updateFinished(false);

        proces = new Processing({
            onConsoleMessage: onConsoleMessage,
            id_f_nameF: id_f_nameF,
            chek_obsorv: chek_obsorv,
            imgFolder: imgFolder,
            imgnum: imgnum,
            masImg: masImg,
            fon: imgFon
        })

        proces.start().then(({massum, masx, finished, oldY, imgnum}) => {
            reloadData(masx, massum);
            updateImgNum(imgnum);
            updateFinished(finished);
            updataMasx(masx);
            updateOldY(oldY);
            updateMasSum(massum)
            if (!finished) {
                work(chek_obsorv, id_f_nameF)
            }

        })
    }

    let work = (chek_obsorv, id_f_nameF) => {
        proces.workOnImg().then(({massum, masx, finished, oldY, imgnum}) => {
            reloadData(masx, massum);
            updateMasSum(massum);
            updataMasx(masx);
            updateFinished(finished);
            updateOldY(oldY);
            updateImgNum(imgnum);
            let req = requestAnimationFrame(() => work(chek_obsorv, id_f_nameF));
            if (finished) {
                cancelAnimationFrame(req);
            }
        })
    }

    let onConsoleMessage = (message) => {
        let id;
        if (consoleMessage.length == 0) { id = 0; }
        else { id = consoleMessage[consoleMessage.length - 1].id + 2; }

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
        updateConsoleMessage(newM);
    }

    return (
        <L_P_Panel
            loadFolder={loadFolder}
            loadFoldImg={loadFoldImg}
            loadFonImg={loadFonImg}
            startPush={startPush}
            massum={masSum}
            applyCoor={applyCoor}
            returnCoor={returnCoor}
            data={data}
            consoleMessage={consoleMessage}
            onConsoleMessage={onConsoleMessage}
            id_item={id_item}
        ></L_P_Panel>
    )
}

export default Method_2D;
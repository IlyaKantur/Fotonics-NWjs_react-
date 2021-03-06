import loadImg from './loadImg.js';
const fs = window.require('fs');

export default class Processing {

    constructor({ onConsoleMessage, id_f_nameF, chek_obsorv, imgFolder, imgnum, masImg, fon }) {
        // Image
        this.ImgNew = document.getElementById(`ImgNew_${id_f_nameF}`);
        this.ImgSum = document.getElementById(`ImgSum_${id_f_nameF}`);
        this.himg = document.getElementById(`hiddenimg_${id_f_nameF}`);
        this.himgsum = document.getElementById(`hiddenimgsum_${id_f_nameF}`);
        this.ctx = this.ImgNew.getContext("2d");
        this.ctxsum = this.ImgSum.getContext("2d");
        this.ctxh = this.himg.getContext("2d");
        this.ctxhs = this.himgsum.getContext("2d");

        // Checkbox
        this.saveLast = document.getElementById(`SaveLast_${id_f_nameF}`).checked;
        this.iter = document.getElementById(`Iter_${id_f_nameF}`).checked; // Ограничение
        this.bf = document.getElementById(`BF_${id_f_nameF}`).checked; // Без фона
        this.delta = document.getElementById(`Delta_${id_f_nameF}`).checked; // Вычет шума
        this.bpix = document.getElementById(`BPix_${id_f_nameF}`).checked; // Вычет битого
        this.gran = document.getElementById(`Gran_${id_f_nameF}`).checked; // Границы

        // Введеные значения
        this.iterN = document.getElementById(`IterN_${id_f_nameF}`).value; // Ограничение по количеству обработанных снимков
        this.dfon = document.getElementById(`DFon_${id_f_nameF}`).value; // Значение вычитаемого шума
        this.g_Xx = document.getElementById(`Xx_${id_f_nameF}`).value;
        this.g_XX = document.getElementById(`XX_${id_f_nameF}`).value;
        this.g_Yy = document.getElementById(`Yy_${id_f_nameF}`).value;
        this.g_YY = document.getElementById(`YY_${id_f_nameF}`).value

        this.ix = 0;
        this.iy = 0;
        this.cx = 0;
        this.cy = 0;
        this.imgSum = 0;
        this.imgfon = 0;
        this.startOb = 0;
        this.imgsum = new Image();
        this.proces = false;
        this.fon_load = false;
        this.finished = false;

        this.defolt_folred = './Foto/Foto_observ';

        this.massum = [];
        this.masx = [];
        this.oldX = [];
        this.oldY = [];

        //Входные данные
        this.masImg = masImg;
        this.id_f_nameF = id_f_nameF;
        this.fon = fon;
        this.onConsoleMessage = onConsoleMessage;
        this.chek_obsorv = chek_obsorv;
        this.imgnum = imgnum;
        this.imgFolder = imgFolder;
    }

    read_x_y = () => {
        this.ix = this.masImg[0].width;
        this.iy = this.masImg[0].height;
        this.cx = this.ImgNew.width;
        this.cy = this.ImgNew.height;
        // console.log(this.id_f_nameF + ":", this.iterN);
    }

    save_proces = (massum, masx, finished, oldY, imgnum) => {
        this.massum = massum;
        this.masx = masx;
        this.finished = finished;
        this.oldY = oldY;
        this.imgnum = imgnum;
    }

    start = () => {
        return new Promise((resolve, reject) => {
            this.read_x_y();
            this.himg.width = this.ix;
            this.himg.height = this.iy;
            this.himgsum.width = this.ix;
            this.himgsum.height = this.iy;
            this.imgsum = this.masImg[0];
            this.ctxsum.drawImage(this.imgsum, 0, 0, this.cx, this.cy);
            this.ctxhs.drawImage(this.imgsum, 0, 0);
            this.imgSum = this.ctxhs.getImageData(0, 0, this.ix, this.iy);
            if (this.fon.length == undefined) {
                this.fon_load = true
                this.ctxhs.drawImage(this.fon, 0, 0);
                this.imgfon = this.ctxhs.getImageData(0, 0, this.ix, this.iy).data;
            }
            this.startOb = new Date().getTime();
            this.proces = true;
            this.onConsoleMessage('Start')
            this.workOnImg().then(({ massum, masx, finished, oldY, imgnum }) => resolve({ massum, masx, finished, oldY, imgnum }));
        })
    }

    workOnImg = () => {
        return new Promise((resolve, reject) => {
            if (this.imgnum == this.masImg.length && this.chek_obsorv) {
                this.check().then(({ massum, masx, finished, oldY, imgnum }) => {
                    this.save_proces(massum, masx, finished, oldY, imgnum);
                    resolve({ massum, masx, finished, oldY, imgnum })
                });
            } else {
                this.processing().then(({ massum, masx, finished, oldY, imgnum }) => {
                    this.save_proces(massum, masx, finished, oldY, imgnum);
                    resolve({ massum, masx, finished, oldY, imgnum })
                });
            }
        })
    }

    check = () => {
        return new Promise((resolve, reject) => {
            let folder = this.imgFolder || this.defolt_folred;
            loadImg().loadObservation(folder, this.imgnum).then(({masImg}) => {
                if (this.imgnum == masImg.length) {
                    this.check();
                } else {
                    this.masImg = masImg;
                    this.processing().then(({ massum, masx, finished, oldY, imgnum }) => {
                        this.save_proces(massum, masx, finished, oldY, imgnum);
                        resolve({ massum, masx, finished, oldY, imgnum })
                    })
                }
            })
        })
    }

    processing = () => {
        return new Promise((resolve, reject) => {
            let imgg = this.masImg[this.imgnum];
            this.ctx.clearRect(0, 0, this.cx, this.cy);
            this.ctx.drawImage(imgg, 0, 0, this.cx, this.cy);
            this.ctxh.clearRect(0, 0, this.himg.width, this.himg.height);
            this.ctxh.drawImage(imgg, 0, 0);
            let imgData = this.ctxh.getImageData(0, 0, this.ix, this.iy).data;
            let Img = this.ctx.getImageData(0, 0, this.cx, this.cy);
            let Imgsum = this.ctxsum.getImageData(0, 0, this.cx, this.cy);
            let mas0 = [];
            let mas = [];
            let ii = 0;
            for (let i = 0; i < imgData.length; i += 4) {
                mas0[ii] = imgData[i];
                if (!this.bf && this.fon_load && mas0[ii] >= this.imgfon[i]) {
                    mas0[ii] -= this.imgfon[i];
                }
                if (this.delta && mas0[ii] >= this.dfon) {
                    mas0[ii] -= this.dfon;
                }
                ii++;
            }
            if (this.bpix) {
                for (let i = 0; i < mas0.length; i++) {
                    let del = ((mas0[i - 1] + mas0[i + this.iy] + mas0[i + 1]) / 3);
                    if (mas0[i] > del + 40 && del == 0) {
                        // let t = mas0[i];
                        mas0[i] -= mas0[i];
                    } else if (mas0[i] > del + 40 && del > 0) {
                        // let t = mas0[i];
                        mas0[i] -= (mas0[i] - del).toFixed(0);
                        mas0[i];
                    }
                }
            }

            for (let x = 0; x < this.ix; x++) {
                if (this.imgnum == 0) {
                    this.massum[x] = 0;
                }
                mas[x] = 0;
                this.masx[x] = x;
                this.oldX[x] = this.masx[x];
            }

            let yy = 0;
            for (let y = 0; y < this.iy; y++) {
                for (let x = 0; x < this.ix; x++) {
                    mas[x] += mas0[yy];
                    yy += 1;
                }
            }

            for (let x = 0; x < this.ix; x++) {
                this.massum[x] += mas[x];
                this.oldY[x] = this.massum[x];
            }
            ii = 0;
            for (let i = 0; i < imgData.length; i += 4) {
                if (i % 4 == 3) {
                    continue;
                }
                if (this.imgSum.data[i] >= mas0[ii]) {
                    ii++;
                    continue;
                } else {
                    this.imgSum.data[i] += mas0[ii];
                    this.imgSum.data[i + 1] += mas0[ii];
                    this.imgSum.data[i + 2] += mas0[ii];
                    ii++;
                }
            }

            for (let i = 0; i < Img.data.length; i += 4) {
                if (i % 4 == 3) {
                    continue;
                }
                if (Imgsum.data[i] >= Img.data[i]) {
                    ii++;
                    continue;
                } else {
                    Imgsum.data[i] += Img.data[i];
                    Imgsum.data[i + 1] += Img.data[i + 1];
                    Imgsum.data[i + 2] += Img.data[i + 2];
                }
            }

            //вывод в панель

            this.ctxhs.putImageData(this.imgSum, 0, 0);
            this.ctxsum.putImageData(Imgsum, 0, 0);
            // const url = this.himgsum.toDataURL('image/jpg');
            // const base64Data = url.replace(/^data:image\/png;base64,/, "");
            //Созранение фото
            // fs.writeFile(`result/image/${imgnum}.jpg`, base64Data, 'base64', function (err) {
            //     if (err != null) {
            //         console.log(err);
            //     }

            // });

            this.imgnum++;
            console.log(`Обработанано ${this.imgnum} снимков из ${this.masImg.length}`)

            let massum = this.massum;
            let masx = this.masx;
            let finished = this.finished;
            let oldY = this.oldY;
            let imgnum = this.imgnum;

            if ((this.imgnum == this.masImg.length && !this.chek_obsorv) || (this.iter && this.imgnum == this.iterN)) {
                let message = `Обработана за: ${((new Date().getTime() - this.startOb) / 1000).toFixed(3)} секунд`
                console.log(message)
                this.onConsoleMessage(message)

                finished = true;
            }
            resolve({ massum, masx, finished, oldY, imgnum });
        })
    }
}
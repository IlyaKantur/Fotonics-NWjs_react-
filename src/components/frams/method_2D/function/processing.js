import loadImg from './loadImg.js';
const fs = window.require('fs');

export default class Processing {

    constructor({onConsoleMessage, id_f_nameF, chek_obsorv, imgFolder, imgnum, masImg, fon, masInformation_2D}) {
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
        this.saveLast = masInformation_2D.SaveLast;
        this.iter = masInformation_2D.Iter; // Ограничение
        this.intPix = masInformation_2D.IntPix; // Суммировать интенсивность пикселей
        this.bf = masInformation_2D.BF; // Без фона
        this.delta = masInformation_2D.Delta; // Вычет шума
        this.bpix = masInformation_2D.BPix; // Вычет битого
        this.gran = masInformation_2D.Gran; // Границы

        // Введеные значения
        this.nameElement = masInformation_2D.nameElement || 'NoName';

        this.iterN = masInformation_2D.IterN; // Ограничение по количеству обработанных снимков
        this.minInt = masInformation_2D.MinInt; // Порог интенсивности, если < тогда 0 
        this.dfon = masInformation_2D.DFon; // Значение вычитаемого шума
        this.g_Xx = masInformation_2D.Xx;
        this.g_XX = masInformation_2D.XX;
        this.g_Yy = masInformation_2D.Yy;
        this.g_YY = masInformation_2D.YY;

        this.ix = 0;
        this.iy = 0;
        this.cx = 0;
        this.cy = 0;
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
            this.ctxhs.drawImage(this.imgsum, 0, 0, this.ix, this.iy);
            // if (this.fon.length == undefined) {
            //     this.fon_load = true
            //     this.ctxhs.clearRect(0, 0, this.himg.width, this.himg.height);
            //     this.ctxhs.drawImage(this.fon, 0, 0);
            //     this.imgfon = this.ctxhs.getImageData(0, 0, this.ix, this.iy).data;
            //     this.ctxhs.clearRect(0, 0, this.himg.width, this.himg.height);
            //     this.ctxhs.drawImage(this.imgsum, 0, 0);
            // }
            this.startOb = new Date().getTime();
            this.proces = true;
            this.onConsoleMessage('Start')
            this.workOnImg(this.masImg, this.chek_obsorv).then(({massum, masx, finished, oldY, imgnum}) => resolve({massum, masx, finished, oldY, imgnum}));
        })
    }

    workOnImg = (masImg, chek_obsorv) => {
        return new Promise((resolve, reject) => {
            // if (this.imgnum == this.masImg.length && this.chek_obsorv) {
            //     this.check().then(({massum, masx, finished, oldY, imgnum}) => {
            //         this.save_proces(massum, masx, finished, oldY, imgnum);
            //         resolve({massum, masx, finished, oldY, imgnum});
            //     });
            // } else {
                if(chek_obsorv) this.masImg = masImg
                this.processing().then(({massum, masx, finished, oldY, imgnum}) => {
                    this.save_proces(massum, masx, finished, oldY, imgnum);
                    resolve({ massum, masx, finished, oldY, imgnum});
                });
            // }
        })
    }

    // check = () => {
    //     return new Promise((resolve, reject) => {
    //         let folder = this.imgFolder || this.defolt_folred;
    //         loadImg().loadObservation(folder, this.imgnum).then(({masImg}) => {
    //             if (this.imgnum == masImg.length) {
    //                 this.check();
    //             } else {
    //                 this.masImg = masImg;
    //                 this.processing().then(({ massum, masx, finished, oldY, imgnum}) => {
    //                     this.save_proces(massum, masx, finished, oldY, imgnum);
    //                     resolve({ massum, masx, finished, oldY, imgnum})
    //                 })
    //             }
    //         })
    //     })
    // }

    processing = () => {
        return new Promise((resolve, reject) => {
            let imgg = this.masImg[this.imgnum];
            this.ctx.clearRect(0, 0, this.cx, this.cy);
            this.ctx.drawImage(imgg, 0, 0, this.cx, this.cy);
            this.ctxh.clearRect(0, 0, this.himg.width, this.himg.height);
            this.ctxh.drawImage(imgg, 0, 0, this.ix, this.iy);
            let imgData = this.ctxh.getImageData(0, 0, this.ix, this.iy).data;
            let Img = this.ctx.getImageData(0, 0, this.cx, this.cy);
            let Imgsum = this.ctxsum.getImageData(0, 0, this.cx, this.cy);
            let imgSum = this.ctxhs.getImageData(0, 0, this.ix, this.iy);
            let mas0 = [];
            let mas = [];
            let ii = 0;
            let xbeg, xfin, ybeg, yfin;
            for (let i = 0; i < imgData.length; i += 4) {
                if (this.intPix) {
                    mas0[ii] = imgData[i];
                    if (!this.bf && this.fon_load && mas0[ii] >= this.imgfon[i]) {
                        mas0[ii] -= this.imgfon[i];
                    }
                    if (this.delta && mas0[ii] >= this.dfon) {
                        mas0[ii] -= this.dfon;
                    }
                }
                else{
                    if(imgData[i] >= this.minInt) {
                        mas0[ii] = 1
                    }
                    else{
                        mas0[ii] = 0;
                    }
                }
                ii++;
            }
            let yy = 0;
            if (this.gran) {
                xbeg = +this.g_Xx;
                xfin = +this.g_XX;
                ybeg = +this.g_Yy;
                yfin = +this.g_YY;
                yy = (ybeg - 1) * this.ix + xbeg;
            } else {
                xbeg = 0;
                xfin = this.ix;
                ybeg = 0;
                yfin = this.iy
            }
            if (this.bpix) {
                // Есть вопрос к этой части
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

            for (let x = xbeg; x < xfin; x++) {
                if (this.imgnum == 0) {
                    this.massum[x] = 0;
                }
                mas[x] = 0;
                this.masx[x] = x;
                this.oldX[x] = this.masx[x];
            }
            for (let y = ybeg; y < yfin; y++) {
                for (let x = xbeg; x < xfin; x++) {
                    mas[x] += mas0[yy];
                    yy += 1;
                }
                if (this.gran) {
                    yy += (this.ix - xfin) + xbeg
                }
            }

            for (let x = xbeg; x < xfin; x++) {
                this.massum[x] += mas[x];
                this.oldY[x] = this.massum[x];
            }

            for (let i = 0; i < imgData.length; i += 4) {
                if (i % 4 == 3) {
                    continue;
                }
                if (imgSum.data[i] >= imgData[i]) {
                    continue;
                } else {
                    imgSum.data[i] += imgData[i];
                    imgSum.data[i + 1] += imgData[i + 1];
                    imgSum.data[i + 2] += imgData[i + 2];
                }
            }


            for (let i = 0; i < Img.data.length; i += 4) {
                if (i % 4 == 3) {
                    continue;
                }
                if (Imgsum.data[i] >= Img.data[i]) {
                    continue;
                } else {
                    Imgsum.data[i] += Img.data[i];
                    Imgsum.data[i + 1] += Img.data[i + 1];
                    Imgsum.data[i + 2] += Img.data[i + 2];
                }
            }

            //вывод в панель

            

            this.ctxhs.putImageData(imgSum, 0, 0);
            this.ctxsum.putImageData(Imgsum, 0, 0);

            // Созранение фото
            
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

                const url = this.himgsum.toDataURL('image/jpg');
                const base64Data = url.replace(/^data:image\/png;base64,/, "");

                const date = new Date();
                const dataProtocol = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
                const timeProtocol = `${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`
                
                const path_write_image = `result/image/${this.nameElement}`
                fs.mkdir(path_write_image, (err) =>{
                    if (err != null) {console.log(err)};
                    fs.mkdir(`${path_write_image}/${dataProtocol}/`, (err) =>{
                        if (err != null) { console.log(err)};
                        fs.writeFile(`${path_write_image}/${dataProtocol}/${this.nameElement}_${timeProtocol}_${this.imgnum}.jpg`, base64Data, 'base64', function (err) {
                            if (err != null) {
                                console.log(err);
                            }
                        });
                    })
                })
                
                // if(fs.existsSync(path_write_image)) path_write_image = `result/image/${this.imgnum}_cope.jpg`
                

                finished = true;
            }
            resolve({
                massum,
                masx,
                finished,
                oldY,
                imgnum,
            });
        })
    }
}
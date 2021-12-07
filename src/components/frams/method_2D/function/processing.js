import loadImg from './loadImg.js';
const fs = window.require('fs');

export default class Processing {

    constructor({onConsoleMessage, id_f_nameF, chek_obsorv, imgFolder, imgnum, masImg, fon, masInformation_2D}) {
        // Image
        this.ImgNew = document.getElementById(`ImgNew_${id_f_nameF}`);
        this.ImgSum = document.getElementById(`ImgSum_${id_f_nameF}`);
        this.himg = document.getElementById(`hiddenimg_${id_f_nameF}`);
        this.himgsum = document.getElementById(`hiddenimgsum_${id_f_nameF}`);
        this.himgClear = document.getElementById(`hiddenimgClear_${id_f_nameF}`)
        this.ctx = this.ImgNew.getContext("2d");
        this.ctxsum = this.ImgSum.getContext("2d");
        this.ctxh = this.himg.getContext("2d");
        this.ctxhs = this.himgsum.getContext("2d");
        this.ctxhc = this.himgClear.getContext("2d");

        // Checkbox
        this.double_processing = masInformation_2D.double_processing
        this.saveLast = masInformation_2D.SaveLast;
        this.iter = masInformation_2D.Iter; // Ограничение
        this.intPix = masInformation_2D.IntPix; // Суммировать интенсивность пикселей
        this.bf = masInformation_2D.BF; // Без фона
        this.delta = masInformation_2D.Delta; // Вычет шума
        this.bpix = masInformation_2D.BPix; // Вычет битого
        this.gain1 = masInformation_2D.gain1; // усиление. метод 1
        this.gran = masInformation_2D.Gran; // Границы

        // Введеные значения
        this.nameElement = masInformation_2D.nameElement || 'NoName';

        this.iterN = masInformation_2D.IterN; // Ограничение по количеству обработанных снимков

        this.minInt = masInformation_2D.MinInt; // Порог интенсивности, если < тогда 0 

        this.dfonfrom = masInformation_2D.DFonFrom; // Значение вычитаемого шума
        this.dfonto = masInformation_2D.DFonTo;

        this.dbpix = masInformation_2D.DBPix; // Параметр вычет битого

        this.k_gain1 = masInformation_2D.k_gain1; // Коэффициент усиление. метод 1
        this.minInt_gain1 = masInformation_2D.minInt_gain1; // Порог интенсивнотси, выше которого усиление. метод 1

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

        //Test
        this.TimeSum = 0; 
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
            this.himgClear.width = this.ix;
            this.himgClear.height = this.iy;
            this.imgsum = this.masImg[0];

            if (this.fon.length == undefined) {
                this.fon_load = true
                this.ctxhs.clearRect(0, 0, this.himg.width, this.himg.height);
                this.ctxhs.drawImage(this.fon, 0, 0);
                this.imgfon = this.ctxhs.getImageData(0, 0, this.ix, this.iy).data;
                this.ctxhs.clearRect(0, 0, this.himg.width, this.himg.height);
            }

            this.ctxsum.drawImage(this.imgsum, 0, 0, this.cx, this.cy);
            this.ctxhs.drawImage(this.imgsum, 0, 0, this.ix, this.iy);
            
            this.startOb = performance.now();
            this.proces = true;
            this.onConsoleMessage('Начало обработки')
            this.workOnImg(this.masImg, this.chek_obsorv).then(({massum, masx, finished, oldY, imgnum}) => resolve({massum, masx, finished, oldY, imgnum}));
        })
    }

    workOnImg = (masImg, chek_obsorv) => {
        return new Promise((resolve, reject) => {
            if(chek_obsorv) this.masImg = masImg
            this.processing().then(({massum, masx, finished, oldY, imgnum}) => {
                this.save_proces(massum, masx, finished, oldY, imgnum);
                resolve({ massum, masx, finished, oldY, imgnum});
            });
        })
    }

    processing = () => {
        return new Promise((resolve, reject) => {

            if(this.imgnum == 0) console.log(`Начало  ${performance.now() - this.startOb}`)

            let imgg = this.masImg[this.imgnum];
            this.ctx.clearRect(0, 0, this.cx, this.cy);
            this.ctx.drawImage(imgg, 0, 0, this.cx, this.cy);
            this.ctxh.clearRect(0, 0, this.himg.width, this.himg.height);
            this.ctxh.drawImage(imgg, 0, 0, this.ix, this.iy);
            let ImgDataH = this.ctxh.getImageData(0, 0, this.ix, this.iy).data;
            let Img = this.ctx.getImageData(0, 0, this.cx, this.cy);
            let ImgSum = this.ctxsum.getImageData(0, 0, this.cx, this.cy);
            let ImgSumH = this.ctxhs.getImageData(0, 0, this.ix, this.iy);
            let ImgClear = this.ctxhc.getImageData(0, 0, this.ix, this.iy);
            let mas0 = [];
            let mas = [];
            let masfon = [];
            let ii = 0;
            let yy = 0;
            let xbeg, xfin, ybeg, yfin;

            let ibeg = 0;
            let ifin = this.ix * this.iy;
            if (this.gran) {
                xbeg = +this.g_Xx;
                xfin = +this.g_XX;
                ybeg = +this.g_Yy;
                yfin = +this.g_YY;
                yy = ybeg * this.ix + xbeg;

                ibeg = ybeg * this.ix + xbeg;
                ifin = yfin * this.ix + xfin;


            } else {
                xbeg = 0;
                xfin = this.ix;
                ybeg = 0;
                yfin = this.iy
            }

            let s = performance.now();
            let start = performance.now();

            if(!this.double_processing)
            {
                
                //Перевод снимка
                for (let i = 0; i < ImgDataH.length; i += 4) {
                    if (this.intPix) {
                        mas0[ii] = ImgDataH[i];
                        if(this.fon_load) masfon[ii] = this.imgfon[i]
                    }
                    else
                    {
                        if(ImgDataH[i] >= this.minInt) {
                            mas0[ii] = 1
                        }
                        else{
                            mas0[ii] = 0;
                        }
                    }
                    ii++;
                }

                console.log(`Перевод снимка ${performance.now() - start}`)
                start = performance.now();

                // фильтрация

                if ((!this.bf &&(this.fon_load || this.delta || this.bpix )) || this.gain1) {  

                    ii = xbeg;
                    for(let i = ibeg; i < ifin; i++){

                        //вычитание фонового изображения
                        if(this.fon_load)
                        {
                            if(mas0[i] > masfon[i] && mas0[i - 1] < masfon[i] && mas0[i + 1] < masfon[i]) mas0[i] = 0
                            else mas0[i] -= masfon[i];
                        }
                        //очистка от артифактов
                        if (this.bpix) {
                            let del = +((( (mas0[i - 1] == undefined ? 0 : mas0[i - 1])  + (mas0[i + this.ix] == undefined ? 0 : mas0[i + this.ix])
                                      + (mas0[i + 1] == undefined ? 0 : mas0[i + 1]) + (mas0[i - this.ix] == undefined ? 0 : mas0[i - this.ix]) ) / 4).toFixed(0));
                            
                            if (mas0[i] > del + this.dbpix) {
                                mas0[i] = del + this.dbpix;
                            }
                        }
                        //уменьшение на заданое число
                        if (this.delta && mas0[i] >= this.dfonfrom && mas0[i] <= this.dfonto) {
                            mas0[i] = 0;
                        }

                        //усиление. метод 1
                        if(this.gain1 && mas0[i] >= this.minInt_gain1){
                            mas0[i] = +((mas0[i] * (1 + (+this.k_gain1/100))).toFixed(0))
                        }

                        if(mas0[i] < 0) mas0[i] = 0;
                        if(mas0[i] > 255) mas0[i] = 255;

                        if (this.gran && ii++ == xfin) {
                            i += (this.ix - xfin) + xbeg - 1; ii = xbeg;
                        }
                    }              
                }

                console.log(`Фильтрация ${performance.now() - start}`)
                start = performance.now();

                //Суммирование

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

                // Запись для графика
                for (let x = xbeg; x < xfin; x++) {
                    this.massum[x] += mas[x];
                    this.oldY[x] = this.massum[x];
                }

                console.log(`Границы ${performance.now() - start}`)
                start = performance.now();
            }

            //суммарное фото

            for (let i = 0; i < Img.data.length; i += 4) {
                if (i % 4 == 3) {
                    continue;
                }
                if (ImgSum.data[i] >= Img.data[i]) {
                    continue;
                } else {
                    ImgSum.data[i] += Img.data[i];
                    ImgSum.data[i + 1] += Img.data[i + 1];
                    ImgSum.data[i + 2] += Img.data[i + 2];
                }
            }

            console.log(`Суммарное 1 ${performance.now() - start}`)
            start = performance.now();

            if(this.imgnum == 0){
                ImgClear.data.map(item => item = 0)
            }

            for (let i = 0; i < ImgDataH.length; i += 4) {
                if (i % 4 == 3) {
                    continue;
                }
                if (ImgSumH.data[i] >= ImgDataH[i]) {
                    continue;
                } else {
                    ImgSumH.data[i] += ImgDataH[i];
                    ImgSumH.data[i + 1] += ImgDataH[i + 1];
                    ImgSumH.data[i + 2] += ImgDataH[i + 2];
                }
                if(ImgClear.data[i] >= mas0[ii]){
                    continue;
                } else{
                    ImgClear.data[i] += mas0[ii];
                    ImgClear.data[i + 1] += mas0[ii];
                    ImgClear.data[i + 2] += mas0[ii];
                    ImgClear.data[i + 3] = 255;
                }
            }

            console.log(`Суммарное 2 ${performance.now() - start}`)
            start = performance.now();

            // очишенное изображение
            // ii = 0;
            // yy = xbeg;
            // if(this.imgnum == 0){
            //     ImgClear.data.map(item => item = 0)
            // }

            // for (let i = 0; i < ImgClear.data.length; i += 4) {
            //     if (i % 4 == 3) {
            //         continue;
            //     }
            //     if (ImgClear.data[i] > mas0[ii]) {
            //         ii++
            //         ImgClear.data[i + 3] = 255
            //         continue;
            //     } else {
            //         // if (this.gran && (ii >= ibeg && ii <= ifin && (yy == xbeg || yy == xfin || (ii > ibeg && ii < ibeg + (xfin - xbeg)) || (ii > ifin - (xfin - xbeg) && ii < ifin)) )) {
            //         //     // || (ii > ibeg && ii < ibeg + (xfin - xbeg)) || (ii > ifin - (xfin - xbeg) && ii < ifin))
            //         //     ImgClear.data[i] = 255;
            //         //     ImgClear.data[i + 1] = 0;
            //         //     ImgClear.data[i + 2] = 0;
            //         //     ImgClear.data[i + 3] = 255;
        
            //         //     yy++
            //         //     ii++;
            //         // }
            //         // else{
            //             ImgClear.data[i] += mas0[ii];
            //             ImgClear.data[i + 1] += mas0[ii];
            //             ImgClear.data[i + 2] += mas0[ii];
            //             ImgClear.data[i + 3] = 255;
            //             // if(ii > ibeg) yy++
            //             ii++
            //         // }
            //         // if(yy == this.ix) yy = 0   
            //     }
                
            // }
            // console.log(`Суммарное 3 ${performance.now() - start}`)
            

            //вывод в панель

            
            this.ctxhc.putImageData(ImgClear, 0, 0);
            this.ctxhs.putImageData(ImgSumH, 0, 0);
            this.ctxsum.putImageData(ImgSum, 0, 0);

            // Созданение фото
            
            this.imgnum++;
            let message = `Обработанано ${this.imgnum} снимков из ${this.masImg.length}`
            if(this.imgnum == 1) this.onConsoleMessage(message, false)
            else this.onConsoleMessage(message, true)

            this.TimeSum += performance.now() - s
            console.log(`КОНЕЦ ФОТО: ${this.TimeSum}`)
            
            console.log(message)

            let massum = this.massum;
            let masx = this.masx;
            let finished = this.finished;
            let oldY = this.oldY;
            let imgnum = this.imgnum;

            

            if ((this.imgnum == this.masImg.length && !this.chek_obsorv) || (this.iter && this.imgnum == this.iterN)) {

                start = performance.now();

                let message = `Обработана за: ${((performance.now() - this.startOb) / 1000).toFixed(3)} секунд`
                console.log(message)
                this.onConsoleMessage(message, false)

                const url = this.himgsum.toDataURL('image/jpg');
                const base64Data = url.replace(/^data:image\/png;base64,/, "");

                const urlClearImg = this.himgClear.toDataURL('image/jpg');
                const base64DataClearImg = urlClearImg.replace(/^data:image\/png;base64,/, "");

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

                        fs.writeFile(`${path_write_image}/${dataProtocol}/${this.nameElement}_${timeProtocol}_${this.imgnum}_clear.jpg`, base64DataClearImg, 'base64', function (err) {
                            if (err != null) {
                                console.log(err);
                            }
                        });
                    })
                })
                
                console.log(`Сохранения фото ${performance.now() - start}`)

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
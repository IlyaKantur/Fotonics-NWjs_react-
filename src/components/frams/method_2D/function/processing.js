import loadImg from './loadImg.js';
function Processing({onConsoleMessage, id_f_nameF, chek_obsorv, imgFolder, imgnum, masImg, fon}){

    // Image
    const ImgNew = document.getElementById(`ImgNew_${id_f_nameF}`);
    const ImgSum = document.getElementById(`ImgSum_${id_f_nameF}`);
    const himg = document.getElementById(`hiddenimg_${id_f_nameF}`);
    const himgsum = document.getElementById(`hiddenimgsum_${id_f_nameF}`);
    const ctx = ImgNew.getContext("2d");
    const ctxsum = ImgSum.getContext("2d");
    const ctxh = himg.getContext("2d");
    const ctxhs = himgsum.getContext("2d");

    // Checkbox
    const saveLast = document.getElementById(`SaveLast_${id_f_nameF}`).checked;
    const iter = document.getElementById(`Iter_${id_f_nameF}`).checked; // Ограничение
    const bf = document.getElementById(`BF_${id_f_nameF}`).checked; // Без фона
    const delta = document.getElementById(`Delta_${id_f_nameF}`).checked; // Вычет шума
    const bpix = document.getElementById(`BPix_${id_f_nameF}`).checked; // Вычет битого
    const gran = document.getElementById(`Gran_${id_f_nameF}`).checked; // Границы


    // Введеные значения
    const iterN = document.getElementById(`IterN_${id_f_nameF}`).value; // Ограничение по количеству обработанных снимков
    const dfon = document.getElementById(`DFon_${id_f_nameF}`).value; // Значение вычитаемого шума
    const g_Xx = document.getElementById(`Xx_${id_f_nameF}`).value;
    const g_XX = document.getElementById(`XX_${id_f_nameF}`).value;
    const g_Yy = document.getElementById(`Yy_${id_f_nameF}`).value;
    const g_YY = document.getElementById(`YY_${id_f_nameF}`).value;

    // Переменные
    let iy, ix, cx ,cy, imgSum, imgfon, startOb;
    let imgsum = new Image();
    let pfon = 0;
    let proces = false;
    let fon_load = false;
    let finished = false;

    let defolt_folred = './Foto/Foto_observ'

    let massum = [],
        masx = [];
    let oldX = [],
        oldY = [];

    function read_x_y(){
        iy = masImg[0].height;
        ix = masImg[0].width;
        cx = ImgNew.width;
        cy = ImgNew.height;
    }

    function start(){
        return new Promise((resolve, reject) => {
            read_x_y();
            himg.height = iy;
            himg.width = ix;
            himgsum.height = iy;
            himgsum.width = ix;
            imgsum = masImg[0];
            ctxsum.drawImage(imgsum, 0, 0, cx, cy);
            ctxhs.drawImage(imgsum, 0, 0);
            imgSum = ctxhs.getImageData(0, 0, ix, iy);
            if (fon.length == undefined){
                fon_load = true
                ctxhs.drawImage(fon, 0, 0);
                imgfon = ctxhs.getImageData(0, 0, ix, iy).data;
            }
            startOb = new Date().getTime();
            proces = true;
            onConsoleMessage('Start')
            workOnImg().then(() => resolve({massum, masx, finished, oldY, imgnum}));
        })
    }

    function workOnImg(){
        return new Promise((resolve, reject) =>
        {
            if (imgnum == masImg.length && chek_obsorv) {
                check();
    
                function check() {
                    let folder = imgFolder || defolt_folred;
                    loadImg.loadObservation(folder, imgnum).then(() => {
                        if (imgnum == masImg.length) {
                            check()
                        } else {
                            processing().then(({massum, masx, finished, oldY, imgnum}) => { resolve({massum, masx, finished, oldY, imgnum})})
                        }
                    })
                }
            } else {
                processing().then(({massum, masx, finished, oldY, imgnum}) => { resolve({massum, masx, finished, oldY, imgnum})});
            }
    
            function processing(){
                read_x_y();
                let imgg = masImg[imgnum];
                ctx.clearRect(0, 0, cx, cy); 
                ctx.drawImage(imgg, 0, 0, cx, cy);
                ctxh.clearRect(0, 0, himg.width, himg.height);
                ctxh.drawImage(imgg, 0, 0);
                let imgData = ctxh.getImageData(0, 0, ix, iy).data;
                let Img = ctx.getImageData(0, 0, cx, cy);
                let Imgsum = ctxsum.getImageData(0, 0, cx, cy);
                let mas0 = [];
                let mas = [];
                let ii = 0;
                for (let i = 0; i < imgData.length; i += 4) {
                    mas0[ii] = imgData[i];
                    if (!bf && fon_load && mas0[ii] >= imgfon[i]) {
                        mas0[ii] -= imgfon[i];
                    }
                    if (delta && mas0[ii] >= dfon) {
                        mas0[ii] -= dfon;
                    }
                    ii++;
                }
                if (bpix) {
                    for (let i = 0; i < mas0.length; i++) {
                        let del = ((mas0[i - 1] + mas0[i + iy] + mas0[i + 1]) / 3);
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
        
                for (let x = 0; x < ix; x++) {
                    if (imgnum == 0) {
                        massum[x] = 0;
                    }
                    mas[x] = 0;
                    masx[x] = x;
                    oldX[x] = masx[x];
                }
        
                let yy = 0;
                for (let y = 0; y < iy; y++) {
                    for (let x = 0; x < ix; x++) {
                        mas[x] += mas0[yy];
                        yy += 1;
                    }
                }
        
                for (let x = 0; x < ix; x++) {
                    massum[x] += mas[x];
                    oldY[x] = massum[x];
                }
                ii = 0;
                for (let i = 0; i < imgData.length; i += 4) {
                    if (i % 4 == 3) {
                        continue;
                    }
                    if (imgSum.data[i] >= mas0[ii]) {
                        ii++;
                        continue;
                    } else {
                        imgSum.data[i] += mas0[ii];
                        imgSum.data[i + 1] += mas0[ii];
                        imgSum.data[i + 2] += mas0[ii];
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
        
                ctxhs.putImageData(imgSum, 0, 0);
                ctxsum.putImageData(Imgsum, 0, 0);
                const url = himgsum.toDataURL('image/jpg');
                const base64Data = url.replace(/^data:image\/png;base64,/, "");
                //Созранение фото
                // fs.writeFile(`result/image/${imgnum}.jpg`, base64Data, 'base64', function (err) {
                //     if (err != null) {
                //         console.log(err);
                //     }
        
                // });
                // coordinat.updateChart(masx, massum)
                imgnum++;
                console.log(`Обработанано ${imgnum} снимков из ${masImg.length}`)
    
    
    
                if ((imgnum == masImg.length && !chek_obsorv) || (iter && imgnum == iterN)) {
                    let message = `Обработана за: ${((new Date().getTime() - startOb) / 1000).toFixed(3)} секунд`
                    console.log(message)
                    onConsoleMessage(message)
                    // log(message);
                    processing = false;
    
    
                    // for (let i = 0; i < ix; i++) {
                    //     coordinat.write(masx[i], massum[i])
                    // }
    
                    finished = true;
                    resolve({massum, masx, finished, oldY, imgnum});
                }
                resolve({massum, masx, finished, oldY, imgnum});
            }
        })
    }

    
    return Object({
        start,
        workOnImg
    })
}

export default Processing;
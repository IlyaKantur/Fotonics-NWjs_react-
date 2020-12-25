import Chart from 'chartjs';
import loadImg from './loadImg.js';
function Processing(){

    const chek_obsorv = document.getElementById("chek_obsorv");

    let ImgNew = document.getElementById("ImgNew");
    let ImgSum = document.getElementById("ImgSum");
    let himg = document.getElementById("hiddenimg");
    let himgsum = document.getElementById("hiddenimgsum");
    let ctx = ImgNew.getContext("2d");
    let ctxsum = ImgSum.getContext("2d");
    let ctxh = himg.getContext("2d");
    let ctxhs = himgsum.getContext("2d");
    let iy;
    let ix;
    let cx;
    let cy;
    let imgnum;
    let imgSum;
    let imgfon;
    let startOb;
    let masImg = [];
    let imgsum = new Image();
    let imgFon = new Image();
    let dfon = DFon.value;
    let pfon = 0;
    let proces = false;
    let finished;

    let massum = [],
        masx = [];
    let oldX = [],
        oldY = [];

    function start({mas, fon, num, finish}){
        return new Promise((resolve, reject) => {
            masImg = mas;
            imgFon = fon;
            imgnum = num;
            finished = finish;
            iy = masImg[0].height;
            ix = masImg[0].width;
            cx = ImgNew.width;
            cy = ImgNew.height;
            himg.height = iy;
            himg.width = ix;
            himgsum.height = iy;
            himgsum.width = ix;
            imgsum = masImg[0];
            ctxsum.drawImage(imgsum, 0, 0, cx, cy);
            ctxhs.drawImage(imgsum, 0, 0);
            imgSum = ctxhs.getImageData(0, 0, ix, iy);
            if (pfon == 1) {
                ctxhs.drawImage(imgFon, 0, 0);
                imgfon = ctxhs.getImageData(0, 0, ix, iy).data;
            }
            startOb = new Date().getTime();
            proces = true;
            workOnImg(resolve);

        })
    }

    function workOnImg(resolve){
        if (imgnum == masImg.length && chek_obsorv.checked) {
            check();

            function check() {
                let folder = imgFolder || defolt_folred
                loadImg.loadObservation(folder, imgnum).then(() => {
                    if (imgnum == masImg.length) {
                        check()
                    } else {
                        processing(resolve)
                    }
                })
            }
        } else {
            processing(resolve);
        }

        function processing(resolve){
            let img = masImg[imgnum];
            ctx.drawImage(img, 0, 0, cx, cy);
            ctxh.drawImage(img, 0, 0);
            let imgData = ctxh.getImageData(0, 0, ix, iy).data;
            let Img = ctx.getImageData(0, 0, cx, cy);
            let Imgsum = ctxsum.getImageData(0, 0, cx, cy);
            let mas0 = [];
            let mas = [];
            let ii = 0;
            for (let i = 0; i < imgData.length; i += 4) {
                mas0[ii] = imgData[i];
                if (pfon == 1 && mas0[ii] >= imgfon[i]) {
                    mas0[ii] -= imgfon[i];
                }
                if (Delta.checked && mas0[ii] >= dfon) {
                    mas0[ii] -= dfon;
                }
                ii++;
            }
            if (BPix.checked) {
                for (let i = 0; i < mas0.length; i++) {
                    let del = ((mas0[i - 1] + mas0[i + iy] + mas0[i + 1]) / 3);
                    if (mas0[i] > del + 40 && del == 0) {
                        let t = mas0[i];
                        mas0[i] -= mas0[i];
                    } else if (mas0[i] > del + 40 && del > 0) {
                        let t = mas0[i];
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
            let req = requestAnimationFrame(workOnImg);
            // coordinat.updateChart(masx, massum)
            imgnum++;
            // log(`Обработанано ${imgnum} снимков из ${masImg.length}`)


            // if (imgnum == masImg.length) {
            //     cp.innerHTML = '';
            //     for (let i = 0; i < ix; i++) {
            //         coordinat.write(masx[i], massum[i])
            //     }
            // }


            if (imgnum == masImg.length && !chek_obsorv.checked) {
                let message = `Обработана за: ${((new Date().getTime() - startOb) / 1000).toFixed(3)} секунд`
                console.log(message)
                // log(message);
                processing = false;


                // for (let i = 0; i < ix; i++) {
                //     coordinat.write(masx[i], massum[i])
                // }

                finished = true;
                cancelAnimationFrame(req);
                resolve(massum);
            }
        }
    }

    
    return Object({
        start,
    })
}

export default Processing;
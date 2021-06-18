function LoadImg() {
    const fs = window.require('fs');
    let masImg = [];
    let imgFolder;
    let imgFon = new Image;
    let defolt_folred = './Foto';

    function loadFoldImg() {
        return new Promise((resolve, reject) => {
            console.log('Click Fold');
            let i = document.createElement('input')

            i.type = 'file'
            i.multiple = true;
            i.accept = 'image/*'

            i.click()

            i.onchange = function () {
                let masFold = [];
                for (let j = 0; j < i.files.length; j++) {
                    masFold[j] = i.files[j].path
                    imgFolder = i.files[j].path.replace(i.files[j].name, '')
                }
                let dataStart = new Date().getTime();
                loadImg(masFold, 0).then(({ dataStop, masImg}) => {
                    let message = `Изображений загруженно: ${i.files.length} за ${(dataStop - dataStart) / 1000} секунд`
                    console.log(message);
                    resolve({masImg, imgFolder});
                });
            }
        })
    }

    function loadFolder(checked) {
        return new Promise((resolve, reject) => {
            let i = document.createElement('input');

            i.type = 'file';
            i.nwdirectory = "directory";

            i.click();
            i.onchange = function () {
                imgFolder = this.value;
                imgFolder = `${imgFolder}`;
                if (checked) {
                    resolve(imgFolder);
                } else {
                    loadFolderImg(imgFolder).then(({masImg}) => resolve({masImg, imgFolder}));
                }

            }
        })
    }

    function loadFolderImg(imgFolder) {
        return new Promise((resolve, reject) => {
            fs.readdir(imgFolder, (err, masFold) => {
                if (err) {
                    console.error(err);
                    return
                }
                load(imgFolder, masFold, 0).then((masImg) => resolve(masImg, imgFolder));
            })
        })
    }

    function loadObservation(imgFolder, iter) {
        return new Promise((resolve, reject) => {
            observation(imgFolder, iter).then((masImg) => { resolve(masImg) });
        });
    }

    function observation(imgFolder, iter) {
        return new Promise((resolve, reject) => {
            let length_old = iter, obs_interval;

            obs_interval = setInterval( () => obs(), 10);
            function obs(){
                fs.readdir(imgFolder, (err, masFold) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    if (masFold.length > length_old)
                    {
                        clearInterval(obs_interval);
                        length_old = masFold.length;
                        load(imgFolder, masFold, iter).then((masImg) => resolve(masImg));
                    }
                })
            }
        })
    }

    function load(imgFolder, masFold, iter) {
        return new Promise((resolve, reject) => {
            masFold.sort(function (a, b) {
                return a.length - b.length;
            });
            if (imgFolder[0] == '.') imgFolder = `.${imgFolder}`;
            masFold = masFold.map(element => {
                return element = `${imgFolder}/${element}`
            })
            let dataStart = new Date().getTime();
            loadImg(masFold, iter).then(({ dataStop, masImg}) => {
                let message = `Изображений загруженно: ${masImg.length} за ${(dataStop - dataStart) / 1000} секунд`
                console.log(message);
                resolve({masImg});
            });
        });
    }

    function loadImg(masFold, iter) {
        return new Promise((resolve, reject) => {
            for (let i = iter; i < masFold.length; i++) {
                masImg[i] = new Image();
                masImg[i].src = masFold[i];
                masImg[i].addEventListener('onerror', reject = () => {
                    let message = 'Ошибка загрузки изображения'
                    console.log(message);
                })
            }
            let dataStop = new Date().getTime();
            
            masImg[masImg.length - 1].onload = () => { 
                resolve({ dataStop, masImg}) 
            };
        })
    }

    function loadFonImg() {
        return new Promise((resolve, reject) => {
            console.log('Click Fon')
            // pfon = 1;
            //
            let i = document.createElement('input')

            i.type = 'file'
            i.accept = 'image/*'
            i.click()
            i.onchange = function () {
                imgFon.src = i.files[0].path;
                imgFon.onload = function () {
                    let message = `Фон загружен`
                    console.log(message);
                    resolve(imgFon);
                };
                imgFon.onerror = function () {
                    let message = 'Ошибка загрузки фона';
                    console.log(message);
                };
            }
        })
    }
    return Object({
        loadFoldImg,
        loadFonImg,
        loadFolder,
        loadFolderImg,
        loadObservation,
        masImg,
        imgFon
    })

}

export default LoadImg;
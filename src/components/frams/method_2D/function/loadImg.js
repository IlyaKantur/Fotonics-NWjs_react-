function LoadImg() {
    const fs = window.require('fs');
    let masImg = [];
    let imgFolder;
    let imgFon = new Image;
    let defolt_folred = './Foto';

    function loadFoldImg() {
        console.log('Click Fold');
        // finished = false;
        let i = document.createElement('input')

        i.type = 'file'
        i.multiple = true;
        i.accept = 'image/*'

        i.click()

        i.onchange = function () {
            let masFold = [];
            for (let j = 0; j < i.files.length; j++) {
                masFold[j] = i.files[j].path
            }
            let dataStart = new Date().getTime();
            loadImg(masFold).then((dataStop) => {
                let message = `Изображений загруженно: ${i.files.length} за ${(dataStop - dataStart)/1000} секунд`
                console.log(message);
                Log.log(message);
            });
        }
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
                    loadFolderImg(imgFolder);
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
                load(imgFolder, masFold, 0).then(() => resolve());
            })
        })
    }

    function loadObservation(imgFolder, iter) {
        return new Promise((resolve, reject) => {
            observation(imgFolder, iter).then(() => {
                resolve()
            });
        });
    }

    function observation(imgFolder, iter) {
        let length_old = iter, length_new;
        return new Promise((resolve, reject) => {
            obs();
            function obs() {
                fs.readdir(imgFolder, (err, masFold) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    length_new = masFold.length
                    if (length_new == length_old) obs();
                    else {
                        length_old = length_new;
                        load(imgFolder, masFold, iter).then(() => resolve());
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
            loadImg(masFold, iter).then((dataStop) => {
                let message = `Изображений загруженно: ${masFold.length} за ${(dataStop - dataStart)/1000} секунд`
                console.log(message);
                // Log.log(message);
                resolve();
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

            masImg[masFold.length - 1].onload = () => {resolve(new Date().getTime())};
        })
    }

    function loadFonImg() {
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
                Log.log(message);
            };
            imgFon.onerror = function () {
                let message = 'Ошибка загрузки фона';
                console.log(message);
                Log.log(message);
            };
        }
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
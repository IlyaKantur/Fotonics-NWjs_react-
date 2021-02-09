import loadImg from './loadImg.js';

export default class Processing {

    constructor(masImg, id_f_nameF) {
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
    }

    read_x_y = () => {
        this.ix = this.masImg[0].width;
        this.iy = this.masImg[0].height;
        this.cx = this.ImgNew.width;
        this.cy = this.ImgNew.height;
    }

}
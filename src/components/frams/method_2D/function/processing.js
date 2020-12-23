function Processing(){
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
    let processing = false;
}

export default Processing;
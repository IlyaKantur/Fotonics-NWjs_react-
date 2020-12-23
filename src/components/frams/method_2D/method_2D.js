import React, { Component } from 'react';
import L_P_Panel from './parts/l_p_panel.js';
import loadImg from './function/loadImg.js';

import './method_2D.css';

export default class Method_2D extends Component {

    constructor(){
        super();
        this.defolt_folder_base = './Foto/Foto_base';
        this.defolt_folder_observ = './Foto/Foto_observ';
        this.lI = new loadImg;
    }

    state = {
        imgFolder: null,
        masImg: [],
        imgFon: null,
        finished: false,
        massum: [],
        masx: [],
        oldX: [],
        oldY: [],
        imgnum: 0,
        iy: 0,
        ix: 0,
        cx: 0,
        cy: 0
    }

    loadFolder = () => {
        const chek_obsorv = document.getElementById("chek_obsorv");
        loadImg().loadFolder(chek_obsorv.checked).then((folder) => {
            this.setState({imgFolder: folder})
        });
    }

    loadFoldImg = () => {
        loadImg().loadFoldImg().then((mas) =>{
            this.setState({masImg: mas})
        })
    }

    loadFonImg = () => {
        loadImg().loadFonImg().then((fon) =>{
            this.setState({imgFon: fon})
        })
    }

    startPush = () => {
        const chek_obsorv = document.getElementById("chek_obsorv");
        const {imgFolder, masImg} = this.state;
        if(chek_obsorv.checked){
            console.log("Наблюдение")
            let folder = imgFolder || this.defolt_folder_observ;
            loadImg().loadObservation(folder, 0).then((mas) =>{
                this.setState({masImg: mas})
                this.start();
            })
        }else{
            if(masImg.length == 0){
                loadImg().loadFolderImg(this.defolt_folder_base).then((mas) =>{
                    this.setState({masImg: mas})
                    this.start();
                })
            }else{
                this.start();
            }
        }
    }

    applyCoor = () => {
        const {finished, massum} = this.state;
        if(finished == true)
        {
            let masInput = document.querySelectorAll('.y_input');
            for(let i = 0; i < masInput.length; i++)
            {
                massum[i] = masInput[i].value;
            }
            this.setState({
                massum: massum
            })
        }
    }

    returnCoor = () => {
        const {finished, massum, oldY} = this.state;
        if(finished == true)
        {
            let masInput = document.querySelectorAll('.y_input');
            for(let i = 0; i < masInput.length; i++)
            {
                masInput[i].value = oldY[i]
            }
            this.setState({
                massum: oldY
            })
        }
    }

    start = () => {
        console.log("Click Start");
        const {masImg, imgFon, imgnum} = this.state;
        this.setState({
            finished: false,
            imgnum: 0
        });

    }

    render() {
        return (
            <L_P_Panel 
                loadFolder = {this.loadFolder}
                loadFoldImg = {this.loadFoldImg}
                loadFonImg = {this.loadFonImg}
                startPush = {this.startPush}
                massum = {this.state.massum}
                applyCoor = {this.applyCoor}
                returnCoor = {this.returnCoor}
            ></L_P_Panel>
        )
    }

}


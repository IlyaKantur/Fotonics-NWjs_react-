import React, { Component } from 'react';
import L_P_Panel from './parts/l_p_panel.js';
import loadImg from './function/loadImg.js';

import './method_2D.css';

export default class Method_2D extends Component {

    constructor(){
        super();
        this.defolt_folder_base = './Foto/Foto_base';
        this.defolt_folder_observ = './Foto/Foto_base'
    }

    state = {
        imgFolder: null,
        masImg: []
    }

    loadFolder = () => {
        const chek_obsorv = document.getElementById("chek_obsorv");
        loadImg().loadFolder(chek_obsorv.checked).then((folder) => {
            console.log(folder);
            this.setState({
                imgFolder: folder
            })
        });
    }

    loadFoldImg = () => {
        loadImg().loadFoldImg();
    }

    loadFonImg = () => {
        loadImg().loadFonImg();
    }

    startPush = () => {
        this.setState({
            masImg: loadImg().getMasImg()
        })
        const {masImg} = this.state;
        const chek_obsorv = document.getElementById("chek_obsorv");
        const {imgFolder} = this.state;
        if(chek_obsorv.checked){
            let folder = imgFolder || this.defolt_folder_observ;
            loadImg().loadObservation(folder, 0).then(() =>{
                this.start();
            })
        }else{
            if(masImg.length == 0){
                loadImg().loadFolderImg(this.defolt_folder_base).then(() =>{
                    this.start();
                })
            }else{
                this.start();
            }
        }
    }

    start = () =>{
        console.log("Click Start")
    }

    render() {
        return (
            <L_P_Panel 
                loadFolder = {this.loadFolder}
                loadFoldImg = {this.loadFoldImg}
                loadFonImg = {this.loadFonImg}
                startPush = {this.startPush}
            ></L_P_Panel>
        )
    }

}



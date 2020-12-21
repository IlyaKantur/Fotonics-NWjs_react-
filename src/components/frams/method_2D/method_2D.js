import React, { Component } from 'react';
import L_P_Panel from './parts/l_p_panel.js';
import loadImg from './function/loadImg.js';

import './method_2D.css';

export default class Method_2D extends Component {

    state = {
        imgFolder: null
    }

    loadFolder = () => {
        const chek_obsorv = document.getElementById("chek_obsorv")
        loadImg().loadFolder(chek_obsorv.checked).then((folder) => {
            console.log(folder);
            this.setState({
                imgFolder: folder
            })
        });
        
    }

    render() {
        return (
            <L_P_Panel 
                loadFolder = {this.loadFolder}
            ></L_P_Panel>
        )
    }

}



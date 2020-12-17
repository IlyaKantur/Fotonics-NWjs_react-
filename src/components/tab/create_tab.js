import React from 'react';
import{ListGroup} from 'reactstrap';
import Tab from './tab';

// import SwitchTab from './switch_tab.js';

import './tab.css';

const CreateTab = ({posts, onClose, onSwitch, activeFrame}) =>{
    const elements = posts.map((item) =>{
        const {nameWP, id_t} = item;
        const {id, name} = activeFrame;
        let clas;
        const full_name = `${nameWP}_tab_${id_t}`
        if(`${name}_tab_${id}` == full_name) 
                {
                    clas = 'tab_wp tab_wp_active'
                }
                else{
                    clas = 'tab_wp'
                }
        return(
            <div key = {full_name}>
                <Tab 
                    {...item}
                    clas = {clas}
                    onClose = {() => onClose(full_name)}
                    onSwitch = {() => onSwitch(nameWP, id_t)}
                ></Tab>
            </div>
        )
    })

    return(
        <>
            {elements}
        </>
    )
}

export default CreateTab
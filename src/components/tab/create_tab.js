import React from 'react';
import{ListGroup} from 'reactstrap';
import Tab from './tab';

// import SwitchTab from './switch_tab.js';

import './tab.css';

const CreateTab = ({posts, onClose, onSwitch}) =>{
    const elements = posts.map((item) =>{
        const {id, ...itemProps} = item;
        return(
            <div key = {id}>
                <Tab 
                    {...itemProps}
                    onClose = {() => onClose(id)}
                    onSwitch = {() => onSwitch(id)}
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
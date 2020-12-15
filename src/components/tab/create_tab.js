import React from 'react';

import Tab from './tab';

// import SwitchTab from './switch_tab.js';

import './tab.css';

const CreateTab = ({posts}) =>{
    return(
        <Tab {...posts}></Tab>
    )
}

export default CreateTab
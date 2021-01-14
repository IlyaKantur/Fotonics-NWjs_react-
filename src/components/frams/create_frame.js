import React, {Component} from 'react';

import Choice from './choice/choice.js';
import Method_2D from './method_2D/method_2D.js';

import './frames.css'

const CreateFrame = ({posts, activeFrame, onAlert}) =>{
    const elements = posts.map((item) =>{
        const {id_f, nameF} = item;
        const {id, name} = activeFrame;
        let clas;
        switch(nameF){
            case 'choice':
                if(`${name}_${id}` == `${nameF}_${id_f}`) 
                {
                    clas = 'frame frame_active'
                }
                else{
                    clas = 'frame'
                }
                return(
                    <div 
                        key = {`${nameF}_${id_f}`} 
                        className={clas} 
                    >
                        <Choice 
                            {...item}
                            onAlert = {onAlert}
                        >    
                        </Choice>
                    </div>
                )
                break;
            case 'method_2D':
                if(`${name}_${id}` == `${nameF}_${id_f}`) 
                {
                    clas = 'frame frame_active'
                }
                else{
                    clas = 'frame'
                }
                return(
                    <div 
                        key = {`${nameF}_${id_f}`} 
                        className={clas} 
                    >
                        <Method_2D {...item}></Method_2D>
                    </div>
                )
                break;
        }
    })

    return(
        <>
            {elements}
        </>
    )


}

export default CreateFrame;
import React from 'react';

import Choice from './choice/choice.js';
import Method_1D from './method_1D/method_1D.js';
import Method_2D from './method_2D/method_2D.js';
import PTE from './PTE/PTE.js';
import Camera from './camera/camera.js';
import Plot from 'react-plotly.js';

import './frames.css'

const CreateFrame = ({ posts, activeFrame, onAlert, baseElement }) => {
    const elements = posts.map((item) => {
        const { id_f, nameF } = item;
        const { id, name } = activeFrame;
        let clas, element;
        if (`${name}_${id}` == `${nameF}_${id_f}`) { clas = 'frame frame_active'}
        else { clas = 'frame'}
        switch (nameF) {
            case 'choice':
                element = <Choice
                    {...item}
                    onAlert={onAlert}
                    id_item = {item}
                    ></Choice>
                break;
            case 'method_1D':
                element = <Method_1D
                    onAlert = {onAlert}
                    id_item = {item}
                    Plot = {Plot}
                >
                </Method_1D>
                break;
            case 'method_2D':
                element = <Method_2D
                    {...item}
                    onAlert={onAlert}
                    id_item = {item}
                    Plot = {Plot}
                    ></Method_2D>
                break;
            case 'PTE':
                element = <PTE
                    id_item = {item}
                    baseElement = {baseElement}
                ></PTE>
                break;
            case 'camera': 
                element = <Camera>

                </Camera>
                break;
        }
        return (
            <div
                key={`${nameF}_${id_f}`}
                className={clas}
            >
                {element}
            </div>
        )
    })

    return (
        <>
            {elements}
        </>
    )
}

export default CreateFrame;
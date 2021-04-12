import React from 'react';
import './choice.css'

const Choice = ({onAlert, id_item, createTab}) => {
    const { id_f, nameF } = id_item;
    const id_f_nameF = `${nameF}_${id_f}`
    return (
        <>
            <h1 className = "Zagolov" id={`Zagolov_${id_f_nameF}`}>Выберите режим</h1>
            <div className = "but" id={`but_${id_f_nameF}`}>
                <button className = "DD" id={`D_${id_f_nameF}`} onClick = {() => {createTab('method_1D')}}>1D Detection</button>
                <button className = "DD" id={`DD_${id_f_nameF}`} onClick={() => {createTab("method_2D")}}>2D Detection</button>
            </div>
        </>
    )
}


export default Choice;
import React from 'react';
import './choice.css'

const Choice = ({onAlert, id_item}) => {
    const { id_f, nameF } = id_item;
    const id_f_nameF = `${nameF}_${id_f}`
    return (
        <>
            <h1 className = "Zagolov" id={`Zagolov_${id_f_nameF}`}>Выберите режим</h1>
            <div className = "but" id={`but_${id_f_nameF}`}>
                <button className = "Continue" id={`Continue_${id_f_nameF}`}>Продолжить</button>
                <button className = "DD" id={`D_${id_f_nameF}`} onClick = {() => {ClickD(onAlert)}}>1D Detection</button>
                <button className = "DD" id={`DD_${id_f_nameF}`} onClick={() => {ClickDD(onAlert)}}>2D Detection</button>
            </div>
        </>
    )
}
function ClickD(onAlert){
    console.log('Click 1D');
    onAlert('Click 1D')
}
function ClickDD(onAlert){
    console.log('Click 2D');
    onAlert('Click 2D')
}

export default Choice;
import React from 'react';
import './choice.css'

const Choice = ({onAlert, id_item}) => {
    const { id_f, nameF } = id_item;
    return (
        <>
            <h1 className = "Zagolov" id={`Zagolov_${nameF}_${id_f}`}>Выберите режим</h1>
            <div className = "but" id={`but_${nameF}_${id_f}`}>
                <button className = "Continue" id={`Continue_${nameF}_${id_f}`}>Продолжить</button>
                <button className = "DD" id={`DD_${nameF}_${id_f}`} onClick={() => {ClickDD(onAlert)}}>2D Detection</button>
            </div>
        </>
    )
}
function ClickDD(onAlert){
    console.log('Click 2D');
    onAlert('Click 2D')
}

export default Choice;
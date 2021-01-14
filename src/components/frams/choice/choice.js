import React from 'react';
import './choice.css'

const Choice = ({onAlert}) => {
    return (
        <>
            <h1 id="Zagolov">Выберите режим</h1>
            <div id="but">
                <button id="Continue">Продолжить</button>
                <button id="DD" onClick={() => {ClickDD(onAlert)}}>2D Detection</button>
            </div>
        </>
    )
}
function ClickDD(onAlert){
    console.log('Click 2D');
    onAlert('Click 2D')
}

export default Choice;
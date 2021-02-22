import React, {Component} from 'react';

// import './PTE.css';

export default class PTE extends Component{
    constructor(props){
        super(props);


    }

    state = {

    }

    render(){
        const {test} = this.props; 
        return(
            <>
                <h1>Периодическая таблица элементов</h1>
                <p>{test}</p>
            </>
        )
    }
}
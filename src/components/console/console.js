import React, {Component} from 'react';

export default class Console extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {consoleMessage} = this.props;
        const elements = consoleMessage.map((item) =>{
            const {message, id, time} = item;
            return(
                <div
                    key = {`conMes_${id}`}
                    id = {`conMes_${id}`}
                >
                    <Con
                        message = {message}
                        time = {time}
                    ></Con>
                </div>
            )
        })
        return(
            <>
                {elements}
            </>
        )
    }

}

const Con = ({message, time})=>{
    return(
        <>
            {`${message} | ${time}`}
        </>
    )

}


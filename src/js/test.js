import React, {PureComponent} from "react";
import ReactDOM from "react-dom";
// import Test from "../components/app/App.js";


// import '../styles/index.css'

ReactDOM.render(
    <Test/>,
    document.getElementById("root_2")
);

class Test extends PureComponent{
    render(){
        <h3>Test ещё одного окна</h3>
    }
}
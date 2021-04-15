import React, { PureComponent } from 'react';

import "./menuBar.css"

class MenuBar extends PureComponent {
    state = {
        class1: "listMenu",
        class2: "listMenu",
        class3: "listMenu"
    }

    componentDidMount(){
        document.getElementById("work_place").addEventListener("click", ()=> this.listClick(0))
    }

    listClick = (id) => {
        let class1 = "listMenu", class2 = "listMenu", class3 = "listMenu";
        switch (id) {
            case 1: {
                class1 = "listMenu listMenu_active";
                break;
            }
            case 2: {
                class2 = "listMenu listMenu_active";
                break;
            }
            case 3: {
                class3 = "listMenu listMenu_active"
                break;
            }
        }
        this.setState({
            class1: class1,
            class2: class2,
            class3: class3
        })
    }
    render() {
        const {class1, class2, class3} = this.state
        return (
            <div id = "BAR">
                <div id="MenuBar">
                    <div className="MenuBar_Button" onClick={() => {this.listClick(1)}}>Файл</div>
                    <div className="MenuBar_Button" onClick={() => {this.listClick(2)}}>Метод</div>
                    <div className="MenuBar_Button" onClick={() => {this.listClick(3)}}>Справка</div>
                </div>
                <div id="ListMenu">
                    <div id="ListFile" className={class1}>
                        <button className="button_ListMenu">Close</button>
                    </div>
                    <div id="ListMetod" className={class2}>
                        <button className="button_ListMenu">Metod 1D</button>
                        <button className="button_ListMenu">Metod 2D</button>
                        <button className="button_ListMenu">Camera</button>
                    </div>
                    <div id="ListInfo" className={class3}>
                        <button className="button_ListMenu">PTE</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuBar
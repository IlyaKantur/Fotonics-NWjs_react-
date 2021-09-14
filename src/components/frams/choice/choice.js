'use strict'
import React from 'react';
import './choice.css'

const fs = window.require('fs');

const Choice = ({ onAlert, id_item, createTab }) => {
    const { id_f, nameF } = id_item;
    const id_f_nameF = `${nameF}_${id_f}`
    return (
        <>
            <h1 className="Zagolov" id={`Zagolov_${id_f_nameF}`}>Выберите режим</h1>
            <div className="but" id={`but_${id_f_nameF}`}>
                <button className="DD" id={`D_${id_f_nameF}`} onClick={() => { createTab('method_1D') }}>1D Detection</button>
                <button className="DD" id={`DD_${id_f_nameF}`} onClick={() => { createTab("method_2D") }}>2D Detection</button>
                <button onClick={() => { check_version() }}>Check Version</button>
            </div>
        </>
    )
}

const check_version = async () => {
    const urlVersion = 'http://127.0.0.1:3000/download/Fotonics.json';
    const path_package = '/package.json'
    let package_json;
    // const file = require('/package.json')

    fetch(path_package, {
        method: "GET",
        headers: {}
    })
        .then(response => response.json())
        .then(json => {
            package_json = json
        })

    fetch(urlVersion, {
        method: "GET",
        headers: {}
    })
        .then(response => response.json())
        .then(json => {
            if (package_json.version === json.version) {
                console.log("Стоит текущая версия")
            }
            else {
                console.log("Версия устарела")
                package_json['version'] = json.version
                fs.unlink(`.${path_package}`, err => { if (err !== null) console.log(err) })
                fs.writeFileSync(`.${path_package}`, JSON.stringify(package_json), err => { if (err !== null) console.log(err) })
            }
        })
}

// class AutoSaveJSON {
//     constructor(path) {
//         this.data ;
//     }

//     save() {
//         fs.writeFile(path, JSON.stringify(this.data), err => console.dir(err, { colors: true }))
//     }

//     set(key, value) {
//         this.data[key] = value;
//         this.save()
//     }

//     get(key) {
//         return this.data[key]
//     }
// }



export default Choice;
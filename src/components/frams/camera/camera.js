import React, { Component } from 'react';
import Webcam from 'react-webcam';
const fs = window.require('fs');

import './camera.css';

export default class Camera extends Component {
  constructor(props) {
    super(props);
    this.webcamRef = React.createRef();
    this.iter;
    this.n_snapshot = 0;
    this.masInformation = {
      countSnapshot: 1,
      delayTime: 1
    }
  }

  state = {
    active: false,
    imgSrc: null,
    choice: false,
    camers: [],
    deviceId: null
  }

  stored_value = (name, value) => {
    this.masInformation[name] = value
  }

  componentDidMount() {
    navigator.mediaDevices.enumerateDevices().then(this.handleDevices);
  }

  handleDevices = (mediaDevices) => {
    let camers = mediaDevices.filter(({ kind }) => kind === "videoinput")
    console.log(camers)
    this.setState({
      camers: camers
    })
  }

  active_cam = () => {
    this.setState({
      active: !this.state.active
    })
  }

  switch_choice = () => {
    this.setState({
      choice: !this.state.choice
    })
  }

  choice_camera = (item) => {
    this.setState({
      deviceId: item.deviceId
    })
    console.log(item)
  }

  capture = () => {
    this.n_snapshot = 0;
    if (!this.iter) {
      this.iter = setInterval(() => {
        this.snapshot()
      }, this.masInformation.delayTime*1000)
    }
  }

  snapshot = () => {
    const imageSrc = this.webcamRef.current.getScreenshot();
    this.setState({
      imgSrc: imageSrc
    })
    const base64Data = imageSrc.replace(/data:image\/png;base64,/, "");
    fs.writeFile(`result/image/test_${this.n_snapshot++}.jpg`, base64Data, 'base64', err => { if (err !== null) console.log(err) })
    if(this.n_snapshot == this.masInformation.countSnapshot) clearInterval(this.iter)
  }

  render() {
    const { active, imgSrc, choice, camers, deviceId } = this.state;
    let element, style = '', width = 800, height = 600, camera;
    if (choice) {
      style = 'choice_snapshot';
      width = 400;
      height = 300
    }
    if (active) {
      element =
        (<>
          <div onClick={this.switch_choice}>
            <Webcam
              audio={false}
              ref={this.webcamRef}
              videoConstraints={deviceId}
              screenshotFormat="image/png"
              width={width}
              height={height}
            />
          </div>
          {imgSrc && (
            <img id='snapshot'
              className={style}
              src={imgSrc}
              onClick={this.switch_choice}
            />
          )}
        </>
        )
    }
    else { element = (<></>) }
    if(camers.lengh != 0)
    {
      camera = camers.map((item, i) => {
        return(
          <a key={`camera_${i}`} onClick = {() => this.choice_camera(item)}>{item.label}</a>
        )
      })
    }
    return (
      <div id='camera_place'>
        <div id="control">
          <h3>Спосок подключенных камер</h3>
          <div id="list_camera">
            {camera}
          </div>
          <button onClick={this.active_cam}>Камера</button>
          <button onClick={this.capture}>Накопление</button>
          <input id='countSnapshot' type='number' placeholder="Количество снимков"
            onChange={(e) => this.stored_value(e.target.id, e.target.value)}
          ></input>
          <input id='delayTime' type='number' placeholder="Время задержки,с"
            onChange={(e) => this.stored_value(e.target.id, e.target.value)}
          ></input>
          {/* <button onClick={stop}>Stop</button> */}
        </div>
        <div id="place">
          {element}
        </div>
      </div>
    )
  }
}

// const WebcamCapture = () => {
//   const webcamRef = React.useRef(null);
//   const [imgSrc, setImgSrc] = React.useState(null);

// let inter

//   const capture = React.useCallback(() => {
//     let i = 0
//     if(!inter)
//     {
//       inter = setInterval(() => {
//         const imageSrc = webcamRef.current.getScreenshot();
//         setImgSrc(imageSrc);

//         const base64Data = imageSrc.replace(/data:image\/png;base64,/, "");
//         // Созранение фото
//         fs.writeFile(`result/image/test_${i++}.jpg`, base64Data, 'base64', function (err) {
//           if (err != null) {
//             console.log(err);
//           }

//         });
//       },1000)
//     }else{
//       clearInterval(inter)
//     }

//   }, [webcamRef, setImgSrc]);


//   return (
//     <>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/png"
//       />
//       {imgSrc && (
//         <img id='snapshot'
//           src={imgSrc}
//         />
//       )}
//     </>
//   );
// };


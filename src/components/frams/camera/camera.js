import React, { Component } from 'react';
import Webcam from 'react-webcam';
const fs = window.require('fs');

import './camera.css';

export default class Camera extends Component {
  constructor(props) {
    super(props);
    this.webcamRef = React.createRef();
    this.iter;
    this.camers = null;
  }

  componentDidMount() {
    navigator.mediaDevices.enumerateDevices().then(this.handleDevices);
  }

  handleDevices = (mediaDevices) => {
    this.camers = mediaDevices.filter(({ kind }) => kind === "videoinput")
    // console.log(this.camers)
  }

  state = {
    active: false,
    imgSrc: null,
    choice: false
  }

  active_cam = () => {
    this.setState({
      active: !this.state.active
    })
  }

  switch_choice = () =>{
    this.setState({
      choice: !this.state.choice
    })
  }

  capture = () => {
    let i = 0;
    // if(!this.iter){
    //   this.iter = setInterval(() =>{

    //   })
    // }

    const imageSrc = this.webcamRef.current.getScreenshot();
    this.setState({
      imgSrc: imageSrc
    })
    const base64Data = imageSrc.replace(/data:image\/png;base64,/, "");
    fs.writeFile(`result/image/test_${i++}.jpg`, base64Data, 'base64', err => { if (err !== null) console.log(err) })
  }

  render() {
    const { active, imgSrc, choice } = this.state;
    let element, style = '', width = 800, height = 600;
    if(choice){
      style = 'choice_snapshot';
      width = 400;
      height = 300
    }
    if (active) {
      element =
      (<>
        <div onClick = {this.switch_choice}>
          <Webcam
            audio={false}
            ref={this.webcamRef}
            screenshotFormat="image/png"
            width={width}
            height={height}
          />
        </div>
        {imgSrc && (
          <img id='snapshot'
            className = {style}
            src={imgSrc}
            onClick = {this.switch_choice}
          />
        )}
      </>
      )
    }
    else { element = (<></>) }
    return (
      <div id='camera_place'>
        <div id="control">
          <button onClick={this.active_cam}>Watch</button>
          <button onClick={this.capture}>Capture photo</button>
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


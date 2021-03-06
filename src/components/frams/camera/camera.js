import React, { Component } from 'react';
import Webcam from 'react-webcam';
const fs = window.require('fs');

import './camera.css';

export default class Camera extends Component {
  constructor(props) {
    super(props);
  }

  state = {

  }

  // componentDidMount() {
  //     this.start_watch();
  // }

  // start_watch = () => {
  //     const video = document.getElementById('video');
  //     // Получаем доступ к камере
  //     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //         // Не включаем аудио опцией `{ audio: true }` поскольку сейчас мы работаем только с изображениями
  //         navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
  //             if (!video.srcObject) {
  //                 video.srcObject = stream;
  //                 video.play()
  //             }
  //             // var playPromise = video.play();

  //             // if (playPromise !== undefined) {
  //             //     playPromise.then(_ => {
  //             //     })
  //             //         .catch(error => {
  //             //             // Auto-play was prevented
  //             //             // Show paused UI.
  //             //         });
  //             // }

  //         });
  //     }
  // }

  // click_snapshot = () => {
  //     const context = document.getElementById('canvas').getContext('2d');
  //     const video = document.getElementById('video');

  //     context.drawImage(video, 0, 0, 640, 480);
  // }


  render() {

    return (
      <div id='camera'>
        <WebcamCapture></WebcamCapture>
        {/* <video id="video" width="640" height="480" autoPlay={true} controls></video> */}
        {/* <button id="snap">Сделать снимок</button> */}
        <canvas id="canvas" width="640" height="480"></canvas>
      </div>
    )
  }
}

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

let inter

  const capture = React.useCallback(() => {
    let i = 0
    if(!inter)
    {
      inter = setInterval(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
  
        const base64Data = imageSrc.replace(/data:image\/png;base64,/, "");
        // Созранение фото
        fs.writeFile(`result/image/test_${i++}.jpg`, base64Data, 'base64', function (err) {
          if (err != null) {
            console.log(err);
          }
  
        });
      },1000)
    }else{
      clearInterval(inter)
    }
    
  }, [webcamRef, setImgSrc]);


  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
      />
      <button onClick={capture}>Capture photo</button>
      <button onClick={stop}>Stop</button>
      {imgSrc && (
        <img id='snapshot'
          src={imgSrc}
        />
      )}
    </>
  );
};


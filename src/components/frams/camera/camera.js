import React, { PureComponent } from 'react';
import Webcam from 'react-webcam';
const fs = window.require('fs');

import './camera.css';

export default class Camera extends PureComponent {
  constructor(props) {
    super(props);
    this.webcamRef = React.createRef();
    this.iter;
    this.n_snapshot = 0;
    this.masInformation = {
      countSnapshot: 1,
      delayTime: 1,
      nameSnapshot: '',
      recordingTime: null
    }
    this.folder_storage = ""
  }

  state = {
    active: false,
    imgSrc: null,
    choice: false,
    camers: [],
    deviceId: null,
  }

  stored_value = (name, value) => {
    this.masInformation[name] = value
  }

  componentDidMount() {
    // navigator.mediaDevices.getUserMedia().then(this.userMedia)
    navigator.mediaDevices.enumerateDevices().then(this.handleDevices);
  }

  // userMedia = (info) => {
  //   console.log(info)
  // }


  handleDevices = (mediaDevices) => {
    let camers = mediaDevices.filter(({ kind }) => kind === "videoinput")
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
  }

  choice_folder = () => {
    let i = document.createElement('input')
    i.type = 'file';
    i.nwdirectory = 'directory';
    i.click();
    i.onchange = (e) => {
      const f = String(e.target.value)
      this.folder_storage = f
    }
  }

  capture = () => {
    this.n_snapshot = 0;
    if (!this.iter) {
      if (this.masInformation.recordingTime) {
        let { recordingTime, delayTime } = this.masInformation
        this.masInformation.countSnapshot = Math.floor(recordingTime / delayTime)
      }
      this.iter = setInterval(() => {
        this.snapshot()
      }, this.masInformation.delayTime * 1000)
    }
  }

  snapshot = () => {
    const imageSrc = this.webcamRef.current.getScreenshot();
    this.setState({
      imgSrc: imageSrc
    })
    const base64Data = imageSrc.replace(/data:image\/png;base64,/, "");
    let folder = this.folder_storage || 'result/image';
    let name = this.masInformation.nameSnapshot || 'image'
    fs.writeFile(`${folder}/${name}_${this.n_snapshot++}.jpg`, base64Data, 'base64', err => { if (err !== null) console.log(err) })
    if (this.n_snapshot == (this.masInformation.countSnapshot || 1)) {
      clearInterval(this.iter)
      this.iter = null;
    }
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
              videoConstraints={{ deviceId: deviceId }}
              screenshotQuality={{ screenshotQuality: 1 }}
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
    if (camers.lengh != 0) {
      camera = camers.map((item, i) => {
        return (
          <a key={`camera_${i}`} onClick={() => this.choice_camera(item)}>{item.label}</a>
        )
      })
    }
    return (
      <div id='camera_place'>
        <div id="control_camera">
          <h3 style={{background: this.props.style.navbar_a}}>Спосок подключенных камер</h3>
          <div id="list_camera">
            {camera}
          </div>
          <h3 style={{background: this.props.style.navbar_a}}>Управление</h3>
          <div id='camera_button'>
            <button style={{ background: this.props.style.button }} className='just_button' onClick={this.active_cam}>Камера</button>
            <button style={{ background: this.props.style.button }} className='just_button' onClick={this.choice_folder}>Папка</button>
            <button style={{ background: this.props.style.button }} className='just_button' onClick={this.capture}>Накопление</button>
          </div>
          <input id='nameSnapshot' type='text' placeholder="Название"
            onChange={(e) => this.stored_value(e.target.id, e.target.value)}
          ></input>
          <input id='countSnapshot' type='number' placeholder="Количество снимков"
            onChange={(e) => this.stored_value(e.target.id, e.target.value)}
          ></input>
          либо
          <input id='recordingTime' type='number' placeholder="Время съемки,с"
            onChange={(e) => this.stored_value(e.target.id, e.target.value)}
          ></input>
          <input id='delayTime' type='number' placeholder="Время задержки,с"
            onChange={(e) => this.stored_value(e.target.id, e.target.value)}
          ></input>
          {/* <button onClick={stop}>Stop</button> */}
        </div>
        <div id="place_cam_snap">
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


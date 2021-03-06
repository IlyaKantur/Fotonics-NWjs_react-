import React, { Component } from 'react';

import './camera.css';

export default class Camera extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        const video = document.getElementById('video');

        // Получаем доступ к камере
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Не включаем аудио опцией `{ audio: true }` поскольку сейчас мы работаем только с изображениями
            navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                video.srcObject = stream;
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                      playPromise;
                    })
                    .catch(error => {
                      // Auto-play was prevented
                      // Show paused UI.
                    });
                  }
            });
        }
    }

    click_snapshot = () => {
        const context = document.getElementById('canvas').getContext('2d');
        const video = document.getElementById('video');

        context.drawImage(video, 0, 0, 1280, 720);
    }

    render() {

        return (
            <div id='camera'>
                <video id="video" width="640" height="480" autoPlay></video>
                <button id="snap">Сделать снимок</button>
                <canvas id="canvas" width="640" height="480"></canvas>
            </div>
        )
    }
}
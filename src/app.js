import * as Sound from './index.js'

const soundMaker = new Sound.SoundMaker()

const startButton = document.querySelector('#start-button')
startButton.addEventListener('click', event => soundMaker.start())

const square = new Sound.Square()

const playButton = document.querySelector('#play-button')
playButton.addEventListener('click', event => square.play())

const stopButton = document.querySelector('#stop-button')
stopButton.addEventListener('click', event => square.stop())
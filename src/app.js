import * as Chiptune from './index.js'

const startButton = document.querySelector('#start-button')
startButton.addEventListener('click', event => Chiptune.start())

const square = new Chiptune.Instrument('square')

const playButton = document.querySelector('#play-button')
playButton.addEventListener('click', event => square.play(63))

const stopButton = document.querySelector('#stop-button')
stopButton.addEventListener('click', event => square.stop())

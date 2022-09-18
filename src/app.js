import * as Chiptune from './index.js'

const startButton = document.querySelector('#start-button')
startButton.addEventListener('click', event => Chiptune.start())

const square = new Chiptune.Synth('square')
const sawtooth = new Chiptune.Synth('sawtooth')

const playButton = document.querySelector('#play-button')
playButton.addEventListener('click', event => square.play())

const stopButton = document.querySelector('#stop-button')
stopButton.addEventListener('click', event => square.stop())

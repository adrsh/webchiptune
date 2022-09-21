import '../src/components/pt-keyboard'
import * as Chiptune from './index.js'

const startButton = document.querySelector('#start-button')

startButton.addEventListener('click', event => playSequence())

const instrument = new Chiptune.Instrument('triangle')

const sequence = new Chiptune.Sequence(instrument)

sequence.add(0, 60)
sequence.add(1, 62)
sequence.add(2, 64)
sequence.add(3, 65)
sequence.add(4, 67)

/**
 * Plays a sequence.
 */
function playSequence () {
  Chiptune.start()
  sequence.play(120)
}

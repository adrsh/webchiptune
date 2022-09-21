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
sequence.delete(2)
sequence.add(2, 64)

/**
 * Plays a sequence.
 */
function playSequence () {
  Chiptune.start()
  sequence.play(120)
}

const playMultiSeqButton = document.querySelector('#play-multiple-sequences')

playMultiSeqButton.addEventListener('click', event => playSequences())

const square = new Chiptune.Instrument('sawtooth')

const squareSequence = new Chiptune.Sequence(square)

squareSequence.add(0, 60)
squareSequence.add(1, 62)
squareSequence.add(2, 64)
squareSequence.add(3, 65)
squareSequence.add(4, 67)
squareSequence.delete(2)
squareSequence.add(2, 64)

/**
 * Plays to sequences.
 */
function playSequences () {
  Chiptune.start()
  const now = Chiptune.now()
  const tempo = 120
  sequence.play(tempo, now)
  squareSequence.play(tempo, now)
}

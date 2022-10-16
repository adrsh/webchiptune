import '../src/components/pt-keyboard'
import * as Chiptune from '../webchiptune/index.js'

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

const square = new Chiptune.Instrument('square')

const squareSequence = new Chiptune.Sequence(square)

squareSequence.add(5, 60)
squareSequence.add(6, 62)
squareSequence.add(7, 64)
squareSequence.add(8, 65)
squareSequence.add(9, 67)
squareSequence.delete(2)
squareSequence.add(7, 64)

/**
 * Plays two sequences.
 */
function playSequences () {
  Chiptune.start()
  const now = Chiptune.now()
  const tempo = 120
  sequence.play(tempo, now)
  squareSequence.play(tempo, now)
}

// Testing a melody.

const melodySequence = new Chiptune.Sequence(new Chiptune.Instrument('square'))
const bassSequence = new Chiptune.Sequence(new Chiptune.Instrument('triangle'))

melodySequence.add(0, 'E4')

melodySequence.add(10, 'C4')
melodySequence.add(12, 'G4')
melodySequence.add(14, 'D4')

melodySequence.add(20, 'C4')
melodySequence.add(22, 'B3')

melodySequence.add(28, 'G3')
melodySequence.add(30, 'D4')

melodySequence.add(36, 'C4')
melodySequence.add(38, 'B3')

melodySequence.add(42, 'G3')
melodySequence.add(44, 'D4')
melodySequence.add(46, 'C4')

melodySequence.add(50, 'A3')
melodySequence.add(54, 'A3')
melodySequence.add(56, 'C4')
melodySequence.add(60, 'D4')

bassSequence.add(0, 'A2')
bassSequence.add(3, 'A2')
bassSequence.add(6, 'A2')

bassSequence.add(14, 'A2')
bassSequence.add(16, 'G2')
bassSequence.add(19, 'G2')
bassSequence.add(22, 'G2')

bassSequence.add(30, 'G2')
bassSequence.add(32, 'E2')
bassSequence.add(35, 'E2')
bassSequence.add(38, 'E2')

bassSequence.add(46, 'E2')
bassSequence.add(48, 'F2')
bassSequence.add(51, 'F2')
bassSequence.add(54, 'F2')

bassSequence.add(60, 'F2')
bassSequence.add(62, 'G2')

const playMelodyButton = document.querySelector('#play-melody')
playMelodyButton.addEventListener('click', event => playMelody())

const stopMelodyButton = document.querySelector('#stop-melody')
stopMelodyButton.addEventListener('click', event => stopMelody())

/**
 * Plays the melody.
 */
function playMelody () {
  Chiptune.start()
  const now = Chiptune.now()
  const tempo = 120
  melodySequence.play(tempo, now)
  bassSequence.play(tempo, now)
}

/**
 * Stops the melody.
 */
function stopMelody () {
  melodySequence.stop()
  bassSequence.stop()
}

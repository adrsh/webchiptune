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

melodySequence.add(0, Chiptune.notationToNoteNumber('E4'))

melodySequence.add(10, Chiptune.notationToNoteNumber('C4'))
melodySequence.add(12, Chiptune.notationToNoteNumber('G4'))
melodySequence.add(14, Chiptune.notationToNoteNumber('D4'))

melodySequence.add(20, Chiptune.notationToNoteNumber('C4'))
melodySequence.add(22, Chiptune.notationToNoteNumber('B3'))

melodySequence.add(28, Chiptune.notationToNoteNumber('G3'))
melodySequence.add(30, Chiptune.notationToNoteNumber('D4'))

melodySequence.add(36, Chiptune.notationToNoteNumber('C4'))
melodySequence.add(38, Chiptune.notationToNoteNumber('B3'))

melodySequence.add(42, Chiptune.notationToNoteNumber('G3'))
melodySequence.add(44, Chiptune.notationToNoteNumber('D4'))
melodySequence.add(46, Chiptune.notationToNoteNumber('C4'))

melodySequence.add(50, Chiptune.notationToNoteNumber('A3'))
melodySequence.add(54, Chiptune.notationToNoteNumber('A3'))
melodySequence.add(56, Chiptune.notationToNoteNumber('C4'))
melodySequence.add(60, Chiptune.notationToNoteNumber('D4'))

bassSequence.add(0, Chiptune.notationToNoteNumber('A2'))
bassSequence.add(3, Chiptune.notationToNoteNumber('A2'))
bassSequence.add(6, Chiptune.notationToNoteNumber('A2'))

bassSequence.add(14, Chiptune.notationToNoteNumber('A2'))
bassSequence.add(16, Chiptune.notationToNoteNumber('G2'))
bassSequence.add(19, Chiptune.notationToNoteNumber('G2'))
bassSequence.add(22, Chiptune.notationToNoteNumber('G2'))

bassSequence.add(30, Chiptune.notationToNoteNumber('G2'))
bassSequence.add(32, Chiptune.notationToNoteNumber('E2'))
bassSequence.add(35, Chiptune.notationToNoteNumber('E2'))
bassSequence.add(38, Chiptune.notationToNoteNumber('E2'))

bassSequence.add(46, Chiptune.notationToNoteNumber('E2'))
bassSequence.add(48, Chiptune.notationToNoteNumber('F2'))
bassSequence.add(51, Chiptune.notationToNoteNumber('F2'))
bassSequence.add(54, Chiptune.notationToNoteNumber('F2'))

bassSequence.add(60, Chiptune.notationToNoteNumber('F2'))
bassSequence.add(62, Chiptune.notationToNoteNumber('G2'))

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

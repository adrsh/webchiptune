const context = new AudioContext()

/**
 * Starts or resumes the Audio Context.
 */
export function start () {
  context.resume()
}

/**
 * Returns the current time of the Audio Context.
 *
 * @returns {number} Current time
 */
export function now () {
  return context.currentTime
}

/**
 *
 */
export class Instrument {
  oscillator
  gainNode
  /**
   * Constructor for Instrument.
   *
   * @param {string} type Oscillator type.
   */
  constructor (type) {
    this.oscillator = new OscillatorNode(context, {
      type
    })
    this.gainNode = new GainNode(context, { gain: 0 })
    this.oscillator.connect(this.gainNode).connect(context.destination)
    this.oscillator.start()
  }

  /**
   * Plays a note at a specified time.
   *
   * @param {number} note Which note to play. EX. 48.
   * @param {number} time Time to play the note.
   */
  play (note, time = now()) {
    // Changes frequency of the oscillator.
    this.oscillator.frequency.setValueAtTime(noteToFrequency(note), time)

    // Cancels any scheduled and ongoing changes to the gain value.
    this.gainNode.gain.cancelScheduledValues(time)

    // Sets the gain to 0.1 at the specified time.
    this.gainNode.gain.setValueAtTime(0.1, time)

    // Ramps the gain to zero linearly one second after the time.
    this.gainNode.gain.linearRampToValueAtTime(0, time + 1)
  }

  /**
   * Stops the oscillator.
   */
  stop () {
    this.oscillator.stop()
  }
}

/**
 * Convert MIDI note to its corresponding frequency.
 *
 * @param {Number} note MIDI note to convert to frequency.
 * @returns {Number} Frequency corresponding to the note.
 */
function noteToFrequency (note) {
  // Could be replaced with a look-up-table
  return 440 * 2 ** ((note - 69) / 12)
}

/**
 * Convert MIDI note to notation.
 *
 * @param {Number} note MIDI Note to convert to notation
 * @returns {String} Notation of MIDI note.
 */
export function noteToNotation (note) {
  if (note < 12 || note > 119) {
    throw new Error('Note needs to be between 12 and 119.')
  }
  const noteIndex = (note - 9) % 12
  const noteName = noteIndexToNoteName(noteIndex)
  const octave = Math.floor((note - 12) / 12)
  return noteName + octave
}

/**
 * Convert note index to note name.
 *
 * @param {Number} noteIndex Note to convert to name, ex. 0 = A, 1 = A#...
 * @returns {String} Note name.
 */
function noteIndexToNoteName (noteIndex) {
  if (noteIndex < 0 || noteIndex > 11) {
    throw new Error('Note index needs to be between 0 and 11.')
  }
  switch (noteIndex) {
    case 0: return 'A'
    case 1: return 'A#'
    case 2: return 'B'
    case 3: return 'C'
    case 4: return 'C#'
    case 5: return 'D'
    case 6: return 'D#'
    case 7: return 'E'
    case 8: return 'F'
    case 9: return 'F#'
    case 10: return 'G'
    case 11: return 'G#'
  }
}

/**
 * Represent a sequence of notes.
 */
export class Sequence {
  /**
   * Constructor for Chiptune sequence.
   *
   * @param {Chiptune.Instrument} instrument Instrument to be played by the sequencer.
   */
  constructor (instrument) {
    this.sequence = []
    this.instrument = instrument
  }

  /**
   * Starts playing the sequence.
   *
   * @param {Number} tempo Tempo for the sequence to be played.
   */
  play (tempo = 120) {
    const tickLength = 1 / ((tempo * 4) / 60)
    for (let index = 0; index < 64; index++) {
      if (this.sequence[index]) {
        this.instrument.play(this.sequence[index], now() + (tickLength * index))
      }
    }
  }

  /**
   * Adds a note to the sequence.
   *
   * @param {Number} row Row of note to be played.
   * @param {Number} note Note to be played.
   */
  add (row, note) {
    this.sequence[row] = note
  }
}

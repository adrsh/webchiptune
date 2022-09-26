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
  return context.currentTime + 0.02
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
   * @param {Chiptune.Note} note Which note to play. Ex. 48.
   * @param {number} time Time to play the note.
   */
  play (note, time = now()) {
    // Cancels any scheduled and ongoing changes to the gain value.
    this.gainNode.gain.cancelAndHoldAtTime(time)

    // Changes frequency of the oscillator.
    this.oscillator.frequency.setValueAtTime(note.getFrequency(), time)

    // Sets the gain to 0.1 at the specified time.
    this.gainNode.gain.setValueAtTime(0.1, time)

    // Ramps the gain to zero linearly one second after the time.
    this.gainNode.gain.linearRampToValueAtTime(0, time + 1)
  }

  /**
   * Release the note.
   *
   * @param {number} time Time to release the note.
   */
  release (time = now()) {
    this.gainNode.gain.cancelAndHoldAtTime(time)
    this.gainNode.gain.linearRampToValueAtTime(0, time + 0.5)
  }

  /**
   * Stops the oscillator.
   *
   * @param {number} time When to stop.
   */
  stop (time = now()) {
    this.gainNode.gain.cancelScheduledValues(time)
    this.oscillator.frequency.cancelScheduledValues(time)
    this.gainNode.gain.linearRampToValueAtTime(0, time + 0.02)
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
   * @param {number} tempo Tempo for the sequence to be played.
   * @param {number} time Time for when to play the sequence.
   */
  play (tempo = 120, time = now()) {
    this.instrument.stop()
    const tickLength = 1 / ((tempo * 4) / 60)
    for (let index = 0; index < 64; index++) {
      if (this.sequence[index]) {
        this.instrument.play(this.sequence[index], time + (tickLength * index))
      }
    }
  }

  /**
   * Stop the sequence from playing.
   *
   * @param {number} time Time of when to stop the sequence from playing.
   */
  stop (time = now()) {
    this.instrument.stop(time)
  }

  /**
   * Adds a note to the sequence.
   *
   * @param {number} row Row of note to be played.
   * @param {number | string} note Note to be played.
   */
  add (row, note) {
    if (row < 0 || row > 63) {
      throw new Error('Row is out of range.')
    }
    this.sequence[row] = new Note(note)
  }

  /**
   * Delete a note from a row.
   *
   * @param {number} row Row to delete note from.
   */
  delete (row) {
    delete this.sequence[row]
  }
}

/**
 * Class representing a note.
 */
export class Note {
  #number
  #frequency
  /**
   * Constructor for Note.
   *
   * @param {number | string} note Note
   */
  constructor (note) {
    try {
      if (typeof note === 'number') {
        this.#setNumber(note)
      } else if (typeof note === 'string') {
        this.#setNumber(this.notationToNoteNumber(note))
      }
      this.#frequency = this.noteToFrequency(this.#number)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Sets the number of Note.
   *
   * @param {number} number Number to set the note to.
   */
  #setNumber (number) {
    if (number < 12 || number > 120) {
      throw new Error('Note is out of range.')
    }
    this.#number = number
  }

  /**
   * Get the number of the note.
   *
   * @returns {Number} Note number.
   */
  getNumber () {
    return this.#number
  }

  /**
   * Get the frequency of the note.
   *
   * @returns {number}
   */
  getFrequency () {
    return this.#frequency
  }

  /**
   * Get this note as notation. Ex. C4.
   * @returns {String}
   */
  getNotation () {
    return this.noteNumberToNotation(this.#number)
  }

  /**
   * Convert MIDI note to its corresponding frequency.
   *
   * @param {number} note MIDI note to convert to frequency.
   * @returns {number} Frequency corresponding to the note.
   */
  noteToFrequency (note) {
    return 440 * 2 ** ((note - 69) / 12)
  }

  /**
   * Convert note notation to note number.
   *
   * @param {string} notation Note notation to convert to note number. Ex. C4 = 60.
   * @returns {number} Note number that the note notation corresponds to.
   */
  notationToNoteNumber (notation) {
    if (notation.length > 3 || notation.length < 2) {
      throw new Error('Note notation has an invalid format.')
    }

    // Extract octave
    const octave = parseInt(notation.charAt(notation.length - 1))
    if (isNaN(octave) || octave < 0 || octave > 8) {
      throw new Error('Octave is out of range.')
    }

    // Extract note name
    let noteName
    if (notation.length === 2) {
      noteName = notation.slice(0, 1)
    } else if (notation.length === 3) {
      noteName = notation.slice(0, 2)
    }

    // Octave needs to add one because C0 is octave 0 but note number 12.
    return (octave + 1) * 12 + this.noteNameToNoteIndex(noteName)
  }

  /**
   * Convert name of note to index.
   *
   * @param {string} noteName Name of note to convert to index. C = 0, C# = 1...
   * @returns {number}
   */
  noteNameToNoteIndex (noteName) {
    switch (noteName) {
      case 'C': return 0
      case 'C#': return 1
      case 'D': return 2
      case 'D#': return 3
      case 'E': return 4
      case 'F': return 5
      case 'F#': return 6
      case 'G': return 7
      case 'G#': return 8
      case 'A': return 9
      case 'A#': return 10
      case 'B': return 11
      default: throw new Error('Invalid note name.')
    }
  }

  /**
   * Convert MIDI note to notation.
   *
   * @param {number} note MIDI Note to convert to notation
   * @returns {string} Notation of MIDI note.
   */
  noteNumberToNotation (note) {
    if (note < 12 || note > 120) {
      throw new Error('Note needs to be between 12 and 119.')
    }
    const noteIndex = note % 12
    const noteName = this.noteIndexToNoteName(noteIndex)
    const octave = Math.floor((note - 12) / 12)
    return noteName + octave
  }

  /**
   * Convert note index to note name.
   *
   * @param {number} noteIndex Note to convert to name, ex. 0 = A, 1 = A#...
   * @returns {string} Note name.
   */
  noteIndexToNoteName (noteIndex) {
    if (noteIndex < 0 || noteIndex > 11) {
      throw new Error('Note index needs to be between 0 and 11.')
    }
    switch (noteIndex) {
      case 0: return 'C'
      case 1: return 'C#'
      case 2: return 'D'
      case 3: return 'D#'
      case 4: return 'E'
      case 5: return 'F'
      case 6: return 'F#'
      case 7: return 'G'
      case 8: return 'G#'
      case 9: return 'A'
      case 10: return 'A#'
      case 11: return 'B'
      default: throw new Error('Note index is out of range.')
    }
  }
}

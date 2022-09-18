const context = new AudioContext()

/**
 * Starts or resumes the Audio Context.
 */
export function start () {
  context.resume()
}

/**
 * Returns the current time including a short look ahead time.
 *
 * @returns {number} Current time
 */
export function now () {
  return context.currentTime + 0.05
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
   * @param {String} type Oscillator type.
   */
  constructor (type) {
    this.oscillator = new OscillatorNode(context, {
      type: type
    })
    this.gainNode = new GainNode(context, { gain: 0 })
    this.oscillator.connect(this.gainNode).connect(context.destination)
    this.oscillator.start()
  }

  /**
   * Plays a note at a specified time.
   *
   * @param {Number} note Which note to play. EX. 48.
   * @param {Number} time Time to play the note.
   */
  play (note, time = now()) {
    // Changes frequency of the oscillator.
    this.oscillator.frequency.setValueAtTime(noteToFrequency(note), time)

    // Cancels any scheduled and ongoing changes to the gain value.
    this.gainNode.gain.cancelScheduledValues(time)

    // Sets the gain to 0.1 at the specified time.
    this.gainNode.gain.setValueAtTime(0.1, time)

    // Ramps the gain to zero linearly one second after the time-
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
 * Convert MIDI note to frequency.
 *
 * @param {Number} note MIDI note to convert to frequency.
 * @returns {Number} Frequency corresponding to the note.
 */
function noteToFrequency (note) {
  // Could be replaced with a look-up-table
  return 440 * 2 ** ((note - 69) / 12)
}

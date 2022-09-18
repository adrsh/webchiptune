const context = new AudioContext()

/**
 * Starts Audio Context.
 */
export function start () {
  context.resume()
}

/**
 * Returns the current time.
 *
 * @returns {number} Current time
 */
export function now () {
  return context.currentTime + 0.05
}

/**
 *
 */
export class Synth {
  oscillator
  gain
  /**
   * Constructor for Synth.
   *
   * @param {String} type Synth type.
   */
  constructor (type) {
    this.oscillator = new OscillatorNode(context, {
      type: type
    })
    this.gain = new GainNode(context, { gain: 0 })
    this.oscillator.connect(this.gain).connect(context.destination)
    this.oscillator.start()
  }

  /**
   * Plays a note at a specified time.
   *
   * @param {Number} time Time to play the note.
   */
  play (time = now()) {
    this.gain.gain.cancelScheduledValues(time)
    this.gain.gain.setValueAtTime(0.1, time)
    this.gain.gain.linearRampToValueAtTime(0, time + 1)
  }

  /**
   * Stops the oscillator.
   */
  stop () {
    this.oscillator.stop()
  }
}

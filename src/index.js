const context = new AudioContext()

/**
 * Starts Audio Context.
 */
export function start () {
  context.resume()
}

/**
 *
 */
export class Synth {
  oscillator
  gain
  /**
   *
   */
  constructor () {
    this.oscillator = new OscillatorNode(context)
    this.gain = new GainNode(context, {
      gain: 0
    })
    this.oscillator.connect(this.gain).connect(context.destination)
  }

  /**
   *
   */
  play (time = context.currentTime) {
    if (this.oscillator) {
      this.gain.gain.cancelScheduledValues(time)
      this.gain.gain.setValueAtTime(0.1, time)
      this.gain.gain.linearRampToValueAtTime(0, time + 1)
    }
  }

  /**
   *
   */
  stop () {
    if (this.oscillator) {
      this.oscillator.stop()
    }
  }
}

/**
 *
 */
export class Square extends Synth {
  /**
   *
   */
  constructor () {
    super()
    this.oscillator.type = 'square'
    this.oscillator.start()
  }
}

/**
 *
 */
export class Sawtooth extends Synth {
  /**
   *
   */
  constructor () {
    super()
    this.oscillator.type = 'sawtooth'
    this.oscillator.start()
  }
}

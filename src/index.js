const context = new AudioContext()

export class SoundMaker {
  constructor () {
    this.context = context
    this.gain = new GainNode(context, {
      gain: 0.5
    })
  }
  start () {
    if (!this.context) {
      this.context = new AudioContext()
    }
  }
}

export class Synth {
  oscillator
  gain
  play () {
    if (this.oscillator) {
      this.oscillator.start()
    }
  }
  stop () {
    if (this.oscillator) {
      this.oscillator.stop()
    }
  }
}

export class Square extends Synth {
  constructor () {
    super()
    this.oscillator = new OscillatorNode(context, {
      type: 'square',
    })
    this.gain = new GainNode(context, {
      gain: 0.1
    })
    this.oscillator.connect(this.gain).connect(context.destination)
  }
}
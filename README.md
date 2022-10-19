# Web Audio Chiptune

Inspired by [music trackers](https://en.wikipedia.org/wiki/Music_tracker) to create chiptune inspired music using the Web Audio API.

## Installation

Put the webchiptune folder in your project.

```js
import * as Chiptune from './webchiptune'
```

## Usage

It is necessary to to start/resume the Audio Context in the browser in order to create any sounds.
This should be ran when a user makes an input (ex. clicks) on the web page or button.

```javascript
Chiptune.start()
```

### Note

Note is used for inputting notes and getting note properties, for example getting note notation from note number, and vice versa.

```js
const note = new Chiptune.Note('C4')
const anotherNote = new Chiptune.Note(60)
```


### Instrument

An instrument can either be ```square```, ```sine```, ```sawtooth``` and ```triangle```.

```js
const instrument = new Chiptune.Instrument('square')
const note = new Chiptune.Note('C4')

instrument.play(note)
```

### Sequence

A sequence is a sequence of notes that can be played with an instrument.

```js
const instrument = new Chiptune.Instrument('square')
const sequence = new Chiptune.Sequence(instrument)

sequence.add(0, 'C4')
sequence.add(1, 'D4')
sequence.play(120)
```

### Pattern

A pattern consists of multiple sequences that is played together.

```js
const square = new Chiptune.Instrument('square')
const melody = new Chiptune.Sequence(square)

const sine = new Chiptune.Instrument('sine')
const bass = new Chiptune.Sequence(sine)

melody.add(0, 'C4')
melody.add(1, 'D4')
bass.add(0, 60)
bass.add(4, 61)

Chiptune.Pattern.add(melody)
Chiptune.Pattern.add(bass)

Chiptune.Pattern.play(120)
```
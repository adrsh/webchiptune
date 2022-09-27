# Web Audio Chiptune

Inspired by [music trackers](https://en.wikipedia.org/wiki/Music_tracker) to create chiptune inspired music using the Web Audio API.

## Installation

Put the src/index.js file in your project folder and rename it to webchiptune.js

```js
import * as Chiptune from './webchiptune'
```

## Usage

It is necessary to to start/resume the Audio Context in the browser in order to create any sounds.
This should be ran when a user makes an input (ex. clicks) on the web page or button.

```javascript
Chiptune.start()
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

# Web Audio Chiptune

Inspired by [music trackers](https://en.wikipedia.org/wiki/Music_tracker) to create chiptune inspired music using the Web Audio API.

## Installation

```bash
npm install 
```

```js
import * as Chiptune from 'webchiptune'
```

## Usage

It is necessary to to start/resume the Audio Context in the browser in order to create any sounds.
This should be ran when a user makes an input on the web page.

```javascript
Chiptune.start()
```
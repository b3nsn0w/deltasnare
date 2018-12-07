# === UNDER CONSTRUCTION ===

Deltasnare is a game state manager that encapsulates the gamecode into a pure, repeatable "delta" function, which transforms the state by exactly one step, one "tick". It is designed for simplicity even for multiplayer games.

## Checklist

**Warning: Deltasnare is in alpha and haven't reached version 1.0.0 yet. Everything is subject to change.**

The currently implemented and planned features are the following:

- **Multiplayer modes**
  - [x] Singleplayer mode
  - [ ] Basic multiplayer
  - [ ] Peer-to-peer multiplayer
- **Networking**
  - [ ] Network core
  - [ ] WebSocket network layer
  - [ ] WebRTC network layer
- **Scaling**
  - [x] Single-chunk core
  - [ ] Multi-chunk core
  - [ ] Simple server
  - [ ] Meshing server
- **Miscellaneous**
  - [x] Timer
  - [x] Connected render loop
  - [x] Interpolation support
  - [ ] Full documentation

# Usage

```javascript
const Deltasnare = require('deltasnare')

// const delta = (state, input, options) => {...}
// const options = {...}

// create the state manager
const deltasnare = new Deltasnare(delta, option)

// listen to tick events, submit the input every tick
deltasnare.on('tick', () => {
  // const input = {...} // check input here
  deltasnare.setInput(input)
})

// const render = (state) => {}

// built-in render loop (emits once every frame) with support for interpolation
deltasnare.on('frame', (state) => {
  render(state)
})

// deltasnare.interpolator = (current, previous, ratio) => {}

// const initialState = {}

// everything is set up, time to start the game
deltasnare.startSingleplayer(initialState)

// alternatively, you can connect to a network instance
// deltasnare.start... that's a TODO
```

**TODO:** finish documentation (sorry)
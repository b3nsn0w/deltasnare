const Deltasnare = require('.')

const delta = (state, inputs, options) => {
  return { foo: state.foo + 1, inputs, seed: options.seed }
}

const deltasnare = new Deltasnare(delta)

deltasnare.startSingleplayer({ foo: 0 })

setInterval(() => {
  console.log(deltasnare.state.current.state)
}, 100)

deltasnare.on('tick', (state, ds) => ds.setInput(Math.random()))

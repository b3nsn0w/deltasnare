const { EventEmitter } = require('events')

const timer = require('@deltasnare/timer')
const SimpleSnare = require('@deltasnare/simple-frontend')

const snares = {
  SimpleSnare
}

class Deltasnare extends EventEmitter {
  constructor (delta, {
    tickrate = 128,
    snare = SimpleSnare,
    snareOptions = {},
    environment = {}
  } = {}) {
    super()

    this.delta = delta

    this.timer = timer(tickrate)

    this.SnareClass = snare
    this.snareOptions = snareOptions
    if (environment) this.snareOptions.environment = environment

    this.state = { current: null, previous: null }

    const renderLoop = () => {
      const { current, previous } = this.state
      if (!current) return window.requestAnimationFrame(renderLoop)

      const ratio = this.timer.getSync() % 1 || 1
      const state = this.interpolator ? this.interpolator(current, previous, ratio, this) : current.state

      this.emit('frame', state, this)
      window.requestAnimationFrame(renderLoop)
    }
    if (typeof window !== 'undefined') renderLoop()
  }

  startSingleplayer (state, tick = 0) {
    this.snare = new this.SnareClass(this.delta, {
      ...this.snareOptions,
      state,
      singleplayer: true,
      startingPoint: tick
    })

    this.timer.start(tick)
    this.connectSnare()
  }

  connectSnare () {
    this.timer.on('tick', tick => this.snare.advanceTo(tick))
    this.snare.on('tick', (current, previous) => {
      this.state = { current, previous }
      this.emit('tick', this.state, this)
    })

    this.emit('ready')
  }

  setInput (...args) {
    this.snare.setInput(...args)
  }
}

Deltasnare.snares = snares

module.exports = Deltasnare

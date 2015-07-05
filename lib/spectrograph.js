// from: https://github.com/web-audio-components/spectrograph/blob/master/index.js

var interpolate = require('./interpolate-color.js')

function Spectrograph (analyser, opts) {
  if (!(this instanceof Spectrograph)) return new Spectrograph(analyser, opts)

  // Defaults
  opts = opts || {}
  var self = this

  this.analyser = analyser
  this.minHsl = [-85, 50, 10]
  this.maxHsl = [-50, 100, 100]
  this.speed = 1

  this.tempCanvas = document.createElement('canvas')
  this.fft = new Uint8Array(this.analyser.frequencyBinCount)

  'speed minHsl maxHsl'.split(' ').forEach(function (prop) {
    if (opts[prop] != null) {
      self[prop] = opts[prop]
    }
  })

  try {
    this.ctx = opts.canvas.getContext('2d')
  } catch (e) {
    throw new Error('Spectrograph must have a valid canvas element')
  }

  window.requestAnimationFrame(function loop () {
    var ctx = self.ctx
    if (ctx.canvas.offsetHeight !== ctx.canvas.height || ctx.canvas.offsetWidth !== ctx.canvas.width) {
      ctx.canvas.height = ctx.canvas.offsetHeight
      ctx.canvas.width = ctx.canvas.offsetWidth
      self.tempCanvas.width = ctx.canvas.width
      self.tempCanvas.height = ctx.canvas.height
    }

    if (self.speed !== 0) {
      if (opts && opts.beforeRender) {
        opts.beforeRender()
      }

      self.analyser.getByteFrequencyData(self.fft)
      process(self)
    }

    window.requestAnimationFrame(loop)
  })
}

function process (mod) {
  var ctx = mod.ctx
  var fft = mod.fft

  var width = ctx.canvas.width
  var height = ctx.canvas.height

  var tempCtx = mod.tempCanvas.getContext('2d')
  tempCtx.drawImage(ctx.canvas, 0, 0, width, height)

  var range = fft.length / 2

  for (var i = 0; i <= height; i++) {
    var logIndex = logScale(i / height * range, fft.length / 2)
    var value = fft[logIndex]

    ctx.fillStyle = interpolate(mod.minHsl, mod.maxHsl, Math.max(0, value - 100) / (255 - 100))
    ctx.fillRect(
      width - mod.speed, height - i,
      mod.speed, 1
    )
  }

  ctx.translate(-mod.speed, 0)
  ctx.drawImage(mod.tempCanvas, 0, 0, width, height, 0, 0, width, height)
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}

/**
 * Exports.
 */

function logScale (index, total, opt_base) {
  var base = opt_base || 2
  var logmax = logBase(total + 1, base)
  var exp = logmax * index / total
  return Math.round(Math.pow(base, exp) - 1)
}

function logBase (val, base) {
  return Math.log(val) / Math.log(base)
}

module.exports = Spectrograph

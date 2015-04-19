// from: https://github.com/web-audio-components/spectrograph/blob/master/index.js

var interpolate = require('./interpolate-color.js');

function Spectrograph (analyser, opts) {
  if (!(this instanceof Spectrograph)) return new Spectrograph(analyser, opts)

  // Defaults
  opts = opts || {};
  var p = this.meta.params;
  var module = this;

  this.analyser = analyser

  this.fft = new Uint8Array(this.analyser.frequencyBinCount);

  'speed minH minS minL maxH maxS maxL'.split(' ').forEach(function (prop) {
    module[prop] = opts[prop] == null ? p[prop].defaultValue : opts[prop];
  });

  try {
    this.ctx = opts.canvas.getContext('2d');
  } catch (e) {
    throw new Error('Spectrograph must have a valid canvas element');
  }

  window.requestAnimationFrame(function loop () {

    if (module.speed !== 0){

      if (opts && opts.beforeRender) {
        opts.beforeRender()
      }

      module.analyser.getByteFrequencyData(module.fft);
      process(module);
    }

    window.requestAnimationFrame(loop)
  })
}

function process (mod) {
  var ctx = mod.ctx;
  var fft = mod.fft;

  if (ctx.canvas.offsetHeight !== ctx.canvas.height || ctx.canvas.offsetWidth !== ctx.canvas.width){
    ctx.canvas.height = ctx.canvas.offsetHeight
    ctx.canvas.width = ctx.canvas.offsetWidth
  }

  var width = ctx.canvas.width;
  var height = ctx.canvas.height;

  var range = fft.length / 2
  var data = ctx.getImageData(0, 0, width, height);
  ctx.putImageData(data, -mod.speed, 0);
  for (var i = 0; i <= range; i++) {

    var logIndex = logScale(i, fft.length / 2)
    var value = fft[logIndex]

    ctx.fillStyle = interpolate(mod.minColor, mod.maxColor, value / 255)
    ctx.fillRect(
      width - mod.speed,
      ~~(height - (height / range * i)),
      mod.speed,
      Math.ceil(height / range) || 1
    );
  }
}

var spectrographProperties = {
  meta: {
    value: {
      name: "spectrograph",
      type: "tool",
      params: {
        speed: {
          min: 1,
          max: 20,
          defaultValue: 4,
          type: "int",
          description: "How many ms between each FFT update"
        },
        minH: {
          min: -360,
          max: 360,
          defaultValue: -85,
          type: "int",
          description: "Hue of the minimum amplitude value"
        },
        minS: {
          min: 0,
          max: 100,
          defaultValue: 50,
          type: "int",
          description: "Saturation of the minimum amplitude value"
        },
        minL: {
          min: 0,
          max: 100,
          defaultValue: 10,
          type: "int",
          description: "Lightness of the minimum amplitude value"
        },
        maxH: {
          min: -360,
          max: 360,
          defaultValue: 50,
          type: "int",
          description: "Hue of the maximum amplitude value"
        },
        maxS: {
          min: 0,
          max: 100,
          defaultValue: 100,
          type: "int",
          description: "Saturation of the maximum amplitude value"
        },
        maxL: {
          min: 0,
          max: 100,
          defaultValue: 100,
          type: "int",
          description: "Lightness of the maximum amplitude value"
        }
      }
    }
  }
};

'minH minS minL maxH maxS maxL'.split(' ').forEach(function (prop) {
  spectrographProperties[prop] = {
    enumerable: true,
    get: function () { return this['_' + prop]; },
    set: function (val) {
      this['_' + prop] = val;
      this.minColor = 'hsl(' +
        this.minH + ', ' + this.minS + '%, ' + this.minL + '%)';
      this.maxColor = 'hsl(' +
        this.maxH + ', ' + this.maxS + '%, ' + this.maxL + '%)';
    }
  }
});

Spectrograph.prototype = Object.create(null, spectrographProperties);

/**
 * Exports.
 */

function logScale(index, total, opt_base) {
  var base = opt_base || 2;
  var logmax = logBase(total + 1, base);
  var exp = logmax * index / total;
  return Math.round(Math.pow(base, exp) - 1);
}

function logBase(val, base) {
 return Math.log(val) / Math.log(base);
}


module.exports = Spectrograph;
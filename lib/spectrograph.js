// from: https://github.com/web-audio-components/spectrograph/blob/master/index.js

var interpolate = require('./interpolate-color.js');

function Spectrograph (context, opts) {
  if (!(this instanceof Spectrograph)) return new Spectrograph(context, opts)

  // Defaults
  opts = opts || {};
  var p = this.meta.params;
  var module = this;

  this.input = context.createScriptProcessor(512, 1, 1);
  this.analyser = this.output = context.createAnalyser(); 
  this.analyser.smoothingTimeConstant = 0

  this.fft = new Uint8Array(this.analyser.frequencyBinCount);

  'speed range minH minS minL maxH maxS maxL'.split(' ').forEach(function (prop) {
    module[prop] = opts[prop] || p[prop].defaultValue;
  });

  try {
    this.ctx = opts.canvas.getContext('2d');
  } catch (e) {
    throw new Error('Spectrograph must have a valid canvas element');
  }

  this.input.connect(this.analyser);
  this.input.onaudioprocess = function loop(e) {
    e.outputBuffer.getChannelData(0).set(e.inputBuffer.getChannelData(0))
    module.analyser.getByteFrequencyData(module.fft);
    process(module);
  };

  this.context = context
  //this.processor.connect(context.destination)

  //window.requestAnimationFrame(loop)
//
  //function loop () {
  //  module.input.getByteFrequencyData(module.fft);
  //  process(module);
  //  window.requestAnimationFrame(loop)
  //}

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

  var range = fft.length / 2;
  var data = ctx.getImageData(0, 0, width, height);
  ctx.putImageData(data, -mod.speed, 0);
  for (var i = 0; i <= range; i++) {

    var logIndex = logScale(i, fft.length / 2);
    var value = fft[logIndex];

    ctx.fillStyle = interpolate(mod.minColor, mod.maxColor, value / 255);
    ctx.fillRect(
      width - mod.speed,
      ~~(height - (height / range * i)),
      mod.speed,
      Math.ceil(height / range) || 1
    );
  }
}

var spectrographProperties = {
  connect: {
    value: function (dest) {
      this.output.connect(dest.input ? dest.input : dest);
      this.processor.connect(dest.input ? dest.input : dest);
    }
  },

  disconnect: {
    value: function () {
      this.output.disconnect();
      this.processor.disconnect();
      this.output.connect(this.processor);
    }
  },

  /**
   * Module parameter metadata.
   */

  meta: {
    value: {
      name: "spectrograph",
      type: "tool",
      params: {
        speed: {
          min: 1,
          max: 20,
          defaultValue: 2,
          type: "int",
          description: "How many ms between each FFT update"
        },
        range: {
          values: [4096, 8192, 11250, 22500],
          defaultValue: 11250,
          type: "enum",
          description: "Max frequency of the analysis"
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
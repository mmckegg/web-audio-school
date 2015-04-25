> Improve the distortion effect by adding a **soft clipping** curve and insert a **bandpass** of `1000` Hz before clipping.

There are a number things we can do to curb the harshness of digital "overdrive".

# Soft Clipping

For a start we could soften the clipping a little using something like this:

```js
shaper.curve = generateCurve(22050) // half of 44100 (sample rate)

function generateCurve(steps){
  var curve = new Float32Array(steps)
  var deg = Math.PI / 180

  for (var i=0;i<steps;i++) {
    var x = i * 2 / steps - 1
    curve[i] = (3 + 10) * x * 20 * deg / (Math.PI + 10 * Math.abs(x))
  }

  return curve
}
```

This cleans up the sound somewhat, and makes it sound a bit clearer.

# A bit of EQ

Clipping does some pretty crazy stuff to low and high frequencies, and things can sound better if we just cut them out.

We can use a `'bandpass'` **BiquadFilterNode** to do that.

You may remember from an earlier lesson that `'bandpass'` attenuates frequencies lower and higher of the specified `'frequency'`. It's kind of like a `'lowpass'` and `'highpass'` combined together.

Sounds best if placed **before the WaveShaperNode** in the signal chain.

```js
var bandpass = audioContext.createBiquadFilter()
bandpass.type = 'bandpass'
bandpass.frequency.value = 5000
bandpass.connect(shaper)
```

# There. Much... better? Maybe.

It all gets a bit subjective from here.

> Improve the distortion effect by adding a **soft clipping** curve and a **high cut** of `5000` Hz.

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

# High Cut

Clipping does some pretty crazy stuff to high frequencies, and things can sound better if we just cut them out.

We can use a `'lowpass'` **BiquadFilterNode** to do that.

# A bit of EQ

If you remember way back to the start of this workshop, we talked about the different kinds of **BiquadFilterNode** types. `'lowpass'`, '`highpass`', '`bandpass`', '`lowshelf`', '``highshelf', '`peaking`', and '`notch`'.

We can pump up the mids a bit, for a more guitar amp like, sound using a `'peaking'` filter.

The `'peaking'` filter boosts all frequencies within a range of the specified `frequency` by the specified `gain` in decibels (dB).

If we wanted to **boost** frequencies near **800 Hz** by **2 dB**:

```js
var mids = audioContext.createBiquadFilter()
mids.type = 'peaking'
mids.frequency.value = 400
mids.gain.value = 10
```

# There. Much... better? Maybe.

It all gets a bit subjective from here.

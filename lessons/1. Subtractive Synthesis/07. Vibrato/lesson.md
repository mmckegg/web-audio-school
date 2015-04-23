> Modify the code on the right so that **each note** has a `5` Hz vibrato of +/- `30` cents.

You can listen to how the audio is supposed to sound by clicking **Play Answer**.

# Modulating Audio Parameters with Nodes

As well as setting the time events manually as in _previous_ lessons, you can use an [AudioNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode) to [modulate the value](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode/connect(AudioParam)).

The easiest way to use this is with an [OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode) with it's [`frequency`](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/frequency) set to something low that we can perceive (`< 20` Hz).

Here we create a simple tremolo effect, where the `gain` will oscillate between **0** and **2** at **5 Hz**.

```js
var amp = audioContext.createGain()
amp.connect(audioContext.destination)
oscillator.connect(amp)

var lfo = audioContext.createOscillator()
lfo.frequency.value = 5
lfo.connect(amp.gain)
```

We also need to remember to **start** and **stop** our `lfo` oscillator accordingly.

```js
// sync start time
oscillator.start(audioContext.currentTime)
lfo.start(audioContext.currentTime)

// sync end time
oscillator.stop(audioContext.currentTime+2)
lfo.stop(audioContext.currentTime+2)
```

# Modulating Pitch

If we want to add a vibrato effect (i.e. pitch modulation) to an oscillator, we can use a similar technique to above, except we'll need to amplify the output of the `lfo` before we connect it to `oscillator.detune`.

This example modulates the `detune` value by **+/- 30 cents** at 2 Hz.

```js
var vibrato = audioContext.createGain()
vibrato.gain.value = 100
vibrato.connect(oscillator.detune)

var lfo = audioContext.createOscillator()
lfo.connect(vibrato)
lfo.frequency.value = 2

lfo.start(audioContext.currentTime)
lfo.stop(audioContext.currentTime+2)
```

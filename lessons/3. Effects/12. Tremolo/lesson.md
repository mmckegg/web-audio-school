# Create a Tremolo Effect

The simple way of creating a tremolo effect is using a GainNode with it's `gain` AudioParam modulated by a low `frequency` OscillatorNode.

```js
var tremolo = audioContext.createGain()
tremolo.connect(audioContext.destination)
tremolo.gain.value = 0 // set base value

var lfo = audioContext.createOscillator()
lfo.type = 'sine'
lfo.frequency.value = 2
lfo.connect(tremolo.gain)
lfo.start(audioContext.currentTime)
```

Now we just have to connect our source nodes to the `tremolo` GainNode:

```js
oscillator.connect(tremolo)
```

You may notice that the tremolo seems to running at **double speed**. If you specified `2` Hz, what you are actually hearing is `4` Hz. This is because the **OscillatorNode** output value is sweeping between `-1` and `+1`. The tremolo `GainNode` is being set to -1 half the time, which is not what we want. This doesn't mute the sound, it actually inverts the phase. 

We'll need to override this behavior somehow.

# Shaping Oscillator Output

This is where the WaveShaperNode can help us. It is pretty simple to use. Create an instance using `audioContext.createWaveShaper()` and connect your oscillator to it. Then connect the WaveShaperNode to the target AudioParam.

```js
var shaper = audioContext.createWaveShaper()
shaper.connect(tremolo.gain)
lfo.connect(shaper)
```

So far, this won't actually make a difference. We need to set the `curve` property. It accepts an instance of Float32Array to map values from **`-1` to `+1`** to any arbitrary range. It will interpolate between all values you specify.

```js
shaper.curve = new Float32Array([0, 8, 10])
```

But for our purposes we just want to go from **`0` to `1`** instead of the default **`-1` to `+1`**:

```js
shaper.curve = new Float32Array([0, 1])
```

# Exercise

> Add a global effect so that the audio output has a `'sine'` shaped tremolo at a rate of `3` Hz.

You can listen to how the audio is supposed to sound by clicking **Play Answer**.

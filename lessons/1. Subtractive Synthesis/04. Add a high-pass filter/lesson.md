> Modify the code on the right so that the audio is **filtered** to **remove** all frequencies **lower** than `10000` Hz. 

You can listen to how the audio is supposed to sound by clicking **Play Answer**.

# Biquad Filter Node

Use the [BiquadFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode) to shape the audio output frequencies.

```js
var filter = audioContext.createBiquadFilter()
filter.connect(audioContext.destination)
oscillator.connect(filter)
```

**Note:** the connect() function acts as a patch from one device (the oscillator or the filter) to another.  You'll see above that we've connected the oscillator to the filter.  If both are connected to the [destination] (output to the speakers, in our case), the unfiltered audio signal will play along with the filtered one.  Along with adding code to create and connect the filter, you'll need to remove (or comment out) a certain line to make sure they connect like so: oscillator --> filter --> destination

The most common [types of filters](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode/type) are `'lowpass'`, `'highpass'`, and `'bandpass'`.


# Connections

The `connect()` function acts as a patch cable from one device (the oscillator or the filter) to another.

In previous lessons, we've been connecting the output of an `OscillatorNode` directly to `audioContext.destination` (which in most cases would be your speakers). But in this lesson, we will instead connect the `OscillatorNode` to the `BiquadFilterNode`, and then finally connect the `BiquadFilterNode` to the destination.

We want this:

```
[oscillator] -> [filter] -> [audioContext.destination]
```

**Note:** In this lesson you will need to remove the existing `oscillator.connect(audioContext.destination)`, otherwise the unfiltered audio signal will play along with the filtered one.

# Lowpass

The lowpass filter is the default type. It allows all signals with a frequency lower than [`frequency`](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode/frequency) to pass and attenuates all signals with higher frequency.

```js
// filter out all frequencies above 500 Hz
filter.type = 'lowpass'
filter.frequency.value = 500
```

# Highpass

Works the same as the lowpass, except the other way around. All signals with a frequency higher than [`frequency`](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode/frequency) are allowed and anything lower is attenuated. 

```js
// filter out all frequencies below 3000 Hz
filter.type = 'highpass'
filter.frequency.value = 3000
```

# Bandpass

Only allows frequencies that are within a certain tolerance of [`frequency`](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode/frequency) specified by [`Q`](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode/Q).

The greater the Q value, the smaller the frequency band.

```js
// filter out all frequencies that are not near 1000 Hz
filter.type = 'bandpass'
filter.frequency.value = 1000
filter.Q.value = 1
```

# [Other filter types](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode/type)

- lowshelf
- highshelf
- peaking
- notch
- allpass

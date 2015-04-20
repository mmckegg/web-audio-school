# Biquad Filter Node

Use the [BiquadFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode) to shape the audio output frequencies.

```js
var filter = audioContext.createBiquadFilter()
filter.connect(audioContext.destination)
oscillator.connect(filter)
```

The most common [types of filters](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode/type) are `'lowpass'`, `'highpass'`, and `'bandpass'`.

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

# Exercise

> Modify the code on the right so that the audio is **filtered** to **pass** all frequencies lower than `10000` Hz . 

You can listen to how the audio is supposed to sound by clicking **Play Answer**.

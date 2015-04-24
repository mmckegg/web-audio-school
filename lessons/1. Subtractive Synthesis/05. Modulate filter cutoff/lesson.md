> Modify the code on the right so that **each note** has a highpass filter that **sweeps** from `10000` Hz to `500` Hz over the `duration` of the sound (linear).

You can listen to how the audio is supposed to sound by clicking **Play Answer**.

# Modulating Audio Parameters

An [AudioParam](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam) can be set to a specific [`value`](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/value) as we did in the previous lesson, but it can also be set to change over time.

Here we will ramp the filter [`frequency`](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode/frequency) from `200` Hz to `6000` Hz over 2 seconds:

```js
filter.frequency.setValueAtTime(200, audioContext.currentTime)
filter.frequency.linearRampToValueAtTime(6000, audioContext.currentTime + 2)
```

# [`setValueAtTime(value, time)`](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/setValueAtTime)

Schedules an instant change to the value of the AudioParam at a precise time, as measured against AudioContext.currentTime.

# [`linearRampToValueAtTime(value, endTime)`](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/linearRampToValueAtTime)

Schedules a gradual linear change in the value of the AudioParam. The change starts at the time specified for the _previous_ event, follows a **linear ramp** to the new value given in the `value` parameter, and reaches the new value at the time given in the `endTime` parameter.

# [`exponentialRampToValueAtTime(value, endTime)`](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/exponentialRampToValueAtTime)

Schedules a gradual exponential change in the value of the AudioParam. The change starts at the time specified for the _previous_ event, follows an **exponential ramp** to the new value given in the `value`parameter, and reaches the new value at the time given in the `endTime` parameter.

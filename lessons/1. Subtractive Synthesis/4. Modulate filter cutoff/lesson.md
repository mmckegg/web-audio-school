# Modulating Audio Parameters

An [AudioParam](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam) can be set to a specific [`value`](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/value) as we did in the previous lesson, but it can also be set to change over time.

Here we will ramp the filter `frequency` from `200` Hz to `6000` Hz over 2 seconds:

```js
filter.frequency.setValueAtTime(10000, audioContext.currentTime)
filter.frequency.linearRampToValueAtTime(500, audioContext.currentTime + 2)
```

# `setValueAtTime(value, time)`

Schedules an instant change to the value of the AudioParam at a precise time, as measured against AudioContext.currentTime.

# `linearRampToValueAtTime(value, endTime)`

Schedules a gradual linear change in the value of the AudioParam. The change starts at the time specified for the _previous_ event, follows a **linear ramp** to the new value given in the `value` parameter, and reaches the new value at the time given in the `endTime` parameter.

# `exponentialRampToValueAtTime(value, endTime)`

Schedules a gradual exponential change in the value of the AudioParam. The change starts at the time specified for the _previous_ event, follows an **exponential ramp** to the new value given in the `value`parameter, and reaches the new value at the time given in the `endTime` parameter.

# `setTargetAtTime(targetValue, startTime, timeConstant)`

Schedules the start of a change to the value of the AudioParam. The change starts at the time specified in `startTime` and **exponentially moves** towards the value given by the target parameter. The **exponential decay rate** is defined by the `timeConstant` parameter, which is a time measured in seconds.

# Exercise

> Modify the code on the right so that **each note** has a highpass filter that **sweeps** from `10000` Hz to `500` Hz over the `duration` of the sound.

You can listen to how the audio is supposed to sound by clicking **Play Answer**.

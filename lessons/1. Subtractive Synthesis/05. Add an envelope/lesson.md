# Gain Node

You can use the [`GainNode`](https://developer.mozilla.org/en-US/docs/Web/API/GainNode) to change the output volume of sounds.

It has a single attribute, an [AudioParam](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam) called [`gain`](https://developer.mozilla.org/en-US/docs/Web/API/GainNode/gain).


```js
var amp = audioContext.createGain()
amp.connect(audioContext.destination)
oscillator.connect(amp)

// halve the output volume
amp.gain.value = 0.5 
```

# Adding attack and release

Just like with `BiquadFilterNode.frequency` in the previous example, we can sweep the value of `amp.gain` over time.

If we want to soften the **"attack"** of the sound (the start), we can sweep the value from `0` to `1` using [`setTargetAtTime(targetValue, startTime, timeConstant)`](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/setTargetAtTime):

```js
amp.gain.value = 0
amp.gain.setTargetAtTime(1, audioContext.currentTime, 0.1)
```

If we want to soften the **"release"** of the sound (the tail end), we can sweep the value back to 0.

Keep in mind that if you are going to add a release envelope to a sound, the sound needs to **keep playing until the release sweep finishes**, otherwise it will just stop.

```js
var endTime = audioContext.currentTime + 2
amp.gain.setTargetAtTime(0, endTime, 0.2)

// provide enough time for the exponential falloff
oscillator.stop(endTime + 2)
```

# Exercise

> Modify the code on the right so that **each note** has an **attack** with a time constant of `0.1` and a **release** with a time constant of `0.2`.

You can listen to how the audio is supposed to sound by clicking **Play Answer**.

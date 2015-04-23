# Delaying an Audio Signal

Here is how you delay an audio signal by **`1` second** using a [DelayNode](https://developer.mozilla.org/en-US/docs/Web/API/DelayNode):

```js
var delay = audioContext.createDelay()
delay.delayTime.value = 1
delay.connect(audioContext.destination)

input.connect(delay)
```

# Creating an Echo Effect

To acheive this effect we'll need to create a feedback loop of audio where each loop is delayed by a certain amount of time. We can use the [DelayNode](https://developer.mozilla.org/en-US/docs/Web/API/DelayNode) to add a delay in the signal path, and a couple instances of [GainNode](https://developer.mozilla.org/en-US/docs/Web/API/GainNode) to hook everything up.

Here we create an echo effect with a delay time of **`1` second`** and a feedback ratio of `0.2` (fast trail off):

```js
var input = audioContext.createGain()
var feedback = audioContext.createGain()
var delay = audioContext.createDelay()

var output = audioContext.createGain()
output.connect(audioContext.destination)

delay.delayTime.value = 1
feedback.gain.value = 0.2 // dangerous when > 1 ;-)

// dry path
input.connect(output)

// wet path
input.connect(delay)

// feedback loop
delay.connect(feedback)
feedback.connect(delay)
feedback.connect(output)
```

# Exercise

> Add a global effect so that the audio output has an **echo** with a **delay time of `0.2` seconds** and a **feedback ratio of `0.6`**.

You can listen to how the audio is supposed to sound by clicking **Play Answer**.

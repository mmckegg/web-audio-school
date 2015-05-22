> Pass this exercise by modifying the code on the right so that the generated frequency is `220` Hz instead of the default `440` Hz. 

You can listen to how the audio is supposed to sound by clicking **Play Answer**.

# Setting Oscillator Frequency (or not)

All oscillator nodes have a property called [`frequency`](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/frequency). 

Although, if you try and set it directly, it will have no effect.

```js
// this doesn't work
oscillator.frequency = 200
```

That's because `oscillator.frequency` is an instance of [AudioParam](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam).

# Audio Params

Most properties on Audio Nodes are instances of [AudioParam](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam). They let you do all kinds of neat things with parameters, such as automation over time, and allow one AudioNode to modulate another's value. 

We will get into more depth later but for now **all you need to know is `param.value = 123`**.

So to set the frequency of the oscillator to `880` Hz, you would do this:

```js
// woo finally something works!
oscillator.frequency.value = 880
```
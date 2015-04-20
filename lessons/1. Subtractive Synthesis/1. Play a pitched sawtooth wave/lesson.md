# Introduction

The [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) provides a powerful and versatile system for controlling audio on the Web, allowing developers to choose audio sources, add effects to audio, create audio visualizations, apply spatial effects (such as panning)  and much more.

We will primarily focus on using the Web Audio API for music, but the concepts here could be applied to game sound and other creative uses.

Before we can do anything we need to create an [**AudioContext**](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext). This is a global object that is available in most modern browsers on _any_ webpage.

```js
var audioContext = new AudioContext()
```

To generate and process sounds using the Web Audio API, you create a series of Nodes that connect together to form a signal path.

![](images/web-audio-api-flowchart.png)

# Generate a simple audio pitch

The [**OscillatorNode**](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode) is particularly useful. It can generate an audio pitch at any frequency and all the basic wave shapes (sine, sawtooth, square, or triangle). 

Use it to synthesize musical sounds, generate sound effects or just for testing things out.

```js
var oscillator = audioContext.createOscillator()
oscillator.start(audioContext.currentTime)
oscillator.stop(audioContext.currentTime + 2) // stop after 2 seconds
```

Connect it to the speakers:

```js
oscillator.connect(audioContext.destination)
```

The code editor to the right has the above code in it already. You can listen to the way it sounds by clicking the 'Play / Verify' button.

# Setting Waveform Shape

You can change the shape of the generated wave by setting the [`oscillator.type`](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/type) property. By default it is set to `'sine'`.

```js
oscillator.type = 'sine'
```

# Setting Pitch

There are two ways of setting pitch. You can specify a frequency or you can set a detune offset in cents.

The [`detune`](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/detune) and [`frequency`](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/frequency) parameters are instances of [`AudioParam`](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam) so cannot be set directly. You need to set them using [`param.value`](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/value).

We will look at AudioParam in more depth in later exercises.

```js
oscillator.frequency.value = 440 // middle A
oscillator.detune.value = 100 // offset by 1 note
```

The frequency defaults to `440` hz which is equivalent to **middle A**.

**To set middle C,** you could either set the frequency to `440 * Math.pow(2, 3/12)` or you could set the detune property to `300` cents. Both work, but detune is a bit simpler to use.


# Exercise

> Pass this exercise by modifying the code on the right so that the sound is a **sawtooth** waveform and playing **middle C**, then press the **Play / Verify** button. 

You can listen to how the audio is supposed to sound by clicking **Play Answer**.

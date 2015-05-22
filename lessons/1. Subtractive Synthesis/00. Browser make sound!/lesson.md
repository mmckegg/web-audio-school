> All you need to do to **pass** this first exercise is add a line of code on the right that changes the oscillator to be a `'sawtooth'` instead of the default **sine** wave then press **Play / Verify**. 

You can listen to how the audio is supposed to sound by clicking **Play Answer**.

# Introduction

The [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) provides a powerful and versatile system for controlling audio on the Web, allowing developers to choose audio sources, add effects to audio, create audio visualizations, apply spatial effects (such as panning)  and much more.

We will **primarily focus on using the Web Audio API for music**, but the concepts here could be applied to game sound and other creative uses.

Before we can do anything we need to create an [**AudioContext**](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext). This is a global object that is available in most modern browsers on _any_ webpage.

```js
var audioContext = new AudioContext()
```

To generate and process sounds using the Web Audio API, you create a series of Nodes that connect together to form a signal path.

![](web-audio-api-flowchart.png)

# Generate a simple audio pitch

The [**OscillatorNode**](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode) is particularly useful. It can generate an **audio pitch** at **any frequency** and **all the basic wave shapes** (sine, sawtooth, square, or triangle). 

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

# Waveform Shape

You can change the shape of the generated wave by setting the [`oscillator.type`](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/type) property. 

By default it is set to `'sine'`. 

Available shapes are `'sine'`, `'triangle'`, `'sawtooth'`, and `'square`'.

```js
oscillator.type = 'square'
```
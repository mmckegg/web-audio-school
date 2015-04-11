The Web Audio API is pretty neat.

Creating an audio context:

```js
var audio = new AudioContext()
```

Making sounds happen:

```js
var oscillator = audio.createOscillator()
oscillator.connect(audio.destination)
oscillator.start(audio.currentTime)
oscillator.stop(audio.currentTime + 2) // stop after 2 seconds
```

Setting audio params.

Audio params vs properties.

`oscillator.type` is a standard property.

`oscillator.detune` and `oscillator.frequency` are AudioParams. We can't set them directly, we need to use `param.value`.
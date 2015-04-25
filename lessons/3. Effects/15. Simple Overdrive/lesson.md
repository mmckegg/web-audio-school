> Add a basic global **overdrive** effect by turning the gain up to `20`, and clipping the signal at **+/- 1**.

# Clipping Audio

Here is the output of a `'triangle'` wave from an **OscillatorNode**:

```
 +1  -|            /\                /\                /\                /\    :
      |           /  \              /  \              /  \              /  \   :
 +.5 -|          /    \            /    \            /    \            /    \  :
      |         /      \          /      \          /      \          /      \ :
  0  -|- - - - /- - - - \- - - - /- - - - \- - - - /- - - - \- - - - /- - - - \:
      |\      /          \      /          \      /          \      /          :
 -.5 -| \    /            \    /            \    /            \    /           :
      |  \  /              \  /              \  /              \  /            :
 -1  -|   \/                \/                \/                \/             :
```

When we add a gain node...

```js
var amp = audioContext.createGain()
amp.gain.value = 10
```

...the amplitude is just multiplied by the `gain` value:

```
 +10 -|            /\                /\                /\                /\    :
  ^   |           /  \              /  \              /  \              /  \   :
  ^  _|          /    \            /    \            /    \            /    \  :
 +1   |         /      \          /      \          /      \          /      \ :
  0  -|- - - - /- - - - \- - - - /- - - - \- - - - /- - - - \- - - - /- - - - \:
 -1  _|\      /          \      /          \      /          \      /          :
  v   | \    /            \    /            \    /            \    /           :
  v   |  \  /              \  /              \  /              \  /            :
 -10 -|   \/                \/                \/                \/             :
```

But if we then connect the GainNode to a WaveShaperNode with a standard curve...

```js
var shaper = audioContext.createWaveShaper()
shaper.curve = new Float32Array([-1, 1])
```

...any audio with amplitude greater than `+1` or less than `-1` is **clipped**:

```
 +10 -|                                                                        :
      |                                                                        :
     _|          ______            ______            ______            ______  :
 +1   |         /      \          /      \          /      \          /      \ :
  0  -|- - - - /- - - - \- - - - /- - - - \- - - - /- - - - \- - - - /- - - - \:
 -1  _|\______/          \______/          \______/          \______/          :
      |                                                                        :
      |                                                                        :
 -10 -|                                                                        :
```

This produces some pretty interesting **audio distortion artifacts**, something like overdrive on a **guitar amp**, but a lot harsher sounding _thanks_ to the digital precision of computers.
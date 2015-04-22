Web Audio School
===

An intro to the **Web Audio API** by a series of self-guided workshops.

We will primarily focus on using the Web Audio API for music, but the concepts here could be applied to game sound and other creative uses.

**WORK IN PROGRESS:** Only Part I is implemented so far!

> This workshop is being built for [CampJS V](http://v.campjs.com/)!

## Try it out here:

[mmckegg.github.io/web-audio-school](http://mmckegg.github.io/web-audio-school/)

## TODO

- Handle user code errors and display in editor
- Part II and III

## Install via [npm](https://www.npmjs.com/package/web-audio-school)

Global install:

```bash
$ npm install web-audio-school -g
```

Start the server:

```
$ web-audio-school
```

Now navigate to [localhost:9966](http://localhost:9966).

## Lesson Overview

### Part I: Subtractive Synthesis

1. Play a pitched sawtooth wave
2. Play a short sequence of notes
3. Add a high-pass filter
4. Modulate filter cutoff
5. Add an envelope
6. Vibrato

### Part II: Working With Samples

7. Decode and play an audio file
8. Set in and out points
9. Looping samples
10. Set sample pitch
11. Play a sequence of pitched samples

### Part III: Effects

12. Tremolo
13. Stereo Tremolo
14. Echo / Delay
15. Dynamics Compression
16. Overdrive (part 1)
17. Overdrive (part 2)
18. Ping Pong Delay
19. Simple Reverb

### Epilogue

20. Drop the Bass

## Coverage

- AudioContext
- AudioBuffer
- AudioParam
- AudioDestinationNode
- OscillatorNode
- AudioBufferSourceNode
- GainNode
- WaveShaperNode
- StereoPannerNode
- ConvolverNode
- BiquadFilterNode
- DelayNode
- DynamicsCompressorNode
- ChannelSplitterNode
- ChannelMergerNode

## Not Yet Covered

- AudioWorker (not yet supported by any browsers)
- ScriptProcessor (deprecated)
- OfflineAudioContext
- AudioListener
- PannerNode
- AnalyserNode

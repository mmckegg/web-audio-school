> Pass this exercise by modifying the code on the right so that the generated frequency is **middle C** instead of the default **middle A**.

You can listen to how the audio is supposed to sound by clicking **Play Answer**.

# Mapping Frequencies to Musical Notes

```
                         -3  -1   1       4   6       9   11
                       -4  -2   0   2   3   5   7   8   10  12
  .___________________________________________________________________________.
  :  | |  |  | | | |  |  | | | | | |  |  | | | |  |  | | | | | |  |  | | | |  :
  :  | |  |  | | | |  |  | | | | | |  |  | | | |  |  | | | | | |  |  | | | |  :
  :  | |  |  | | | |  |  | | | | | |  |  | | | |  |  | | | | | |  |  | | | |  :
<-:  |_|  |  |_| |_|  |  |_| |_| |_|  |  |_| |_|  |  |_| |_| |_|  |  |_| |_|  :->
  :   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   :
  : A | B | C | D | E | F | G | A | B | C | D | E | F | G | A | B | C | D | E :
  :___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___: 
    ^                           ^           ^               ^           ^
  220 Hz                      440 Hz      523.25 Hz       880 Hz     1174.65 Hz
(-1 Octave)                 (middle A)                 (+1 Octave)

```

Chromatic note frequencies are slightly tricky to calculate because the **frequency _doubles_ every octave (12 semitones) you go up**.

Changing the [`frequency`](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/frequency) from `440` to `880` would go **up one octave**, or **+12 semitones**. 

The formula for this is `baseFrequency * Math.pow(2, noteOffset / 12)`.

So if you wanted to transpose from **middle A** up **7** semitones to **E**, you would do the following:

```js
oscillator.frequency.value = 440 * Math.pow(2, 7 / 12) // 659.255...
```

This works going down as well. Here we transpose **down 14 semitones** to **G**:

```js
oscillator.frequency.value = 440 * Math.pow(2, -14 / 12) // 195.998...
```

# A slightly easier way

Instances of OscillatorNode also have a [`detune`](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/detune) [`AudioParam`](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam), which allows you to specify transposes in 100ths of semitones.

So using detune, if you wanted to transpose from **middle A** up **7** semitones to **E**, you would do the following:

```js
oscillator.detune.value = 700 // noteOffset * 100
```

We will be using the detune method for the remainder of this section.

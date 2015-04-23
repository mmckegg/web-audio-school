> Trim the first `2.5` seconds off the sample, then play for `2` seconds.

You can listen to how the audio is supposed to sound by clicking **Play Answer**.

# Trimming Samples

Sometimes the audio file might have extra content that you don't want to play. You can trim the begininning and end by passing extra arguments to `player.start`.

In this example we'll only play the first `2` seconds of the file:

```
player.start(startTime, 0, 2)
```

Or we could start `4` seconds into the file and play to the end:

```
player.start(startTime, 4)
```

var AudioMatch = require('./audio-match')

module.exports = function(audioContext) {

  var duration = 2
  var runAnswer = null
  var run = null
  var fails = 0

  var audioMatch = AudioMatch(audioContext)

  var lastAnswerOutput = null
  var lastOutput = null
  var verifyTimer = null
  var verifyInterval = null
  var verifyCb = null
  var verifyAnswerCb = null

  var analyser = audioContext.createAnalyser()
  var answerAnalyser = audioContext.createAnalyser()

  var toAnalyser = signalEndDelay(analyser, 1)
  var toAnswerAnalyser = signalEndDelay(answerAnalyser, 1)

  analyser.connect(audioMatch.inputA)
  answerAnalyser.connect(audioMatch.inputB)

  analyser.smoothingTimeConstant = 0.01
  answerAnalyser.smoothingTimeConstant = 0.01

  // let's not deafen everyone...
  var output = audioContext.createDynamicsCompressor()
  output.connect(audioContext.destination)

  var playback = audioContext.createGain()
  playback.connect(output)
  playback.gain.value = 0.6



  return {

    getAnalyser: function() {
      return analyser
    },

    getAnswerAnalyser: function() {
      return answerAnalyser
    },

    checkMatch: function() {
      return audioMatch.checkMatch()
    },

    checkSignal: function() {
      return audioMatch.checkSignal()
    },

    setDuration: function(seconds) {
      duration = seconds
    },

    setAnswer: function(src) {
      runAnswer = new Function('AudioContext', src)
    },

    set: function(src) {
      try {
        run = new Function('AudioContext', src)
      } catch (ex){
        // syntax error
      }
    },

    playAnswer: function(cb) {
      stop()

      var answerOutput = audioContext.createGain()
      lastAnswerOutput = answerOutput

      answerOutput.connect(playback)
      answerOutput.connect(toAnswerAnalyser)

      runAnswer(wrapAudioContext(audioContext, answerOutput))

      verifyAnswerCb = function(){
        verifyAnswerCb = null
        cb&&cb()
      }

      verifyTimer = setTimeout(verifyAnswerCb, (duration + 0.1) * 1000)
    },

    verify: function(cb) {
      stop()

      var output = audioContext.createGain()
      var answerOutput = audioContext.createGain()
      fails = 0

      output.connect(playback)
      output.connect(toAnalyser)

      answerOutput.connect(toAnswerAnalyser)

      lastOutput = output
      lastAnswerOutput = answerOutput

      audioMatch.reset()

      // sync audio contexts
      var startTime = audioContext.currentTime + 0.1

      try {
        run(wrapAudioContext(audioContext, output, startTime))
      } catch (ex) {
        process.nextTick(function(){
          cb&&cb(ex)
        })
        return false
      }

      runAnswer(wrapAudioContext(audioContext, answerOutput, startTime))

      verifyCb = function(){
        clearInterval(verifyInterval)
        cb&&cb(null, fails < 2)
        verifyCb = null
      }

      verifyInterval = setInterval(function(){
        if (!audioMatch.checkMatch()){
          console.log('fail', audioContext.currentTime)
          fails += 1
        }
      }, 60)

      verifyTimer = setTimeout(verifyCb, (duration + 0.2) * 1000)
    },

    stop: stop
  }

  function stop() {
    if (lastOutput) {
      lastOutput.disconnect()
      lastOutput = null
    }

    if (lastAnswerOutput) {
      lastAnswerOutput.disconnect()
      lastAnswerOutput = null
    }

    fails += 100

    verifyCb&&verifyCb()
    verifyAnswerCb&&verifyAnswerCb()

    clearInterval(verifyInterval)
    clearTimeout(verifyTimer)
  }
}

function wrapAudioContext(audioContext, output, startTime) {
  return function AudioContext() {
    return {
      createDelay: audioContext.createDelay.bind(audioContext),
      createBufferSource: audioContext.createBufferSource.bind(audioContext),
      createStereoPanner: audioContext.createStereoPanner.bind(audioContext),
      createWaveShaper: audioContext.createWaveShaper.bind(audioContext),
      decodeAudioData: audioContext.decodeAudioData.bind(audioContext),
      createOscillator: audioContext.createOscillator.bind(audioContext),
      createChannelMerger: audioContext.createChannelMerger.bind(audioContext),
      createBiquadFilter: audioContext.createBiquadFilter.bind(audioContext),
      createGain: audioContext.createGain.bind(audioContext),
      createConvolver: audioContext.createConvolver.bind(audioContext),
      get currentTime() {
        // for sync between audio contexts
        return Math.max(startTime||0, audioContext.currentTime)
      },
      destination: output
    }
  }
}

function signalEndDelay(target, delayTime) {
  var signal = target.context.createGain()

  var delay = target.context.createDelay(delayTime)
  delay.delayTime.value = delayTime

  var mute = target.context.createWaveShaper()
  var curve = new Float32Array([0, 0])
  mute.curve = curve

  signal.connect(delay)
  delay.connect(mute)
  mute.connect(target)
  signal.connect(target)

  return signal
}

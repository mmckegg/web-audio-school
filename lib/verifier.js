var AudioMatch = require('./audio-match')
var silence = new Float32Array([0,0])

module.exports = function(audioContext) {

  var duration = 2
  var runAnswer = null
  var run = null

  var audioMatch = AudioMatch(audioContext)

  var lastAnswerOutput = null
  var lastOutput = null
  var verifyTimer = null
  var verifyInterval = null
  var verifyCb = null
  var verifyAnswerCb = null

  var analyser = audioContext.createAnalyser()
  var answerAnalyser = audioContext.createAnalyser()

  analyser.smoothingTimeConstant = 0.01
  answerAnalyser.smoothingTimeConstant = 0.01

  var live = getSilence(audioContext)
  live.start()

  var playback = audioContext.createGain()
  playback.connect(audioContext.destination)
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

    setDuration: function(seconds) {
      duration = 2
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

      // ensure signal, even when no connected nodes
      live.connect(answerOutput)

      answerOutput.connect(playback)
      answerOutput.connect(answerAnalyser)

      runAnswer(wrapAudioContext(audioContext, answerOutput))

      verifyAnswerCb = function(){
        verifyAnswerCb = null
        cb&&cb()
      }

      verifyTimer = setTimeout(verifyAnswerCb, (duration + 0.2) * 1000)
    },

    verify: function(cb) {
      stop()

      var output = audioContext.createGain()
      var answerOutput = audioContext.createGain()
      var pass = true

      // ensure signal, even when no connected nodes
      live.connect(output)
      live.connect(answerOutput)

      output.connect(playback)
      output.connect(analyser)
      output.connect(audioMatch.inputA)

      answerOutput.connect(answerAnalyser)
      answerOutput.connect(audioMatch.inputB)

      lastOutput = output
      lastAnswerOutput = answerOutput

      try {
        run(wrapAudioContext(audioContext, output))
      } catch (ex) {
        cb&&cb(ex)
        return false
      }

      runAnswer(wrapAudioContext(audioContext, answerOutput))

      verifyCb = function(){
        clearInterval(verifyInterval)
        cb&&cb(null, pass)
        verifyCb = null
      }

      verifyInterval = setInterval(function(){
        if (!audioMatch.checkMatch()){
          pass = false
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

    verifyCb&&verifyCb()
    verifyAnswerCb&&verifyAnswerCb()

    live.disconnect()

    clearInterval(verifyInterval)
    clearTimeout(verifyTimer)
  }
}

function wrapAudioContext(audioContext, output) {
  return function AudioContext() {
    return {
      createOscillator: audioContext.createOscillator.bind(audioContext),
      createGain: audioContext.createGain.bind(audioContext),
      get currentTime() {
        return audioContext.currentTime
      },
      destination: output
    }
  }
}

function getSilence(context){
  var voltage = context.createBufferSource()
  var buffer = context.createBuffer(1, 2, context.sampleRate)
  buffer.getChannelData(0).set(silence)
  voltage.buffer = buffer
  voltage.loop = true
  return voltage
}

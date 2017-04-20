var watch = require('observ/watch')
var EditorWidget = require('../lib/editor')
var Spectrograph = require('../lib/spectrograph')
var Verifier = require('../lib/verifier')
var h = require('micro-css/h')(require('hyperscript'))
var markdown = require('../lib/markdown')
var send = require('../lib/send')

module.exports = LessonView

function LessonView (state, lesson) {
  var audio = state.audioContext
  var editor = EditorWidget(lesson.file, verify)

  var verifier = Verifier(audio)
  watch(lesson.file, verifier.set)
  watch(lesson.verifyTime, verifier.setDuration)
  watch(lesson.answer, verifier.setAnswer)

  var canvas = h('canvas')
  var answerCanvas = h('canvas')
  var stopOnNoSignal = false

  var spectrograph = Spectrograph(verifier.getAnalyser(), {
    canvas: canvas,
    beforeRender: checkMatch,
    speed: 0,
    minHsl: [-50, 0, 10]
  })

  var answerSpectrograph = Spectrograph(verifier.getAnswerAnalyser(), {
    canvas: answerCanvas,
    speed: 0,
    minHsl: [200, 0, 10]
  })

  function checkMatch () {
    if (stopOnNoSignal) {
      spectrograph.maxHsl = [0, 100, 50]
      spectrograph.minHsl = [0, 40, 10]

      if (!verifier.checkSignal()) {
        player.classList.remove('-playing')
        stopOnNoSignal = false
        spectrograph.speed = 0
      }

    } else if (verifier.checkMatch()) {
      spectrograph.maxHsl = [100, 100, 100]
      spectrograph.minHsl = [200, 0, 10]
    } else {
      spectrograph.maxHsl = [50, 0, 50]
      spectrograph.minHsl = [-50, 0, 10]
    }
  }

  var resetButton = h('button.reset', { onclick: lesson.reset }, ['Reset Code'])

  var player = h('Player', [
    h('header', [ 'Your Audio' ]),
    h('div', [
      canvas,
      h('button.run', { onclick: verify }, ['Play / Verify']),
      h('button.stop', { onclick: verifier.stop }, 'Stop'),
      resetButton
    ])
  ])

  var lessonElement = h('Lesson', [
    h('header', [
      h('h1', lesson.title()),
      h('nav', [
        h('button -index', { onclick: send(state.view.set, 'index') }, 'Index'),
        h('button -prev', { onclick: state.prevLesson }, 'Prev'),
        h('button -next', { onclick: state.nextLesson }, 'Next')
      ])
    ]),
    markdownElement(lesson.lesson())
  ])

  watch(state.verifiedLessons, function () {
    if (state.verifiedLessons.has(lesson.path())) {
      player.classList.add('-verified')
      lessonElement.classList.add('-verified')
    } else {
      player.classList.remove('-verified')
      lessonElement.classList.remove('-verified')
    }
  })

  watch(lesson.modified, function (modified) {
    if (modified) {
      player.classList.add('-modified')
    } else {
      player.classList.remove('-modified')
    }
  })

  var answerPlayer = h('Player', [
    h('header', [ 'Target Audio' ]),
    h('div', [
      answerCanvas,
      h('button.run', { onclick: playAnswer }, 'Play Answer'),
      h('button.stop', { onclick: verifier.stop }, 'Stop')
    ])
  ])

  var result = h('Main', [
    h('div.side', [
      lessonElement,
      answerPlayer
    ]),
    h('div.editor', [
      editor.init(),
      player
    ])
  ])

  result.destroy = function () {
    verifier.stop()
  }

  return result

  // scoped

  function markdownElement (md) {
    var el = h('div')
    el.innerHTML = markdown.render(md)
    return el
  }

  function playAnswer () {
    verifier.playAnswer(function () {
      answerSpectrograph.speed = 0
      answerPlayer.classList.remove('-playing')
    })

    answerPlayer.classList.add('-playing')
    answerSpectrograph.speed = 3
    answerSpectrograph.maxHsl = [200, 100, 100]
    answerSpectrograph.minHsl = [150, 0, 10]
  }

  function verify () {
    player.classList.remove('-error')
    player.firstChild.innerHTML = 'Your Audio' // reset audio/error message

    verifier.verify(function (err, pass) {
      player.classList.remove('-playing')
      spectrograph.speed = 0
      answerSpectrograph.speed = 0

      if (err) {
        player.classList.add('-error')
        if (err instanceof Error) {
          player.firstChild.innerHTML = err.message;
          console.log(err.message + '\n' + err.stack)
        } else {
          console.log(err)
        }
      } else if (pass) {
        state.verifiedLessons.add(lesson.path())
      } else {
        state.verifiedLessons.remove(lesson.path())

        if (verifier.checkSignal()) {
          spectrograph.speed = 3
          stopOnNoSignal = true
          player.classList.add('-playing')
        }
      }

    })

    player.classList.add('-playing')
    stopOnNoSignal = false
    spectrograph.speed = 3
    answerSpectrograph.speed = 3
    answerSpectrograph.maxHsl = [250, 10, 50]
    answerSpectrograph.minHsl = [200, 0, 10]
  }
}

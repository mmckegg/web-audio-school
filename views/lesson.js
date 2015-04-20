var watch = require('observ/watch')
var EditorWidget = require('../lib/editor')
var Spectrograph = require('../lib/spectrograph')
var Verifier = require('../lib/verifier')
var h = require('micro-css/h')(require('hyperscript'))
var markdown = require('../lib/markdown')

module.exports = LessonView

function LessonView(state, lesson) {
  var audio = state.audioContext
  var editor = EditorWidget(lesson.file, verify)

  var verifier = Verifier(audio)
  watch(lesson.file, verifier.set)
  watch(lesson.verifyTime, verifier.setDuration)
  watch(lesson.answer, verifier.setAnswer)

  var canvas = h('canvas')
  var answerCanvas = h('canvas')

  var spectrograph = Spectrograph(verifier.getAnalyser(), { 
    canvas: canvas, 
    beforeRender: checkMatch,
    speed: 0,
    minL: 10,
    minS: 0
  })

  var answerSpectrograph = Spectrograph(verifier.getAnswerAnalyser(), { 
    canvas: answerCanvas,
    speed: 0,
    minL: 10,
    minS: 0
  })

  function checkMatch(){
    if (verifier.checkMatch()){
      spectrograph.maxH = 100
      spectrograph.minH = 200
      spectrograph.maxL = 100
      spectrograph.maxS = 100
    } else {
      spectrograph.maxH = 50
      spectrograph.minH = -80
      spectrograph.maxL = 50
      spectrograph.maxS = 0
    }
  }

  var resetButton = h('button.reset', { onclick: lesson.reset }, ['Reset Code'])

  var player = h('Player', [
    h('header', [ 'Your Audio' ]),
    h('div', [
      canvas,
      h('button.run', { onclick: verify }, ['Play / Verify']),
      resetButton
    ])
  ])

  var lessonElement = h('Lesson', [
    h('header', [
      h('h1', lesson.title()),
      h('nav', [
        h('button -index', 'Index'),
        h('button -prev', { onclick: state.prevLesson }, 'Prev'),
        h('button -next', { onclick: state.nextLesson }, 'Next')
      ]),
    ]),
    markdownElement(lesson.lesson())
  ])

  watch(state.verifiedLessons, function() {
    if (state.verifiedLessons.has(lesson.path())) {
      player.classList.add('-verified')
      lessonElement.classList.add('-verified')
    } else {
      player.classList.remove('-verified')
      lessonElement.classList.remove('-verified')
    }
  })

  watch(lesson.modified, function(modified) {
    if (modified) {
      player.classList.add('-modified')
    } else {
      player.classList.remove('-modified')
    }
  })

  return h('Main', [
    h('div.side', [
      lessonElement,
      h('Player', [
        h('header', [ 'Target Audio' ]),
        h('div', [
          answerCanvas,
          h('button.run', { onclick: playAnswer }, 'Play Answer')
        ])
      ])
    ]),
    h('div.editor', [
      editor.init(),
      player
    ])
  ])

  // scoped

  function markdownElement(md){
    var el = h('div')
    el.innerHTML = markdown.render(md)
    return el
  }

  function playAnswer(){
    verifier.playAnswer(function() {
      answerSpectrograph.speed = 0
    })

    answerSpectrograph.speed = 3
    answerSpectrograph.maxH = 200
    answerSpectrograph.minH = 150
    answerSpectrograph.maxS = 100
    answerSpectrograph.maxL = 100
  }

  function verify() {
    player.classList.remove('-error')

    verifier.verify(function(err, pass) {
      if (err) {
        player.classList.add('-error')
        throw err
      } else if (pass){
        state.verifiedLessons.add(lesson.path())
      } else {
        state.verifiedLessons.remove(lesson.path())
      }

      spectrograph.speed = 0
      answerSpectrograph.speed = 0
    })

    spectrograph.speed = 3
    answerSpectrograph.speed = 3
    answerSpectrograph.maxH = 250
    answerSpectrograph.minH = 200
    answerSpectrograph.maxL = 50
    answerSpectrograph.maxS = 10
  }
}
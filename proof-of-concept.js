var insertCss = require('insert-css')
var Observ = require('observ')
var watch = require('observ/watch')
var EditorWidget = require('./lib/editor')
var Spectrograph = require('./lib/spectrograph')
var Verifier = require('./lib/verifier')
var h = require('micro-css/h')(require('hyperscript'))

// markdown
var hljs = require('highlight.js')
var iterator = require('markdown-it-for-inline');
var markdown = require('markdown-it')({
  linkify: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (__) {}

    return ''; // use external default escaping
  }
}).use(iterator, 'url_new_win', 'link_open', function (tokens, idx) {
  tokens[idx].attrPush([ 'target', '_blank' ]);
})

// styles
var css = require('./styles')
insertCss(css)

// lessons
var lessons = require('./lessons')
var current = ['1. Subtractive Synthesis', '1. Play a pitched sawtooth wave']
var lastOutput = null
var lastAnswerOutput = null

var audio = new AudioContext()

var lesson = {
  name: current[1],
  verifyTime: 2.1,
  lesson: lessons[current[0]][current[1]]['lesson.md'],
  answer: lessons[current[0]][current[1]]['answer.js'],
  start: lessons[current[0]][current[1]]['start.js']
}

var file = Observ(lesson.start)
var editor = EditorWidget(file)
var verifier = Verifier(audio)
verifier.setAnswer(lesson.answer)
watch(file, verifier.set)

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

var player = h('Player', [
  h('header', [ 'Your Audio' ]),
  h('div', [
    canvas,
    h('button.run', { onclick: verify }, ['Play / Verify'])
  ])
])

var lessonElement = h('Lesson', [
  h('header', [
    h('h1', lesson.name),
    h('nav', [
      h('button -index', 'Index'),
      h('button -prev', 'Prev'),
      h('button -next', 'Next')
    ]),
  ]),
  markdownElement(lesson.lesson)
])


var main = h('Main', [
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

document.body.appendChild(main)

function markdownElement(md){
  var el = h('div')
  el.innerHTML = markdown.render(lesson.lesson)
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
      player.classList.add('-verified')
      lessonElement.classList.add('-verified')
    } else {
      player.classList.remove('-verified')
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

window.save = function() {
  verify()
}
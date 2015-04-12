var insertCss = require('insert-css')
var Observ = require('observ')
var EditorWidget = require('./lib/editor')
var Spectrograph = require('./lib/spectrograph')
var AudioMatch = require('./lib/audio-match')
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
var audioMatch = AudioMatch(audio)

var lesson = {
  name: current[1],
  verifyTime: 2.1,
  lesson: lessons[current[0]][current[1]]['lesson.md'],
  answer: lessons[current[0]][current[1]]['answer.js'],
  start: lessons[current[0]][current[1]]['start.js']
}

var file = Observ(lesson.start)
var answer = Observ(lesson.answer)
var editor = EditorWidget(file)
var verifyTimer = null
var verifyInterval = null

var canvas = h('canvas')
var answerCanvas = h('canvas')

var spectrograph = Spectrograph(audio, { canvas: canvas, beforeRender: checkMatch })
var answerSpectrograph = Spectrograph(audio, { canvas: answerCanvas })

spectrograph.speed = 0
answerSpectrograph.speed = 0
answerSpectrograph.minL = 10
spectrograph.minL = 10

answerSpectrograph.minS = 0
spectrograph.minS = 0


function checkMatch(){
  if (audioMatch.checkMatch()){
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
    h('button.run', { onclick: play }, ['Play / Verify'])
  ])
])


var main = h('Main', [
  h('div.side', [
    h('Lesson', [
      h('h1', lesson.name),
      markdownElement(lesson.lesson)
    ]),
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

function play(){

  stop()

  spectrograph.speed = 4
  answerSpectrograph.speed = 4

  answerSpectrograph.maxH = 250
  answerSpectrograph.minH = 200
  answerSpectrograph.maxL = 50
  answerSpectrograph.maxS = 10

  var answerOutput = audio.createGain()
  var output = audio.createGain()
  output.connect(audio.destination)
  output.gain.value = 0.5
  output.connect(spectrograph.input)
  output.connect(audioMatch.inputA)

  answerOutput.gain.value = 0.5
  answerOutput.connect(answerSpectrograph.input)
  answerOutput.connect(audioMatch.inputB)

  lastOutput = output
  lastAnswerOutput = answerOutput

  var run = new Function('AudioContext', file())
  var runAnswer = new Function('AudioContext', answer())

  runAnswer(wrapAudioContext(answerOutput))

  try {
    run(wrapAudioContext(output))
  } catch (err) {
    console.log('ERROR:', err)
  }

  verify(lesson.verifyTime)
}

function playAnswer(){
  stop()

  answerSpectrograph.speed = 4

  answerSpectrograph.maxH = 200
  answerSpectrograph.minH = 150
  answerSpectrograph.maxS = 100
  answerSpectrograph.maxL = 100

  var answerOutput = audio.createGain()
  answerOutput.gain.value = 0.5
  answerOutput.connect(answerSpectrograph.input)
  answerOutput.connect(audioMatch.inputB)
  answerOutput.connect(audio.destination)

  var runAnswer = new Function('AudioContext', answer())
  runAnswer(wrapAudioContext(answerOutput))

  verify(lesson.verifyTime)
}


function stop(){
  if (lastOutput){
    lastOutput.disconnect()
    lastAnswerOutput.disconnect()
    lastOutput = null
    lastAnswerOutput = null
  }

  clearInterval(verifyInterval)
  clearTimeout(verifyTimer)
}

function wrapAudioContext(output){
  return function AudioContext() {
    return {
      createOscillator: audio.createOscillator.bind(audio),
      createGain: audio.createGain.bind(audio),
      get currentTime(){
        return audio.currentTime
      },
      destination: output
    }
  }
}

function verify(time){
  
  var pass = true

  verifyInterval = setInterval(function(){
    if (!audioMatch.checkMatch()){
      pass = false
    }
  }, 50)

  verifyTimer = setTimeout(function(){
    clearInterval(verifyInterval)
    if (pass){
      player.classList.add('-verified')
    } else {
      player.classList.remove('-verified')
    }

    spectrograph.speed = 0
    answerSpectrograph.speed = 0
  }, (time || 2) * 1000)
}

window.play = play
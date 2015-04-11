var insertCss = require('insert-css')
var Observ = require('observ')
var EditorWidget = require('./lib/editor')
var Spectrograph = require('./lib/spectrograph')
var h = require('micro-css/h')(require('hyperscript'))

// markdown
var hljs = require('highlight.js')
var markdown = require('markdown-it')({
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
})

// styles
var css = require('./styles')
insertCss(css)

// lessons
var lessons = require('./lessons')
var current = ['1. Subtractive Synthesis', '1. Play a pitched sawtooth wave']
var lastOutput = null

var audio = new AudioContext()

var lesson = {
  name: current[1],
  lesson: lessons[current[0]][current[1]]['lesson.md'],
  answer: lessons[current[0]][current[1]]['answer.js'],
  start: lessons[current[0]][current[1]]['start.js']
}

var file = Observ(lesson.start)
var editor = EditorWidget(file)

var canvas = h('canvas')
var spectrograph = Spectrograph(audio, { canvas: canvas })

var main = h('Main', [
  h('div.side', [
    h('Lesson', [
      h('h1', lesson.name),
      markdownElement(lesson.lesson)
    ])
  ]),
  h('div.editor', [
    editor.init(),
    h('Player', [
      h('button.run', { onclick: play }),
      canvas
    ])
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

  var output = audio.createGain()
  output.connect(audio.destination)
  output.gain.value = 0.5
  output.connect(spectrograph.input)

  lastOutput = output

  var run = new Function('AudioContext', file())

  try {
    run(function(){
      // wrap audio context destination
      return {
        createOscillator: audio.createOscillator.bind(audio),
        createGain: audio.createGain.bind(audio),
        get currentTime(){
          return audio.currentTime
        },
        destination: output
      }
    })
  } catch (err) {
    console.log('ERROR:', err)
  }
}

function stop(){
  if (lastOutput){
    lastOutput.disconnect()
    lastOutput = null
  }
}

window.play = play
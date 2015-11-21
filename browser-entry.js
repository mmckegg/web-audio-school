// safari support
require('stereo-panner-node').polyfill()
window.AudioContext = window.AudioContext || window.webkitAudioContext

var insertCss = require('insert-css')
var watch = require('observ/watch')

var css = require('./styles')
insertCss(css)

var state = require('./state')
var LessonView = require('./views/lesson')
var IndexView = require('./views/index')

// set persistance prefix
state.workshop.set('web-audio')

var lastElement = null
var lastView = null
var lastLesson = null

watch(state, function refreshView () {
  var element = null
  if (state.view() === 'lesson') {
    if (lastLesson !== state.selectedLesson() || lastView !== 'lesson') {
      lastLesson = state.selectedLesson()
      var lesson = state.getLesson(state.selectedLesson())
      if (lesson) {
        element = LessonView(state, lesson)
        setView(element)
      } else {
        state.view.set('index')
      }
    }
  } else if (state.view() !== lastView) {
    element = IndexView(state)
    setView(element)
    scrollSelectedIntoView()
  }
  lastView = state.view()
})

function scrollSelectedIntoView () {
  var selected = document.querySelector('.-selected')
  if (selected) {
    if (selected.scrollIntoViewIfNeeded) {
      selected.scrollIntoViewIfNeeded()
    } else if (selected.scrollIntoView) {
      selected.scrollIntoView(false)
    }
  }
}

function setView (element) {
  if (lastElement) {
    lastElement.destroy && lastElement.destroy()
    lastElement.remove()
  }
  document.body.appendChild(element)
  lastElement = element
}

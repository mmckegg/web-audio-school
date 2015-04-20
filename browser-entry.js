var insertCss = require('insert-css')
var watch = require('observ/watch')

var css = require('./styles')
insertCss(css)

var state = require('./state')
var LessonView = require('./views/lesson')
var IndexView = require('./views/index')

var lastElement = null
var lastView = null
var lastLesson = null

// state.selectedLesson.set('1. Subtractive Synthesis/1. Play a pitched sawtooth wave')
// state.selectedLesson.set('1. Subtractive Synthesis/2. Play a short sequence of notes')

state.view.set('lesson')

watch(state, function refreshView() {
  if (lastView !== state.view()) {
    if (state.view() === 'lesson') {
      if (lastLesson !== state.selectedLesson()) {
        lastLesson = state.selectedLesson()
        var lesson = state.getLesson(state.selectedLesson())
        var element = LessonView(state, lesson)
        setView(element)
      }
    } else {
      var element = IndexView(state)
      element(element)
    }
  }
})

function setView(element) {
  if (lastElement) {
    lastElement.destroy&&lastElement.destroy()
    lastElement.remove()
  }
  document.body.appendChild(element)
  lastElement = element
}
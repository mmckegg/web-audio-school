var h = require('micro-css/h')(require('hyperscript'))
var send = require('../lib/send')

module.exports = IndexView

function IndexView(state) {
  return h('Index', [
    h('header', [ 'Web Audio School']),
    h('div', [
      h('ul', state.lessons().map(function(group) {
        return h('li', [
          h('h1', [ group.name ]),
          h('ul', group.lessons.map(function(lesson) {
            var classes = []
            if (state.verifiedLessons.has(lesson.path)) {
              classes.push('-verified')
            }
            return h('li', {
              onclick: send(state.viewLesson, lesson.path), 
              tabIndex: 0, 
              className: classes.join(' ') 
            }, [ lesson.title ])
          }))
        ])
      }))
    ])
  ])
}
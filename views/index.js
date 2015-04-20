var h = require('micro-css/h')(require('hyperscript'))
var send = require('../lib/send')

module.exports = IndexView

function IndexView(state) {
  return h('Index', [
    h('header', [ h('span.main', 'Web Audio School'), h('span', ['v', state.version])]),
    h('div', [
      h('ul', state.lessons().map(function(group) {
        return h('li', [
          h('h1', [ removeNumber(group.name) ]),
          h('ul', group.lessons.map(function(lesson) {
            var classes = []
            
            if (state.verifiedLessons.has(lesson.path)) {
              classes.push('-verified')
            }

            if (state.selectedLesson() === lesson.path) {
              classes.push('-selected')
            }

            return h('li', {
              onclick: send(state.viewLesson, lesson.path), 
              tabIndex: 0, 
              className: classes.join(' ') 
            }, [ lesson.title ])
          }))
        ])
      }))
    ]),
    h('div.info', [
      h('p', [ 'The verifier currently only works in Chrome at the moment :(']),
      h('p', [ 'More lessons coming soon!' ]),
      h('p', [ 
        h('a', { 
          href: 'https://github.com/mmckegg/web-audio-school' 
        }, ['github.com/mmckegg/web-audio-school' ]) 
      ])
    ])
  ])
}

function removeNumber(text) {
  var match = /^([0-9]+\. )(.+)$/.exec(text)
  return match && match[2] || text
}
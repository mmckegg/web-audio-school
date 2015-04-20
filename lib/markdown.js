var hljs = require('highlight.js')
var iterator = require('markdown-it-for-inline')

module.exports = require('markdown-it')({
  linkify: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }

    try {
      return hljs.highlightAuto(str).value
    } catch (__) {}

    return ''
  }
}).use(iterator, 'url_new_win', 'link_open', function (tokens, idx) {
  tokens[idx].attrPush([ 'target', '_blank' ]);
})


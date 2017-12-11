#!/usr/bin/env node
var exec = require('child_process').exec
var opn = require('opn');

process.chdir(__dirname)
var runner = exec('npm start')

console.log('Starting server...')
setTimeout(function () {
  console.log('Go to http://localhost:9966')
  opn('http://localhost:9966')
  runner.stdout.pipe(process.stdout)
  runner.stderr.pipe(process.stderr)
}, 2000)

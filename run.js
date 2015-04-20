#!/usr/bin/env node
var path = require('path')
var exec = require('child_process').exec

process.chdir(__dirname)
var runner = exec('npm start')

console.log('Starting server...')
setTimeout(function(){
  console.log('Go to http://localhost:9966')
  exec('open http://localhost:9966')
  runner.stdout.pipe(process.stdout)
  runner.stderr.pipe(process.stderr)
}, 2000)
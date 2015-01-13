'use strict'

var $ = require('jquery')
var tracking = require('tracking')
var face = require('face')
var eye = require('eye')
var mouth = require('mouth')

window.onload = function() {
  var video = document.getElementById('video')
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  var objects = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
  objects.setInitialScale(4)
  objects.setStepSize(2)
  objects.setEdgesDensity(0.1)
  tracking.track('#video', objects, {
    camera: true
  })
  objects.on('track', function(event) {
    if (event.data.length === 0) console.log('ligga?')
    event.data.forEach(function(rect) {
      console.log(rect)
      context.clearRect(0, 0, canvas.width, canvas.height)
      window.plot(rect.x, rect.y, rect.width, rect.height)
    })
  })
  window.plot = function(x, y, w, h) {
    context.strokeStyle = 'pink'
    context.strokeRect(x, y, w, h)
  }
}


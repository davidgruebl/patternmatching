'use strict'

tracking = require('tracking')
require('face')
require('eye')
require('mouth')

window.onload = function() {
  var container = document.querySelector('.container')
  var video = document.querySelector('#video')
  var objects = new tracking.ObjectTracker('face')
  objects.setInitialScale(4)
  objects.setStepSize(2)
  objects.setEdgesDensity(0.1)

  tracking.track('#video', objects, {
    camera: true
  })

  var faceX = 0
  var lastX = 0
  var faceY = 0
  var lastY = 0
  var detected = !1

  objects.on('track', function(event) {
    var maxRectArea = 0
    var maxRect

    detected = event.data.length ? true : false

    event.data.forEach(function(rect) {
      if (rect.width * rect.height > maxRectArea){
        maxRectArea = rect.width * rect.height
        maxRect = rect
      }
    })

    if(maxRectArea > 0) {
      var rectCenterX = maxRect.x + (maxRect.width/2)
      var rectCenterY = maxRect.y + (maxRect.height/2)

      faceX = Math.floor((360 * (rectCenterX / 320) - 180) * -1)
      faceY = Math.floor((360 * (rectCenterY / 240) - 180) * -1)
    }

    rotate(faceX, faceY)
  })

  requestAnimationFrame(rotate)

  function rotate(timestamp) {
    if (faceX === lastX && faceY === lastY) return
    container.style.transform = 'rotateY(' + faceX + 'deg) rotateX(' + faceY + 'deg)'
    container.style.background = detected ? 'green' : 'red'
    requestAnimationFrame(rotate)
  }
}


window.onload = function(){

  var app = document.body
  app.style.backgroundColor = '#fff'

  var colors = [
    '#2f5ca5',
    '#4db3ea',
    '#88b853',
    '#cf318a'
  ]

  var box = document.createElement('div')
  box.id = 'box'
  box.style.transition = 'all 1s'
  box.style.transform = 'scale(1)'
  box.style.transformOrigin = 'top left'
  app.appendChild(box)

  var text = document.createElement('h1')
  text.id = 'text'
  text.innerText = 'Hello!'
  text.style.color = '#555'
  text.style.position = 'absolute'
  text.style.top = ((app.clientHeight/2) - 40) + 'px'
  text.style.left = ((app.clientWidth/2) - 40) + 'px'
  app.appendChild(text)

  for (var i = 0; i < colors.length; i++) {
    var circle = document.createElement('div')
    circle.id = colors[i]
    circle.style.opacity = 0.05
    circle.style.backgroundColor = colors[i]
    circle.style.transition = 'all 10s'
    circle.style.position = 'absolute'
    circle.style.top = (app.clientHeight / 1.2) + 'px'
    circle.style.left = ((app.clientWidth/2) - 2350) + 'px'
    box.appendChild(circle)
  }

  console.log((app.clientHeight/2));

  function rotate(){
    for (var i = 0; i < colors.length; i++) {
      var circle = document.getElementById(colors[i])
      var int = Math.floor( Math.random() * 361 )
      var width = Math.floor( Math.random() * (5000 + 1 - 4700) ) + 4700 + 'px'
      var height = Math.floor( Math.random() * (5000 + 1 - 4700) ) + 4700 + 'px'
      var radius = Math.floor( Math.random() * (50 + 1 - 30) ) + 30 + '%'
      circle.style.width = width
      circle.style.height = height
      circle.style.borderRadius = radius
      circle.style.transform = 'rotate('+int+'deg)'
    }
    setTimeout(rotate, 10000)
  }

  function position(){
    for (var i = 0; i < colors.length; i++) {
      var circle = document.getElementById(colors[i])
      circle.style.position = 'absolute'
    }
  }

  rotate()
  setTimeout(position, 3000)

}

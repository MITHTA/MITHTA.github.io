var boxSize = 19
var margin = 5
// header + content + footer = 100
var headerSize = 10
var footerSize = 5

function genElement(){
  var app = document.body
  app.style.backgroundColor = '#fff'
  app.style.header = '100%'
  app.style.fontSize = '2vw'

  var headerHeight = (app.clientHeight*(headerSize*0.01))
  var footerHeight = (app.clientHeight*(footerSize*0.01))
  var contentHeight = (app.clientHeight - (headerHeight + footerHeight))

  var header = document.createElement('div')
  header.id = 'header'
  header.style.width = '100%'
  header.style.height = headerHeight + 'px'
  header.style.backgroundColor = '#252525'
  header.style.color = '#fff'
  header.style.fontSize = '1.2em'
  header.style.display = 'flex'
  header.style.alignItems = 'center'
  header.style.justifyContent = 'center'
  header.innerText = headerHeight + 'px'
  app.appendChild(header)

  var content = document.createElement('div')
  content.id = 'content'
  content.style.width = '100%'
  content.style.height = contentHeight + 'px'
  content.style.backgroundColor = '#fff'
  content.style.color = '#252525'
  app.appendChild(content)

  var Width = content.clientWidth
  var Height = content.clientHeight
  var length = boxSize
  var buttonWidth = ((Width - ((margin * 2) * Math.ceil(boxSize/8)))/Math.ceil(boxSize/8))
  var buttonHeight = ((Height - ((margin * 2.2) * (length / Math.ceil(boxSize/8))))/Math.ceil(length/Math.ceil(boxSize/8)))
  for (var i = 0; i < length; i++) {
    var element = document.createElement('button')
    element.id = i
    element.name = 'button'
    element.style.fontSize = '.7em'
    element.innerText = buttonWidth + 'px' + ' x ' + buttonHeight + 'px'
    element.style.width = buttonWidth + 'px'
    element.style.height = buttonHeight + 'px'
    element.style.margin = margin + 'px'
    element.classList.add('btn')
    content.appendChild(element)
  }

  var footer = document.createElement('div')
  footer.id = 'footer'
  footer.style.width = '100%'
  footer.style.height = footerHeight + 'px'
  footer.style.backgroundColor = '#252525'
  footer.style.color = '#fff'
  footer.style.fontSize = '.5em'
  footer.style.display = 'flex'
  footer.style.alignItems = 'center'
  footer.style.justifyContent = 'center'
  footer.innerText = footerHeight + 'px'
  app.appendChild(footer)

}

function resize(){
  var app = document.body
  var headerHeight = (app.clientHeight*(headerSize*0.01))
  var footerHeight = (app.clientHeight*(footerSize*0.01))
  var contentHeight = (app.clientHeight - (headerHeight + footerHeight))

  var header = document.getElementById('header')
  header.style.height = headerHeight + 'px'
  header.innerText = headerHeight + 'px'

  var content = document.getElementById('content')
  content.style.height = contentHeight + 'px'

  var footer = document.getElementById('footer')
  footer.style.height = footerHeight + 'px'
  footer.innerText = footerHeight + 'px'

  var Width = content.clientWidth
  var Height = content.clientHeight
  var length = document.getElementsByName('button').length

  var buttonWidth = ((Width - ((margin * 2) * Math.ceil(boxSize/8)))/Math.ceil(boxSize/8))
  var buttonHeight = ((Height - ((margin * 2.2) * (length / Math.ceil(boxSize/8))))/Math.ceil(length/Math.ceil(boxSize/8)))
  for (var i = 0; i < length; i++) {
    var element = document.getElementById(i)
    element.innerText = buttonWidth + 'px' + ' x ' + buttonHeight + 'px'
    element.style.width = buttonWidth+'px'
    element.style.height = buttonHeight+'px'
  }
}

window.onload = function(){
  genElement()
}

window.onresize = function () {
  resize()
}

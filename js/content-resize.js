
function genElement(){
  var app = document.body
  app.style.backgroundColor = '#fff'
  app.style.header = '100%'
  app.style.fontSize = '2vw'

  var header = document.createElement('div')
  header.id = 'header'
  header.style.width = '100%'
  header.style.height = '12%'
  header.style.backgroundColor = '#252525'
  header.style.color = '#fff'
  header.style.fontSize = '1.2em'
  header.style.display = 'flex'
  header.style.alignItems = 'center'
  header.style.justifyContent = 'center'
  header.innerText = 'Header Space'
  app.appendChild(header)

  var content = document.createElement('div')
  content.id = 'content'
  content.style.width = '100%'
  content.style.height = '83%'
  content.style.backgroundColor = '#fff'
  content.style.color = '#252525'
  app.appendChild(content)

  var Width = content.clientWidth
  var Height = content.clientHeight
  var length = 22
  var column = 3
  var margin = 5
  var buttonWidth = ((Width - ((margin * 2) * column))/column)
  var buttonHeight = ((Height - ((margin * 2) * (length / column)))/Math.ceil(length/column))
  for (var i = 0; i < length; i++) {
    var element = document.createElement('button')
    element.id = i
    element.name = 'button'
    element.innerText = 'button'
    element.style.width = buttonWidth+'px'
    element.style.height = buttonHeight+'px'
    element.style.margin = margin+'px'
    element.classList.add('btn')
    content.appendChild(element)
  }

  var footer = document.createElement('div')
  footer.id = 'footer'
  footer.style.width = '100%'
  footer.style.height = '5%'
  footer.style.backgroundColor = '#252525'
  footer.style.color = '#fff'
  footer.style.fontSize = '.5em'
  footer.style.display = 'flex'
  footer.style.alignItems = 'center'
  footer.style.justifyContent = 'center'
  footer.innerText = 'footer Space'
  app.appendChild(footer)

}

function resize(){
  var content = document.getElementById('content')
  var Width = content.clientWidth
  var Height = content.offsetHeight
  var length = document.getElementsByName('button').length
  var column = 3
  var margin = 5
  var buttonWidth = ((Width - ((margin * 2) * column))/column)
  var buttonHeight = ((Height - ((margin * 2) * (length / column)))/Math.ceil(length/column))
  for (var i = 0; i < length; i++) {
    var element = document.getElementById(i)
    element.innerText = 'resized!'
    element.style.width = buttonWidth+'px'
    element.style.height = buttonHeight+'px'
  }
}

window.onload = function(){
  genElement();
}

window.onresize = function () {
  resize();
};

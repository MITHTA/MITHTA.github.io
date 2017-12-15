AWS.config.region = 'ap-northeast-1'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'ap-northeast-1:05d68dd4-9ebc-4636-85dc-bf1032fb6935',
})
var s3Bucket = 'mithta'
var s3Region = 'ap-northeast-1'
var s3 = new AWS.S3({
  params: {
    Bucket: s3Bucket,
    Region: s3Region
  }
})
var img = new Image()
var timerID
var timer
var rotateTimer
var shortTimer
var pref
var ii = 0
var orien = 'Horizontal'
var toggle = 0

var colors = [
  '#2f5ca5',
  '#4db3ea',
  '#88b853',
  '#cf318a'
]

var hello = [
  'こんにちわ',
  'Hello',
  'Buon giorno',
  'Bounjour',
  'Guten tag',
  'Hola',
  '你好',
  '안녕하세요',
  'Ola',
  'Hallo',
  'Hej',
  'Dia duit',
  'Здравствуйте',
  'Dzien dobry',
  'Xin chao',
  'Magandang araw',
  'Merhaba',
  'Γειά σαζ',
  'سلام علیکم',
  'שלום',
  'مفعول به',
  'नमस्ते'
]

var wall
var circle
var home = '<i class="fas fa-home fa-inverse" onclick="init()" name="icon"></i>'
var camera = '<i class="fas fa-camera-retro fa-inverse" onclick="setPrefix(\'photos\')" name="icon"></i>'
var game = '<i class="fas fa-gamepad fa-inverse" onclick="setPrefix(\'Splatoon2\')" name="icon"></i>'
var book = '<i class="fas fa-book fa-inverse" onclick="setPrefix(\'docus\')" name="icon"></i>'

var app = document.body
app.style.backgroundColor = '#000'
app.style.display = 'flex'
app.style.alignItems = 'center'
app.style.justifyContent = 'center'

var copy = document.createElement('div')
copy.style.position = 'absolute'
copy.style.right = '10px'
copy.style.bottom = '10px'
copy.style.color = '#ffffff'
copy.innerHTML = '<i class="fab fa-github"></i> Made By GitHub Pages.'
app.appendChild(copy)

var box = document.createElement('div')
box.id = 'box'
box.style.transition = 'all 1s'
box.style.backgroundColor = '#fff'
if (!userAgent()) {
  // PC, Mac
  box.style.width = '480px'
  box.style.height = '900px'
  box.style.borderRadius = '30px'
} else {
  // iPhone, iPad, Android
  box.style.width = '100%'
  box.style.height = '100%'
}
box.style.overflow = 'hidden'
box.style.textAlign = 'center'
box.style.zIndex = 1
box.style.position = 'relative'
app.appendChild(box)

function setWall(){
  wall = document.createElement('div')
  wall.id = 'wall'
  box.appendChild(wall)
  for (var i = 0; i < colors.length; i++) {
    circle = document.createElement('div')
    circle.id = colors[i]
    circle.name = 'circle'
    circle.style.opacity = .1
    circle.style.backgroundColor = colors[i]
    circle.style.transition = 'all 60s'
    circle.style.position = 'absolute'
    circle.style.top = (app.clientHeight / 1.2) + 'px'
    circle.style.left = ((app.clientWidth/2) - 2350) + 'px'
    circle.style.zIndex = '2'
    wall.appendChild(circle)
  }
}

setWall()

var content = document.createElement('div')
content.id = 'content'
content.style.transition = 'all 1s'
content.style.width = '100%'
content.style.height = '100%'
content.style.overflow = 'scroll'
content.style.borderRadius = '30px'
content.style.zIndex = '3'
box.appendChild(content)

var logo = document.createElement('img')
logo.id = 'logo'
logo.src = 'img/SVG/logo.svg'
logo.style.width = '180px'
logo.style.transition = 'all 1s;'
logo.style.position = 'absolute'
logo.style.top = ((box.clientHeight/2) - 50) + 'px'
logo.style.left = ((box.clientWidth/2) - 90) + 'px'
logo.style.zIndex = 4

var text = document.createElement('h1')
text.id = 'text'
text.style.width = '100%'
text.style.position = 'absolute'
text.style.top = ((box.clientHeight/2) + 50) + 'px'
text.style.transition = 'all 1s'
text.style.fontWeight = 'lighter'
text.style.zIndex = 4

function setText(){
  var text = document.getElementById('text')
  text.innerText = hello[ii]
  if (ii < (hello.length - 1)) {
    ii++
  } else {
    ii = 0
  }
  timer = setTimeout(setText, 5000)
}

function init(){
  timerStop()
  if (orien == 'Vertical') orientation()
  content.innerHTML = ""
  content.classList.remove('docus')
  content.style.backgroundImage = 'none'
  content.style.width = '100%'
  content.style.height = '100%'
  content.style.margin = 0
  content.style.textAlign = 'center'
  logo.style.width = '180px'
  logo.style.top = ((box.clientHeight/2) - 50) + 'px'
  logo.style.left = ((box.clientWidth/2) - 90) + 'px'
  content.appendChild(logo)
  content.appendChild(text)
  setText()
}

init()

function setMenu() {
  var menu = document.createElement('div')
  menu.id = 'menu'
  menu.style.zIndex = '5'
  menu.innerHTML += home
  menu.innerHTML += camera
  menu.innerHTML += game
  // menu.innerHTML += book
  box.appendChild(menu)
}

setMenu()

function rotate(){
  for (var i = 0; i < colors.length; i++) {
    circle = document.getElementById(colors[i])
    var int = Math.floor( Math.random() * 361 )
    var width = Math.floor( Math.random() * (5000 + 1 - 4700) ) + 4700 + 'px'
    var height = Math.floor( Math.random() * (5000 + 1 - 4700) ) + 4700 + 'px'
    var radius = Math.floor( Math.random() * (50 + 1 - 30) ) + 30 + '%'
    circle.style.width = width
    circle.style.height = height
    circle.style.borderRadius = radius
    circle.style.transform = 'rotate('+int+'deg)'
  }
  rotateTimer = setTimeout(rotate, 60000)
}

rotate()

function setPrefix(prefix){
  timerStop()
  content.style.backgroundImage = 'none'
  getBucket(prefix)
}

function getBucket(prefix) {
  if(pref != prefix) clearTimeout(timerID)
  var params = {
    Bucket: s3Bucket,
    Prefix: prefix
  }
  s3.listObjects(params, function(error, data) {
    if (error) throw error
    pref = data.Prefix
    console.log(pref);
    (pref != 'docus') ? dispImg(data) : dispTxt(data)
  })
}

function userAgent(){
  var ua = navigator.userAgent.toLowerCase()
  var iPhone = (ua.indexOf('iphone') > -1)
  var iPad = (ua.indexOf('ipad') > -1)
  var Android = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') > -1)
  var AndroidTab = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') == -1)
  if(iPhone || iPad || Android || AndroidTab) {
    return true
  } else {
    return false
  }
}

function orientation() {
  if (!userAgent()) {
    orien = (orien == 'Horizontal') ? 'Vertical' : 'Horizontal'
    box.style.transform = (orien == 'Vertical') ? 'rotate(-90deg)' : 'rotate(0deg)'
    content.style.transform = (orien == 'Vertical') ? 'rotate(90deg)' : 'rotate(0deg)'
    var icons = document.getElementsByName('icon')
    for (var i = 0; i < icons.length; i++) {
      icons[i].style.transform = (orien == 'Vertical') ? 'rotate(90deg)' : 'rotate(0deg)'
    }
    content.style.borderRadius = '30px'
  }
  console.log(orien)
}

function dispImg(data){
  if (orien = 'Horizontal') orientation()
  var i = 1;
  logo.style.width = '80px'
  logo.style.top = '20px'
  logo.style.left = '10px'
  content.style.width = '910px'
  content.style.height = '490px'
  content.style.marginTop = '210px'
  content.style.marginLeft = '-210px'
  content.style.backgroundSize = 'cover'
  function change(){
    var params = {
      Bucket: s3Bucket,
      Key: data.Contents[i].Key
    };
    img.src = s3.getSignedUrl('getObject', params);
    img.onload = function(){
      content.style.backgroundImage = 'url(' + img.src + ')';
      (i >= (data.Contents.length - 1)) ? i = 1 : i++ ;
      timerID = setTimeout(change, 10000);
    }
  }
  shortTimer = setInterval(change, 3000);
}

function timerStop(){
  clearTimeout(timer)
  clearTimeout(timerID)
  clearTimeout(shortTimer)
  clearTimeout(rotateTimer)
}

function dispTxt(data){
  init();
  timerStop()
  wall.innerHTML = ''
  content.innerHTML = ''
  content.style.textAlign = 'left'
  content.style.padding = '1em'
  content.classList.add('docus')
  function getMarkdown(path, date){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', path);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var md = marked(xmlhttp.responseText);
        var icon = '<i class="fas fa-calendar-alt fa-fw"></i>'
        content.innerHTML += "<h6>" + icon + date + "</h6>" + md + "<hr>";
      }
    };
    xmlhttp.send();
  }
  data.Contents.forEach(function(value, index){
    if (index > 0) {
      var xmlhttp = new XMLHttpRequest();
      var date = value.LastModified;
      var params = {
        Bucket: s3Bucket,
        Key: value.Key
      };
      var file = s3.getSignedUrl('getObject', params);
      getMarkdown(file, date);
    }
  });
}

menu.onclick = function() {
  if (userAgent()) {
    if (toggle == 0) {
      menu.classList.add('active')
      toggle = 1
    } else {
      menu.classList.remove('active')
      toggle = 0
    }
  }
}

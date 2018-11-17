AWS.config.region = 'ap-northeast-1'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'ap-northeast-1:05d68dd4-9ebc-4636-85dc-bf1032fb6935',
})

const bucketName = 'mithta'

const message = [
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

let contents, timer, position = 1, position_limit = 0, timecount = 10000

const s3 = new AWS.S3({
  params:{
    Bucket: bucketName,
    Region: AWS.config.region
  }
})

const bucketHandler = prefix => {
  init_variables()
  s3.listObjects({
    Bucket: bucketName,
    Prefix: prefix
  }, (error, response) => {
    if (error) throw error
    contents = response.Contents
    position_limit = (contents.length - 1)
    showImageHandler()
  })
}

const init_variables = () => {
  clearTimeout(timer)
  position = 1
}

const imageListHandler = contents => {
  for(value of contents) {
    console.log(value)
  }
}

const showImageHandler = () => {
  const load = () => {
    const next = () => {
      (position === position_limit) ? position = 1 : position++
      timer = setTimeout(load, timecount)
    }
    let image = new Image()
    image.src = s3.getSignedUrl('getObject', {
      Bucket: bucketName,
      Key: contents[position].Key
    })
    image.onload = () => {
      document.querySelector('div[name="file-count"]').innerText = position + ' / ' + position_limit
      document.body.style.backgroundImage = 'url(' + image.src + ')'
      next()
    }
    image.onerror = err => next()
  }
  load()
}

const hello = () => {
  let i = 0
  this.element = document.querySelector('h1[name="hello"]')
  const sayHello = () => {
    this.element.innerText = message[i]
    ; (i > message.length) ? i = 0 : i++
     setTimeout(sayHello, timecount)
  }
  sayHello()
  bucketHandler('photos')
}

const previousHandler = () => {
  clearTimeout(timer)
  position = (position - 2)
  if (position === 0) position = position_limit
  if (position === -1) position = position_limit -1
  showImageHandler()
}

const restartHandler = () => {
  position = position - 1
  document.querySelector('div[name="stop"]').classList.remove('selected')
  document.querySelector('div[name="start"]').classList.add('selected')
  showImageHandler()
}

const stopHandler = element => {
  clearTimeout(timer)
  document.querySelector('div[name="start"]').classList.remove('selected')
  document.querySelector('div[name="stop"]').classList.add('selected')
}

const nextHandler = () => {
  clearTimeout(timer)
  if (position + 1 < position_limit) position + 1
  showImageHandler()
}

const logoPositionHandler = () => {
  const change = () => document.querySelector('object').classList.add('change-position')
  setTimeout(change, 3000)
}

const prefixHandler = () => {
  bucketHandler('game')
  console.log(document.querySelector('#mushroom'));
  document.querySelector('#mushroom').classList.add('animation')
}

window.addEventListener('DOMContentLoaded', event => {
  document.querySelector('div[name="previous"]').addEventListener('click', () => previousHandler())
  document.querySelector('div[name="stop"]').addEventListener('click', () => stopHandler())
  document.querySelector('div[name="start"]').addEventListener('click', () => restartHandler())
  document.querySelector('div[name="next"]').addEventListener('click', () => nextHandler())
  document.querySelector('div[name="prefix"]').addEventListener('click', () => prefixHandler())
})

window.onload = () => hello()

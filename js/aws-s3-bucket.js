
AWS.config.region = 'ap-northeast-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'ap-northeast-1:05d68dd4-9ebc-4636-85dc-bf1032fb6935',
});

var s3Bucket = 'mithta';
var s3Region = 'ap-northeast-1';
var s3 = new AWS.S3({
  params: {
    Bucket: s3Bucket,
    Region: s3Region
  }
});
var img = new Image();
var timerID;

function setPrefix(prefix){
  clearTimeout(timerID);
  getBucket(prefix);
}

function getBucket(prefix) {
  var app = document.getElementById('app');
  var logo = document.getElementById('logo');
  var box = document.getElementById('box');
  var params = {
    Bucket: s3Bucket,
    Prefix: prefix
  }
  s3.listObjects(params, function(error, data) {
    if (error) throw error
    var pre = data.Prefix;
    (pre != 'docus') ? viewImages(data) : viewDocus(data);
  });
}

function init() {
  app.style.backgroundImage = "";
  app.classList.add('document');
  box.innerHTML = "";
}

function viewImages(data){
  init();
  var i = 1;
  function change(){
    var params = {
      Bucket: s3Bucket,
      Key: data.Contents[i].Key
    };
    img.src = s3.getSignedUrl('getObject', params);
    img.onload = function(){
      logo.classList.add('top-left');
      app.style.backgroundImage = 'url(' + img.src + ')';
      (i >= (data.Contents.length - 1)) ? i = 1 : i++ ;
      timerID = setTimeout(change, 10000);
    }
  }
  change();
}

function viewDocus(data){
  init();
  app.classList.remove('flex-cc');
  app.classList.add('document');
  function getMarkdown(path, date){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', path);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var md = marked(xmlhttp.responseText);
        box.innerHTML += "<h6>" + date + "</h6>" + md + "<hr>";
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

function bucketRotate(){
  var bucket = document.getElementById('bucket');
  bucket.classList.remove('bucket_init');
  bucket.classList.add('bucket_rotate');
}

function bucketInit(){
  var bucket = document.getElementById('bucket');
  bucket.classList.remove('bucket_rotate');
  bucket.classList.add('bucket_init');
}

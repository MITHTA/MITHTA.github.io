
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
var xmlhttp = new XMLHttpRequest();
var img = new Image();
var timerID;

function reload(){
  clearTimeout(timerID);
  getBucket();
}

function getBucket() {
  var app = document.getElementById('app');
  var logo = document.getElementById('logo');
  var num = document.Bucket.Prefix.selectedIndex;
  var prefix = document.Bucket.Prefix.options[num].value;
  var params = {
    Bucket: s3Bucket,
    Prefix: prefix
  }
  s3.listObjects(params, function(error, data) {
    if (error) throw error
    console.log(data);
    (data.Prefix != 'docus') ? rotate(data) : testdocus(data);
  });
}

function rotate(data){
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

function testdocus(data){
  console.log(data);
  app.classList.remove('flex-cc');
  for (var i = 1; i < data.length; i++) {
    var params = {
      Bucket: s3Bucket,
      Key: data.Contents[i].Key
    };
    var file = s3.getSignedUrl('getObject', params);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          var elem = document.getElementById("app");
          var md = marked(xmlhttp.responseText);
          elem.innerHTML = md;
        } else {
          alert("status = " + xmlhttp.status);
        }
      }
    }
    xmlhttp.open("GET", file);
    xmlhttp.send();
  }
}

window.onload = function(){
  reload();
}

window.onload = function() {
  var xmlhttp = new XMLHttpRequest();
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
  xmlhttp.open("GET", "docus/test.md");
  xmlhttp.send();
}

// function createXMLHttpRequest(){
//   if(window.XMLHttpRequest){return new XMLHttpRequest()}
//   if(window.ActiveXObject){
//     try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}
//     try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}
//     try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}
//   }
//   return false;
// }

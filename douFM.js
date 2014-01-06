document.body.addEventListener("keydown",function(e){
  var kc = e.keyCode;
  if([83,32,70,68].indexOf(kc) >-1 ){
       chrome.runtime.sendMessage({keyCode: kc}, function(response) {
         //console.log(response.mes)
       });
  }
},false);

function generateCode(keyCode){
  /*
  function triggerKeyboardEvent(el, keyCode)
  {
    debugger;
      var eventObj = document.createEventObject ?
          document.createEventObject() : document.createEvent("Events");
      if(eventObj.initEvent){
            eventObj.initEvent("keydown", true, true);
          }
      eventObj.keyCode = keyCode;
      eventObj.which = keyCode;
      el.dispatchEvent ? 
          el.dispatchEvent(eventObj) : 
          el.fireEvent("onkeydown", eventObj);
  }
  */
  /*
   var o = {32: "pause",70: "love",68: "ban",83: "skip"};
   * */
  function createScript(keyCode){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML =  'function triggerKeyboardEvent(el, keyCode) { var eventObj = document.createEventObject ?  document.createEventObject() : document.createEvent("Events"); if(eventObj.initEvent){ eventObj.initEvent("keydown", true, true); } eventObj.keyCode = keyCode; eventObj.which = keyCode; el.dispatchEvent ?  el.dispatchEvent(eventObj) : el.fireEvent("onkeydown", eventObj); }' + 
                        ";triggerKeyboardEvent(document.body,"+ keyCode + ");";
    document.body.appendChild(script);
    setTimeout(function(){
        script.parentElement.removeChild(script);
    },10);
  }
  return createScript.toString() + ";createScript(" + keyCode + ");";
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.tabs.query(
      {
        url:"*://douban.fm/*"
      },function(tabs){
       var tab = tabs[0];
       chrome.tabs.executeScript(tab.id,{
          //"file":"douban.js"
          "code":generateCode(request.keyCode)
       },function(rep){
          console.log(rep + "done");
       });
    });

    /*
    console.log(sender.tab ?
                             "from a content script:" + sender.tab.url :
                             "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
      */
});

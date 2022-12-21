chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    file: 'content.js',
    allFrames: true
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  
  if (request.textToRead && request.pageLang) {

    chrome.tts.speak(request.textToRead, {
      'rate': 7,
      'lang': request.pageLang,
      requiredEventTypes: ['end'],
      onEvent: function(event) {
        if(event.type === 'end') {
          sendResponse('finished reading')
        }
      }
    })

    return true; //to keep the port open for a response
  }
});
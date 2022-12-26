chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.textToRead && request.pageLang && request.readingSpeed) {

    chrome.tts.speak(request.textToRead, {
      'rate': request.readingSpeed,
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
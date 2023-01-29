chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.textToRead && request.pageLang && request.readingSpeed) {

    let voiceName;
    let language;

    if (request.pageLang == 'it-IT') {
      voiceName = 'Microsoft Cosimo - Italian (Italy)';
      language = 'it-IT';
    } else {
      voiceName = 'Microsoft Zira - English (United States)';
      language = 'en-US';
    }

    // Text to speech the received text
    chrome.tts.speak(request.textToRead, {
      'rate': request.readingSpeed,
      'lang': language,
      'voiceName': voiceName,
      // Events required: end and interrupted
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
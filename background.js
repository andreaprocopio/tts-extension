chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  chrome.tts.getVoices(function(voices) {
    console.log(voices);
  });

  console.log(request.pageLang);
  
  if (request.textToRead && request.pageLang && request.readingSpeed) {

    let voiceName;
    let language;

    if (request.pageLang == 'it') {
      voiceName = 'Google Italiano';
      language = 'it-IT';
    } else {
      voiceName = 'Google US English';
      language = 'en-US';
    }

    console.log(voiceName);

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
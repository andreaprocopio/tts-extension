let state = 'off'; // Default
let speed = 5; // Default
let language = 'en-US'; // Default

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if (request == 'start') {
    state = 'on';
  } else if (request == 'stop') {
    state = 'off';
  } else if (request == 'it-IT') {
    language = request;
  } else if (request == 'en-US') {
    language = request
  } else {
    speed = Number(request);
  }
});

document.addEventListener('click', function(event) {
  
  // Check if the extension is on or off
  if(state === 'on') {
    
    // If clicked on a non-text element return
    if (event.target.tagName === 'BODY') {
      return;
    }
    
    // Grab the language of the page, the text content of the clicked element and set its background to gray.
    // const pageLang = document.documentElement.getAttribute('lang');
    const textToRead = event.target.textContent;
    let currentReadedElement = event.target;
    currentReadedElement.style.backgroundColor = "lightgray";
    currentReadedElement.setAttribute("data-current-element", "true");

    // remove the data-current-element attribute from any other element that has it
    let elements = document.querySelectorAll("[data-current-element=true]");
    elements.forEach(el => {
        if(el !== currentReadedElement) {
          el.style.backgroundColor = '';
          el.removeAttribute("data-current-element");
        }
    });
  
    if (textToRead) {
      // Send a message to background.js with the text to read, the speed, the clicked element and the language.
      chrome.runtime.sendMessage({
        textToRead: textToRead,
        pageLang: language,
        currentReadedElement: currentReadedElement,
        readingSpeed: speed
      }, function (response){
        currentReadedElement.style.backgroundColor = '';
        currentReadedElement.removeAttribute("data-current-element");
      });
    }
  } else if (state === 'off') {

  }
});

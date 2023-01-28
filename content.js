let state = 'off';
let speed = 5; //default

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if (request == 'start') {
    state = 'on';
    // console.log(state);
  } else if (request == 'stop') {
    state = 'off';
    // console.log(state);
  } else {
    speed = Number(request);
    // console.log(`Reading speed set to ${speed}`);
  }
})

document.addEventListener('click', function(event) {
  
  // Check if the extension is on or off
  if(state === 'on') {
    
    // If clicked on a non-text element return
    if (event.target.tagName === 'BODY') {
      return;
    }
    
    // Grab the language of the page, the text content of the clicked element and set its background to gray.
    const pageLang = document.documentElement.getAttribute('lang');
    const textToRead = event.target.textContent;
    let currentReadedElement = event.target;
    currentReadedElement.style.backgroundColor = "lightgray";
    currentReadedElement.setAttribute("data-current-element", "true");

    // Max Char
    // const maxChar = 200;
    // if (textToRead.length > maxChar) {
    //   // splitting long text into chunks
    //   const chunks = [];
    //   let i, j;
    //   for (i = 0, j = textToRead.length; i < j; i += maxChar) {
    //       chunks.push(textToRead.slice(i, i + maxChar));
    //   }
    // }

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
        pageLang: pageLang,
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

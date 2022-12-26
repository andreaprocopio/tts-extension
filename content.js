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
  
  if(state === 'on') {
    
    if (event.target.tagName === 'BODY') {
      return;
    }
    
    const pageLang = document.documentElement.getAttribute('lang');
    const textToRead = event.target.textContent;
    let currentReadedElement = event.target;
    event.target.style.backgroundColor = "lightgray";
  
    if (textToRead) {
      chrome.runtime.sendMessage({
        textToRead: textToRead,
        pageLang: pageLang,
        currentReadedElement: currentReadedElement,
        readingSpeed: speed
      }, function(response) {
        currentReadedElement.style.backgroundColor = "";
      });
    }
  } else if (state === 'off') {

  }
});

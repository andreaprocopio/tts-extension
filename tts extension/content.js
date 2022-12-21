document.addEventListener('click', function(event) {
  if (event.target.tagName === 'BODY') {
    return;
  }

const pageLang = document.documentElement.getAttribute('lang');
const textToRead = event.target.textContent;
event.target.style.backgroundColor = "black";
event.target.style.color = "white";
let currentReadedElement = event.target;

  if (textToRead) {
    chrome.runtime.sendMessage({
      textToRead: textToRead,
      pageLang: pageLang,
      currentReadedElement: currentReadedElement
    }, function(response) {
      currentReadedElement.style.backgroundColor = "unset";
      currentReadedElement.style.color = "unset";
    });
  }
});
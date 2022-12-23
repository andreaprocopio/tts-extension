window.addEventListener('DOMContentLoaded', function(){
  const toggleButton = document.getElementById('toggle-button');

  // let active;

  const sendState = function(state) {
    chrome.tabs.query({}, function(tabs){
      for (let i = 0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, state);
      }
    })
  }

let state = false;

  toggleButton.addEventListener('click', function() {

    if (!state) {

      state = true;
      toggleButton.textContent = 'Turn Off'; //changing the text
      sendState('start');


    } else {

      state = false;
      toggleButton.textContent = 'Turn On'; //changing the text
      sendState('stop');

    }
  });
});


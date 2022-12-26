window.addEventListener('DOMContentLoaded', function(){
  const checkboxToggler = document.getElementById('checkbox-toggler');
  const speedSelect = document.getElementById('speed-select');
  
  chrome.storage.local.get('checkboxState', function(items){
    if (items.checkboxState) {
      checkboxToggler.checked = true;
      sendState('start'); //this is needed because initial state is off
    } else {
      checkboxToggler.checked = false;
    }
  })

  chrome.storage.local.get('readingSpeed', function(items){
    if (items.readingSpeed) {
      speedSelect.value = items.readingSpeed
    } else {
      speedSelect.value = 5; //default
    }
  })

  const sendState = function(state) {
    chrome.tabs.query({}, function(tabs){
      for (let i = 0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, state);
      }
    })
  }

  checkboxToggler.addEventListener('change', function() {

    const checkedState = checkboxToggler.checked;

    chrome.storage.local.set({'checkboxState': checkboxToggler.checked});

    if (checkedState) {
      sendState('start');
    } else {
      sendState('stop');
    }
  });

  speedSelect.addEventListener('change', function(){

    const value = speedSelect.value;

    chrome.storage.local.set({'readingSpeed': value});

    sendState(value);
  })
});


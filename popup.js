window.addEventListener('DOMContentLoaded', function(){
  const checkboxToggler = document.getElementById('checkbox-toggler');
  const speedSelect = document.getElementById('speed-select');
  const langSelect = document.getElementById('lang-select');
  
  chrome.storage.local.get('checkboxState', function(items){
    if (items.checkboxState) {
      checkboxToggler.checked = true;
      sendState('start'); // This is needed because initial state is off
    } else {
      checkboxToggler.checked = false;
    }
  })

  chrome.storage.local.get('readingSpeed', function(items){
    if (items.readingSpeed) {
      speedSelect.value = items.readingSpeed
      sendState(items.readingSpeed);
    } else {
      speedSelect.value = 5; // Default
    }
  })

  chrome.storage.local.get('language', function(items){
    if (items.language) {
      langSelect.value = items.language;
      sendState(items.language);
    } else {
      langSelect.value = 'en-US'; // Default language is english
    }
  });

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
  });

  langSelect.addEventListener('change', function(){

    const value = langSelect.value;

    chrome.storage.local.set({'language': value});

    sendState(value)
  });
});


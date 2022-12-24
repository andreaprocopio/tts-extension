window.addEventListener('DOMContentLoaded', function(){
  const checkboxToggler = document.getElementById('checkbox-toggler');
  
  chrome.storage.local.get('checkboxState', function(items){
    if (items.checkboxState) {
      checkboxToggler.checked = true;
    } else {
      checkboxToggler.checked = false;
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
});


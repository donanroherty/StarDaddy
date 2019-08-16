/* eslint-disable no-undef */

function openAppPage() {
  chrome.tabs
    .create({
      url: './index.html'
    })
    .then(tab => {
      tabId = tab.id
    })
}

chrome.browserAction.onClicked.addListener(openAppPage)

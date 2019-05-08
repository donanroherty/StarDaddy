/* eslint-disable no-undef */

function openAppPage() {
  browser.tabs
    .create({
      url: './index.html'
    })
    .then(tab => {
      tabId = tab.id
    })
}

browser.browserAction.onClicked.addListener(openAppPage)

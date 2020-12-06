browser.browserAction.onClicked.addListener(tab => {
	browser.tabs.executeScript(tab.id, { file: 'injected.js' })
})

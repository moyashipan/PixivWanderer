chrome.runtime.onInstalled.addListener(function() {
});
chrome.webNavigation.onCompleted.addListener(function(details) {
	if (details.frameId !== 0) return;

	if (details.tabId < 0) return;

	var tabs = loadTabConfigs();
	if (tabs[details.tabId] == undefined) return;

	chrome.tabs.sendMessage(details.tabId, {details:details}, function(response){
	});
});

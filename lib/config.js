function addTabConfig(tab){
		var target_tabs = loadTabConfigs();
		target_tabs[tab.id] = tab;
		saveTabconfigs(target_tabs);
}
function removeTabConfig(tab_id){
		var target_tabs = loadTabConfigs();
		delete target_tabs[tab_id];
		saveTabconfigs(target_tabs);
}
function loadTabConfigs(){
		try {
			var target_tabs = JSON.parse(localStorage['tabs']) || {};
		}catch (e){
			var target_tabs = {};
		}
		return target_tabs;
}
function saveTabconfigs(tabs){
		localStorage['tabs'] = JSON.stringify(tabs);
}

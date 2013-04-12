$(document).ready(function(){
	setTimeout(function(){
		$(':focus').blur();
	}, 100);
	updateTabStatuses();

	$('#btn_start_wander').on('click', function(e){
		// tabIdを取得する
		chrome.tabs.query({currentWindow:true, active:true}, function(tabs){
			if (!tabs[0]) return;
			var tab = tabs[0];
			if (tab.id < 0) return;
						
			// tabIdを記録
			addTabConfig(tab);

			updateTabStatuses();

			chrome.tabs.update(tab.id, {url:"http://www.pixiv.net/"}, function(ret){
			});

			window.close();
		});
	});
	function updateTabStatuses(){
		var tabs = loadTabConfigs();
		$.each(tabs, function(id){
			chrome.tabs.get(parseInt(id), function(tab){
				var tabs = loadTabConfigs();
				if (tab === undefined) {
					delete tabs[id];
				} else {
					tabs[tab.id] = tab;

					var tabs_dom = $('#target_tabs_container ul');
					var tab_dom = tabs_dom
						.find('li[name=tab'+tab.id+']');
					if (tab_dom.length < 1) {
						tab_dom = $('#tpl_target_tab').clone()
							.attr('data-tab-id', tab.id)
							.on('click', function(e){
								var id = $(this).data('tab-id');
								removeTabConfig(id);
								$(this).remove();
							})
							.appendTo(tabs_dom);
					}
					tab_dom
						.removeAttr('id')
						.attr('name', 'tab'+tab.id)
						.find('img').attr('src', tab.favIconUrl)
						.end().find('span').text(tab.title);
				}
				saveTabconfigs(tabs);
			});
		});
	}
})

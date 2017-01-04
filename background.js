var active = false;

function get_me_some_funky_colors(tab) {
  var tab_id = tab.tabId || tab.id,
      state = (active == true ? "on" : "off");

  chrome.browserAction.setIcon({path: state+".png"});
  chrome.browserAction.setTitle({title: "Press the button to get FUNKY\n                       now it's "+state.toUpperCase()});
  chrome.tabs.sendMessage(tab_id, {state: state});
}

chrome.tabs.onActivated.addListener(get_me_some_funky_colors);
chrome.tabs.onUpdated.addListener(get_me_some_funky_colors);
chrome.browserAction.onClicked.addListener(function(tab) {
  active = !active;
  get_me_some_funky_colors(tab);
});

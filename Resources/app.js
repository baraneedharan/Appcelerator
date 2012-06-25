// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup({id:'tabGroup1'});



//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({
	url:'main_windows/controls.js',
	title:'TreatDrop'
});
var tab2 = Titanium.UI.createTab({
	icon:'images/tabs/KS_nav_ui.png',
	title:'TreatDrop',
	window:win2
});


//
//  add tabs
//
tabGroup.addTab(tab2);

tabGroup.addEventListener('open',function()
{
	// set background color back to white after tab group transition
	Titanium.UI.setBackgroundColor('#fff');
});

tabGroup.setActiveTab(1);
// open tab group with a transition animation
tabGroup.open({
	transition: Titanium.UI.iPhone && Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});





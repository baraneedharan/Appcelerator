// create table view data object
var data = [
	{title:'Select Users', hasChild:true, test:'../examples/select_user.js'},
	{title:'All Checkins', hasChild:true, test:'../examples/all_checkins.js'},
	{title:'Friends Checkins', hasChild:true, test:'../examples/friends_checkin.js'},
	{title:'Recent Checkins', hasChild:true, test:'../examples/recent_checkins.js'},
	{title:'FB checkin', hasChild:true, test:'../examples/fb_checkin.js'}
];



// create table view
var tableview = Titanium.UI.createTableView({
	data:data
});

// create table view event listener
tableview.addEventListener('click', function(e)
{
	if (e.rowData.test)
	{
		var win = Titanium.UI.createWindow({
			url:e.rowData.test,
			title:e.rowData.title
		});
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);

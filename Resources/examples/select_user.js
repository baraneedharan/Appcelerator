


// create slider view data object
var data = [
	{title:'Kanchan',className: '4fe00bc2b6b37a0a7cc19e45', hasChild:true, test:'../examples/specific_user.js'}
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
			title:e.rowData.title,
			name: e.rowData.title,
			passedName: e.rowData.className
		});
		
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);

function loadPlaces()
{
	// Create our HTTP Client and name it "loader"
	var loader = Titanium.Network.createHTTPClient();
	// Sets the HTTP request method, and the URL to get data from
	loader.open("GET","http://td.dev/api/users/all/");
	// Runs the function when the data is ready for us to process
	loader.onload = function() 
	{
		var places = eval('('+this.responseText+')');
		for (var i = 0; i < places.length; i++)
		{
			userID = places[i].muid;
			name = places[i].name;
			Ti.API.info(userID + " and " +name );
			
			var row = Ti.UI.createTableViewRow({
		        title: places[i].name, className: places[i].uid, hasChild:true, test:'../examples/all_users.js'
		    });
		 
		    data.push(row);
		}
		tableview.setData(data);
		
		tableviewrow.addEventListener('click', function(e)
		{
			if (e.rowData.test)
			{
				var win = Titanium.UI.createWindow({

				});
				
				Titanium.UI.currentTab.open(win,{animated:true});
			}
		});
		
	};
	// Send the HTTP request
	loader.send();
}
loadPlaces();


// create slider view data object
var data = [
	
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

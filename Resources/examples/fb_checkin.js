/*globals Titanium, Ti, alert, JSON */
var win = Ti.UI.currentWindow;
Titanium.Facebook.appid = "207290776059895";
Titanium.Facebook.permissions = ['publish_stream', 'read_stream'];



function updateLoginStatus() {
	
}

// capture
//Titanium.Facebook.addEventListener('login', updateLoginStatus);
Titanium.Facebook.addEventListener('login', function(e) {
    if (e.success) {
        var fbToken = Ti.Facebook.accessToken;
        var fbUid = Ti.Facebook.uid;
        Ti.API.info(fbToken + "   " + fbUid);
         var data = [];

        Ti.Facebook.requestWithGraphPath('me/friends', {fields: 'first_name,last_name,id'}, 'GET', function(e) {
		    if(e.success){
		        var d = JSON.parse(e.result);
		        var row = d.data;
				
		        for(c=0;c<row.length;c++){
		            var friend = row[c];
		            var fullname = friend.first_name+" "+friend.last_name;
		            var fbuserid = friend.id;
		 			Ti.API.info(fullname + " " + fbuserid + " " +fbToken);
		            
		            var rowdata = Ti.UI.createTableViewRow({
				        title: fullname, className: fbuserid, name:fbToken, height: 'auto' , hasChild:true, test:'../examples/fb_users.js',
				    });
				    data.push(rowdata);
				    
		        }
		       
				    
		        var tableview = Titanium.UI.createTableView({
					data:data
				});
		 
	 			Titanium.UI.currentWindow.add(tableview);
	 			
	 			
	 			tableview.addEventListener('click', function(e)
				{
					if (e.rowData.test)
					{
						var win = Titanium.UI.createWindow({
							url:e.rowData.test,
							title:e.rowData.title,
							name: e.rowData.title,
							passedName: e.rowData.className,
							passedToken: e.rowData.name
						});
						
						Titanium.UI.currentTab.open(win,{animated:true});
					}
				});
	 			
		    }
		});
        
    } else if (e.error) {
        alert('Login on facebook failed. Please try again later!');
        Ti.API.error('Facebook login error: '+e.error);
    } else if (e.cancelled) {
        //alert("Canceled");
    }
});
Ti.Facebook.authorize();



Titanium.Facebook.addEventListener('logout', function(e) {
	alert("logged out successfully");
	myArray = [];
	var tableview = Titanium.UI.createTableView({
		data:myArray
	});
	Titanium.UI.currentWindow.add(tableview)
});

//
// Login Button
//

// win.add(Titanium.Facebook.createLoginButton({
	// style:Ti.Facebook.BUTTON_STYLE_WIDE,
		// top:10
// }));

var titleSlider = Titanium.Facebook.createLoginButton({
	style:Ti.Facebook.BUTTON_STYLE_WIDE,
	right:10
});
win.titleControl = titleSlider;
inTitle=true;



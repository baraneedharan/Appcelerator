var win = Titanium.UI.currentWindow;

var userName = win.name;
var userId = win.passedName;
Ti.API.info(userName + " " + userId);

if (Ti.Geolocation.locationServicesEnabled) {
    Titanium.Geolocation.purpose = 'Get Current Location';
    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (e.error) {
            Ti.API.error('Error: ' + e.error);
        } else {
            //Ti.API.info(e.coords);
            
            
        	var mapview = Titanium.Map.createView({
   				 mapType: Titanium.Map.STANDARD_TYPE,
   				 region: {latitude:12.92361, longitude:77.646208,
            	 latitudeDelta:0.1, longitudeDelta:0.1},
   				 animate:true,
    			 regionFit:true,
   				 userLocation:false
			});			

			win.add(mapview);
			

	
            
           function loadCheckins()
			{
				// Create our HTTP Client and name it "loader"
				var loader = Titanium.Network.createHTTPClient();
				// Sets the HTTP request method, and the URL to get data from
				var userurl = "http://td.dev/api/visited/id/"+userId;
				Ti.API.info(userurl);
				loader.open("GET",userurl);
				// Runs the function when the data is ready for us to process
				loader.onload = function() 
				{
					//alert("i came here");
					var checkins = eval('('+this.responseText+')');
					//alert(checkins);
					for (var i = 0; i < checkins.length; i++)
					{
						var name = checkins[i].name; // The tweet message
						var address = checkins[i].Address; // The screen name of the user
						var lction = checkins[i].Location; // The profile image
						locationID = checkins[i].locid;
						Ti.API.info(name + " " + lction);
						
			            var myAnnotations = [
							Ti.Map.createAnnotation({
								latitude: lction[0],
								longitude: lction[1],
								title: name,
								subtitle: address,
								animate: true,
								pincolor: Ti.Map.ANNOTATION_GREEN,
								//rightButton: '/images/custom-slider-left.9.png'
							})];
						mapview.addAnnotations(myAnnotations);
					}
					mapview.addEventListener('click',function(evt) {
					    var annotation = evt.source; //get the Myid from annotation
				        var clicksource = evt.clicksource;
				        var location = evt.title;
				 
					});
					
            
			
				};
				// Send the HTTP request
				loader.send();
			}
			loadCheckins();
 
        }
    });
} else {
    alert('Please enable location services');
}











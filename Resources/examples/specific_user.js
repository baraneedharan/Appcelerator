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
	
            
            function loadPlaces()
			{
				// Create our HTTP Client and name it "loader"
				var loader = Titanium.Network.createHTTPClient();
				// Sets the HTTP request method, and the URL to get data from
				loader.open("GET","http://td.dev/api/venue/all/");
				// Runs the function when the data is ready for us to process
				loader.onload = function() 
				{
					var places = eval('('+this.responseText+')');
					for (var i = 0; i < places.length; i++)
					{
						var name = places[i].name; // The tweet message
						var address = places[i].address; // The screen name of the user
						var latlong = places[i].latlong; // The profile image
						locationID = places[i].locid;

						
			            var myAnnotations = [
							Ti.Map.createAnnotation({
								latitude: latlong[0],
								longitude: latlong[1],
								title: name,
								subtitle: address,
								animate: true,
								pincolor: Ti.Map.ANNOTATION_GREEN,
								rightButton: '/images/custom-slider-left.9.png'
							})];
						mapview.addAnnotations(myAnnotations);
					}
					
					
					mapview.addEventListener('click',function(evt) {
							
						    var annotation = evt.source; //get the Myid from annotation
					        var clicksource = evt.clicksource;
					        var location = evt.title;
					 
					        if (clicksource=='rightButton'){  //leftButton event      
					            alert( "Hello " + userName +" .You have been successfylly checked in at " + location );
					            var httpClient = Titanium.Network.createHTTPClient();
								httpClient.open('POST', 'http://td.dev/api/checkin/' + userId + '/' + locationID );
								httpClient.send("http://td.dev/api/");
					        }
						});
					
				};
				// Send the HTTP request
				loader.send();
			}
			loadPlaces();
 
        }
    });
} else {
    alert('Please enable location services');
}











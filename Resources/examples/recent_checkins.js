var win = Titanium.UI.currentWindow;

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
				loader.open("GET","http://td.dev/api/users/friendscheckins/4fe00bc2b6b37a0a7cc19e45");
				// Runs the function when the data is ready for us to process
				loader.onload = function() 
				{
					var places = eval('('+this.responseText+')');
					for (var i = 0; i < places.length; i++)
					{
						var name = places[i].friendName; 
						var address = places[i].venueName; 
						var checkintime = places[i].checkinTime; 
						var latlong = places[i].latlong; 
						locationID = places[i].locationId;

						
			            var myAnnotations = [
							Ti.Map.createAnnotation({
								latitude: latlong[0],
								longitude: latlong[1],
								title: name,
								subtitle: "have checked in at " + address + " before " + checkintime ,
								animate: true,
								pincolor: Ti.Map.ANNOTATION_GREEN
							})];
						mapview.addAnnotations(myAnnotations);
					}
					            
            
			
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











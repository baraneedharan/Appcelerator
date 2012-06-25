var win = Titanium.UI.currentWindow;

var userName = win.name;
var userId = win.passedName;
var accessToken = win.passedToken;
Ti.API.info(userName + " " + userId);

if (Ti.Geolocation.locationServicesEnabled) {
    Titanium.Geolocation.purpose = 'Get Current Location';
    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (e.error) {
            Ti.API.error('Error: ' + e.error);
        } else {
            //Ti.API.info(e.coords);
            

            
           function loadCheckins()
			{
				// Create our HTTP Client and name it "loader"
				var loader = Titanium.Network.createHTTPClient();
				// Sets the HTTP request method, and the URL to get data from
				//var userurl = "https://api.facebook.com/method/fql.query?access_token="+accessToken+"&query=select%20checkin_id,tagged_uids,page_id,%20coords,author_uid%20from%20checkin%20WHERE%20author_uid%20in(SELECT%20uid2%20FROM%20friend%20WHERE%20uid1%20=%20me())&format=JSON";
				var userurl = "https://api.facebook.com/method/fql.query?access_token="+accessToken+"&query=select%20checkin_id,tagged_uids,page_id,%20coords,author_uid%20from%20checkin%20WHERE%20author_uid%20=%20"+userId+"&format=JSON";
				Ti.API.info(userurl);
				loader.open("GET",userurl);
				// Runs the function when the data is ready for us to process
				//alert("hi1");
				loader.onload = function(e) 
				{

					var checkins = eval('('+this.responseText+')');
					
					var mapview = Titanium.Map.createView({
		   				 mapType: Titanium.Map.STANDARD_TYPE,
		   				 region: {latitude:checkins[0].coords.latitude, longitude:checkins[0].coords.longitude,
		            	 latitudeDelta:0.1, longitudeDelta:0.1},
		   				 animate:true,
		    			 regionFit:true,
		   				 userLocation:false
					});			
	
					win.add(mapview);
					
					for (var i = 0; i < checkins.length; i++)
					{
						var lat = checkins[i].coords.latitude;
						var longt = checkins[i].coords.longitude;  // The screen name of the user
						Ti.API.info(lat + " " + longt);
						
			            var myAnnotations = [
							Ti.Map.createAnnotation({
								latitude: lat,
								longitude: longt,
								title: 'fb-checkin',
								subtitle: 'chennai',
								animate: true,
								pincolor: Ti.Map.ANNOTATION_GREEN,
								//rightButton: '/images/custom-slider-left.9.png'
							})];
						mapview.addAnnotations(myAnnotations);
					}
			
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











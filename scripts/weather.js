// Description:
//   Get a useless recommendation for food
//
// Commands:
//   biscuit weather - hubot will respond with the current weather conditions
//   biscuit forecast - hubot will respond with tomorrows basic forecast
//
// Notes:
//   NONE

(function() {
	module.exports =  function(robot) {
		robot.respond(/weather/, function (msg) {
			return msg.http("http://api.wunderground.com/api/20653698ddd9aa70/conditions/q/IN/Bloomington.json").get() (function (err, res, body) {
				if (err){
					console.log( "we had an error: " + err);
					}
				else {
					var data = JSON.parse(body);
					var weather = data.current_observation.weather;
					var temp = data.current_observation.temp_f;
					var feelslike = data.current_observation.feelslike_f;
					var wind = data.current_observation.wind_string;
					console.log("Current conditions in Bloomington, IN: " + weather + ", " + temp + " degrees: feelslike " + feelslike + " with wind " + wind);
					return;
				}
			});
		});
		
		robot.respond(/forecast/, function (msg) {
			return msg.http("http://api.wunderground.com/api/20653698ddd9aa70/forecast/q/IN/Bloomington.json").get() (function (err, res, body) {
				if (err){
					console.log( "we had an error: " + err);
					}
				else {
					var data = JSON.parse(body);
					var forecasts = data.forecast.txt_forecast.forecastday;
					for (var i=0; i<forecasts.length; i++) {
					    var forecast = forecasts[i];
					    if(forecast["period"] === 2){
							console.log("Weather for " + forecast["title"] + ": " + forecast["fcttext"]);
							return;
						}						
					}
				}
			});
		});
	};
}).call(this);

//	robot.respond /forecast/i, (msg) ->
//		msg.http("http://api.wunderground.com/api/20653698ddd9aa70/forecast/q/IN/Bloomington.json")
//			.get() (err, res, body) ->
//				if err
//					console.log( "we had an error: #{err}")
//				else
//					data = JSON.parse(body)
//					objects = data.forecast.txt_forecast.forecastday
//					console.log("I just really don't know what the weather looks like tomorrow. Sorry about that.")

//var arr = [];
//for (var i=0; i<json.forecast.simpleforecast.forecastday.length; i++) {
//  var forecast = json.forecast.simpleforecast.forecastday[i];
//  for (var j=0; j<forecast.some_other_array.length; j++) {
//    var some_other_var = forecast.some_other_array[j];
//    arr.push(some_other_var.whatever);
//  }
//}
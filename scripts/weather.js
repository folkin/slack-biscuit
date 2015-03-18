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
		robot.respond(/.*weather.*/i, function (msg) {
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
					return msg.send("Current conditions in Bloomington, IN: " + weather + ", " + temp + " degrees: feelslike " + feelslike + " with wind " + wind);
				}
			});
		});

		robot.respond(/.*forecast.*/i, function (msg) {
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
							return msg.send("Weather for " + forecast["title"] + ": " + forecast["fcttext"]);
						}
					}
				}
			});
		});
	};
}).call(this);

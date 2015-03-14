# Description:
#   Get a useless recommendation for food
#
# Commands:
#   biscuit lunch - hubot should respond witha lunch recommendation
#
# Notes:
#   NONE

module.exports = (robot) ->

  farPlaces = [
    'Penn Station',
    'Potbelly Sandwich Shop',
    'Qdoba Mexican Grill',
    'Bub\'s Burgers and Ice Cream',
  ]

  mediumPlaces = [
    'Bloomingfoods Market and Deli',
    'BuffaLouie\'s',
    'Cafe Pizzaria',
    'Chipotle',
    'Trailhead Pizza',
    'Irish Lion',
    'Kilroy\'s',
    'Dats',
    'Taste of India',
    'Trojan Horse',
    'Village Deli',
    'Wich Wich Sandwiches',
    'Z & C Teriyaki & Sushi'
  ]

  closePlaces = [
    'Best Taste',
    'Bloomington Sandwich Company',
    'Brother\'s Bar & Grill',
    'Crazy Horse',
    'Darn Good Soup',
    'El Norteno',
    'Opie Taylors',
    'Runcible Spoon',
    'Subway'
  ]

  UglyConditions = [
    "Drizzle",
    "Rain",
    "Snow",
    "Snow Grains",
    "Ice Crystals",
    "Ice Pellets",
    "Hail",
    "Mist",
    "Fog",
    "Fog Patches",
    "Smoke",
    "Volcanic Ash",
    "Widespread Dust",
    "Sand",
    "Haze",
    "Spray",
    "Dust Whirls",
    "Sandstorm",
    "Low Drifting Snow",
    "Low Drifting Widespread Dust",
    "Low Drifting Sand",
    "Blowing Snow",
    "Blowing Widespread Dust",
    "Blowing Sand",
    "Rain Mist",
    "Rain Showers",
    "Snow Showers",
    "Snow Blowing Snow Mist",
    "Ice Pellet Showers",
    "Hail Showers",
    "Small Hail Showers",
    "Thunderstorm",
    "Thunderstorms and Rain",
    "Thunderstorms and Snow",
    "Thunderstorms and Ice Pellets",
    "Thunderstorms with Hail",
    "Thunderstorms with Small Hail",
    "Freezing Drizzle",
    "Freezing Rain",
    "Freezing Fog"
  ]

  robot.respond /lunch/i, (msg) ->
     msg.http("http://api.wunderground.com/api/20653698ddd9aa70/conditions/q/IN/Bloomington.json")
          .get() (err, res, body) ->
              if err
                  console.log( "we had an error: #{err}")
              else
                  data = JSON.parse(body)
                  weather = data.current_observation.weather
                  temp = data.current_observation.temp_f
                  feelslike = data.current_observation.feelslike_f

                  if feelslike > 20 and weather.indexOf("Rain") == -1
                    places = closePlaces.concat mediumPlaces
                    places = places.concat farPlaces
                    place = msg.random places
                    message = "Weather seems nice, why don't you go to #{place}"
                    msg.send message
                  else
                    place = msg.random closePlaces
                    message = "It is less than 45 degrees and/or the weather conditions include rain, I beleve you should go to #{place}"
                    msg.send message

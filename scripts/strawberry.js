// Description:
//   Tells you about the strawberry festival
// Commands:
//   strawberry festival - Tells you about the strawberry festival

(function() {
  module.exports = function(robot) {

    var upcomingPrefixes = [
        'The Strawberry Festival is coming',
        'The Strawberry Festival is',
        'Well the festival starts',
        'You can attend the festival'
    ];

    var pastPrefixes = [
        'Uh-oh, you missed the festival. It was',
        'You\'ll have to wait until next year. The festival was',
        'The Strawberry Festival was',
        'The Strawberry Festival occurred',
        'I really enjoyed my strawberry shortcake'
    ];

    var randomMessages = [
        'I agree with you',
        'Strawberries are delicious',
        'Did you know the the strawberry is not a botanical berry, but an aggregate accessory fruit',
        'In 2011 the United States produced 1.3 million tons of strawberries',
        'In Sweden, strawberries are a traditional dessert served on Midsummer Eve',
        'In Greece, strawberries are usually sprinkled with sugar and then dipped in Metaxa, a famous brandy, and served as a dessert',
        'One serving (100 g) of strawberries contains approximately 33 kilocalories',
        'Strawberry shortcake is the most famous dessert made with shortcake',
        'Japanese-style strawberry shortcakes use a sponge cake base, and are a popular Christmas treat in Japan',
        'A variety of strawberry shortcake still being enjoyed in the South calls for pie crust in rounds or broken-up pieces instead of shortcake',
        'The first strawberry shortcake recipe appeared in an English cookbook as early as 1588',
        'By 1850, strawberry shortcake was a well-known biscuit and fruit dessert served hot with butter and sweetened cream',
        'Although the festival is on May 07, traditionally June 14 is recognized as Strawberry Shortcake Day in the United States',
        'It wasn\'t until 1910 that French pastry chefs replaced the topping with heavy whipped cream'
    ];

    var moment = require('moment');
    var festival_date = moment('2015-05-07');

    return robot.respond(/.*strawberry festival.*/i, function(msg) {
        var response;

        if (msg.message.match(/when/)) {
            var prefix = msg.random(upcomingPrefixes);
            if (festival_date.diff(moment()) < 0)
                prefix = msg.random(pastPrefixes);
            response = prefix + ' ' + festival_date.fromNow();
        }
        else
            response = msg.random(randomMessages);
        return msg.send(response);
    });
  };
}).call(this);

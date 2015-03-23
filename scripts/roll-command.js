
(function() {
  module.exports = function(robot) {

    var slack = require("../lib/slack-hook.js") ;

    function roll(req, res, next) {
      if (req.body.token != 'WrOusoq3GOnqv7yEh2wwJ3Pl') {
        res.sendStatus(403);
        return;
      }

      res.status(200);
      var text = req.body.text;
      var match = text.match(dice_regex);
      if (!match) {
        res.send("I don't understand `" + text + "`");
        return;
      }

      var quantity = parseInt(match[1] || '1');
      var dice = parseInt(match[2]);
      var result = rollDice(quantity, dice);

      if (req.body.channel_name == 'directmessage') {
        res.send(result);
        return;
      }

      text = '' + quantity + 'd' + dice;
      res.end();
      setTimeout(function () {
        slack.send(
          '_rolls ' + text + '_ : ' + result,
          '#' + req.body.channel_name,
          req.body.user_name,
          process.env.HEROKU_URL + '/images/die.png');
      }, 250);
    };

    function rollDice(q, d) {
      if (q == 1) {
        return '*' + rollOne(d) + '*';
      }
      else {
        var result = [];
        var sum = 0;
        for (var i = 0; i < q; i++) {
          result.push(rollOne(d));
          sum += result[i];
        }
        return '*' + sum + '*  [' + result + ']';
      }
    }

    function rollOne(d) {
      return Math.floor((Math.random() * d) + 1);
    }

    return robot.router.post('command/roll', roll);
  };
}).call(this);

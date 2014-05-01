/**
 * AuthController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var passport = require('passport');
module.exports = {
  login: function(req, res){
    passport.authenticate('local', function(err, user, info){
      if ((err) || (!user)) res.send(err);
      req.logIn(user, function(err){
        if (err) res.send(err);
        return res.send({ message: 'login successful' });
      });
    })(req, res);
  },
  logout: function (req,res){
    req.logout();
    res.send('logout successful');
  }
}

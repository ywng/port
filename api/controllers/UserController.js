/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/user/create`
   */
   create: function (req, res) {
    var params = req.params.all();
    User.create(params, function(err, user){
      if (err){ res.send(500, err); }else{
        if(sails.config.user.requireUserActivation){
          sails.log.debug("require activation");
          var emailTemplate = res.render('email/email.ejs', {user: user,server:sails.config.server.server_url}, function(err, list){  

            nodemailer.send({
              name:       user.firstName + ' ' + user.lastName,
              from:       sails.config.nodemailer.from,
              to:         user.email,
              subject:       'New Account Acivation Required',
              messageHtml: list
            }, function(err, response){
              sails.log.debug('nodemailer sent', err, response);
            });

            res.send(200, user);

          });
        }else{
          sails.log.debug("didn't require activation");
          res.send(200, user);
        }
      }
    });
  },


  /**
   * Action blueprints:
   *    `/user/activate`
   */
   activate: function (req, res) {
    
    var params = req.params.all();

    sails.log.debug('activation action');
    
    //Activate the user that was requested.
    User.update({
      id: params.id,
      activationToken: params.token
    },{
      activated: true
    }, function(err, user) {
      // Error handling
      if (err) {
        sails.log.debug(err);
        res.send(500, err);
      // Updated users successfully!
      } else {
        sails.log.debug("User activated:", user);
        res.send(200, user);
      }
    });

  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  //_config: {}

  
};

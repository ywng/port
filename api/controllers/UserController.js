/**
 * UserController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  
  create: function(req, res){
    var params = req.params.all();
    User.create(params, function(err, user){
      if (err){ res.send(500, err); }else{
        if(sails.config.user.requireUserActivation){
          var emailTemplate = res.render('email/email.ejs', {user: user}, function(err, list){  

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
          res.send(200, user);
        }
      }
    });
  },

/**
 * Activates a given user based on the
 * ID and activationToken provided
 */
  activate: function(req, res){
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

  }
}

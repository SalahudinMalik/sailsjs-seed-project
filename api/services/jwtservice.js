var jwt = require('jsonwebtoken');

module.exports = {
	'sign': function(payload) {
		return jwt.sign({
			data: payload
		}, sails.config.secret, {expiresIn: 30});
	},
	'verify': function(token, callback) {
		jwt.verify(token, sails.config.secret, callback);
    },
    fn: async function (inputs, exits) {

        // Run the query
        var users = await User.find({
          active: true,
          lastLogin: { '>': inputs.activeSince }
        })
        .sort('lastLogin DESC')
        .limit(inputs.numUsers);
    
        // If no users were found, trigger the `noUsersFound` exit.
        if (users.length === 0) {
          throw 'noUsersFound';
        }
    
        // Otherwise return the records through the `success` exit.
        return exits.success(users);
    
      }
    
};
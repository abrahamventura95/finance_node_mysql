module.exports = function(app) {
	var controller = require('../Controllers/user');
	app.route('/users')
	  	.get(controller.getUsers);	  	
	app.route('/user')
	  	.post(controller.createUser);
};

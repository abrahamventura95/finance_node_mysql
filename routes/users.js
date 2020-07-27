module.exports = function(app) {
	var controller = require('../Controllers/user');
	app.route('/users')
	  	.get(controller.getUsers);	  	
	app.route('/register')
	  	.post(controller.createUser);
	app.route('/login')
	  	.post(controller.login);  	
};

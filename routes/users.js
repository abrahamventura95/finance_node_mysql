var controller = require('../Controllers/user');
var auth = require('../Middleware/auth');

module.exports = function(app) {	
	app.route('/user')
	  	.get(auth.auth, controller.getUser)
		.put(auth.auth, controller.edit)
		.delete(auth.auth, controller.delete);
	app.route('/users')
	  	.get(controller.getUsers);	  	
	app.route('/register')
	  	.post(controller.createUser);
	app.route('/login')
	  	.post(controller.login); 
	app.route('/logout')
	  	.put(auth.auth, controller.logout);
	app.route('/history')
		.delete(auth.auth, controller.dltHistory);
};

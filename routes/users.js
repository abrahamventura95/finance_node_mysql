module.exports = function(app) {
	var controller = require('../Controllers/user');
	app.route('/perfil')
	  	.get(controller.getUser);
	app.route('/users')
	  	.get(controller.getUsers);	  	
	app.route('/register')
	  	.post(controller.createUser);
	app.route('/login')
	  	.post(controller.login); 
	app.route('/logout')
	  	.put(controller.logout);
	app.route('/user')
		.put(controller.edit);	
};

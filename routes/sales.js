module.exports = function(app) {
	var controller = require('../Controllers/sales');	
	app.route('/sale')
	  	.post(controller.create);
	app.route('/sales')
		.get(controller.get);
};
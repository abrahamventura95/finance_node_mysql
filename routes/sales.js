module.exports = function(app) {
	var controller = require('../Controllers/sales');	
	app.route('/sale')
	  	.post(controller.create);
};
module.exports = function(app) {
	var controller = require('../Controllers/moves');	
	app.route('/move')
	  	.post(controller.create);
};

var controller = require('../Controllers/coins');	

module.exports = function(app) {
	app.route('/coin')
		.get(controller.get)
	  	.post(controller.create)
	  	.put(controller.edit)
	  	.delete(controller.delete);
	app.route('/coins')
		.get(controller.getAll);
};
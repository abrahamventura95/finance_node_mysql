module.exports = function(app) {
	var controller = require('../Controllers/moves');	
	app.route('/move')
	  	.post(controller.create);
	app.route('/moves')
		.get(controller.get);
	app.route('/graphs')
		.get(controller.getAll);
	app.route('/moves_date')
		.get(controller.getByDate);	
	app.route('/moves_month')
		.get(controller.getCntM);	
	app.route('/moves_balance')
		.get(controller.balance);	
};

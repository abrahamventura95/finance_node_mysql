var controller = require('../Controllers/moves');	

module.exports = function(app) {
	app.route('/move')
	  	.post(controller.create)
	  	.put(controller.edit)
	  	.delete(controller.delete);
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
	app.route('/moves_range')
		.get(controller.range);	
	app.route('/moves_tag')
		.get(controller.tag);	
	app.route('/moves_amount')
		.get(controller.amount);	
};

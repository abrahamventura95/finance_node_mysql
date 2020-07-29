module.exports = function(app) {
	var controller = require('../Controllers/sales');	
	app.route('/sale')
	  	.post(controller.create);
	app.route('/sales')
		.get(controller.get);
	app.route('/sales_date')
		.get(controller.getByDate);	
	app.route('/sales_month')
		.get(controller.getCntM);
	app.route('/sales_balance')
		.get(controller.balance);
};
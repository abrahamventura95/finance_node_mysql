var controller = require('../Controllers/sales');	
var auth = require('../Middleware/auth');

module.exports = function(app) {
	app.route('/sale')
	  	.post(auth.auth, controller.create)
	  	.put(controller.edit)
	  	.delete(controller.delete);
	app.route('/sales')
		.get(auth.auth, controller.get);
	app.route('/sales_date')
		.get(auth.auth, controller.getByDate);	
	app.route('/sales_month')
		.get(auth.auth, controller.getCntM);
	app.route('/sales_balance')
		.get(auth.auth, controller.balance);
	app.route('/sales_range')
		.get(auth.auth, controller.range);
	app.route('/sales_product')
		.get(auth.auth, controller.product);
	app.route('/sales_amount')
		.get(auth.auth, controller.amount);	
};
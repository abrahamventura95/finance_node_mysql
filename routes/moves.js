var controller = require('../Controllers/moves');	
var auth = require('../Middleware/auth');

module.exports = function(app) {
	app.route('/move')
	  	.post(auth.auth, controller.create)
	  	.put(controller.edit)
	  	.delete(controller.delete);
	app.route('/moves')
		.get(auth.auth, controller.get);
	app.route('/graphs')
		.get(auth.auth, controller.getAll);
	app.route('/moves_date')
		.get(auth.auth, controller.getByDate);	
	app.route('/moves_month')
		.get(auth.auth, controller.getCntM);	
	app.route('/moves_balance')
		.get(auth.auth, controller.balance);	
	app.route('/moves_range')
		.get(auth.auth, controller.range);	
	app.route('/moves_tag')
		.get(auth.auth, controller.tag);	
	app.route('/moves_amount')
		.get(auth.auth, controller.amount);	
};

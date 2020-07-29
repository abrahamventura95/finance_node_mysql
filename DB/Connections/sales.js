var DBHelper = require('../helper');

exports.create = function (data,callback) {
	var sqlQuery = "INSERT INTO money_sales												\
								(user,coin,type,tag,product,quantity,amount,date)		\
					VALUES ('" + data.email+ "',										\
							'" + data.coin + "',										\
							'" + data.type + "',										\
							'" + data.tag  + "',										\
							'" + data.product  + "',									\
							'" + data.quantity  + "',									\
							'" + data.amount + "',										\
							'" + data.date + "')";
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}
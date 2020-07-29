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

exports.get = function (data,callback) {
	var sqlQuery = "SELECT coin, tag, product, quantity, amount, date		\
					FROM	money_sales										\
					WHERE user ='"+ data.email + "'	AND						\
						  type = '" + data.type + "'						\
					ORDER BY date DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.getByDate = function (data,callback) {
	var sqlQuery = "SELECT coin, tag, product, quantity, amount, date		\
					FROM	money_sales										\
					WHERE user ='" + data.email +"'	AND						\
						  type ='" + data.type +"'   AND					\
						  date(date) = '"+data.date+"'						\
					ORDER BY date DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}
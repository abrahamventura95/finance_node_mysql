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
	var sqlQuery = "SELECT id, coin, tag, product, quantity, amount, date	\
					FROM	money_sales										\
					WHERE user ='"+ data.email + "'	AND						\
						  type = '" + data.type + "'						\
					ORDER BY date DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.getByDate = function (data,callback) {
	var sqlQuery = "SELECT id, coin, tag, product, quantity, amount, date	\
					FROM	money_sales										\
					WHERE user ='" + data.email +"'	AND						\
						  type ='" + data.type +"'   AND					\
						  date(date) = '"+data.date+"'						\
					ORDER BY date DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.getCntM = function (data,callback){
	var sqlQuery = "SELECT id, coin, tag, product, quantity, amount, date	\
					FROM	money_sales										\
					WHERE user ='" + data.email +"'				AND			\
						  type ='" + data.type +"'   			AND			\
						  YEAR(date) = YEAR(CURRENT_DATE())		AND			\
						  MONTH(date) = MONTH(CURRENT_DATE())				\
					ORDER BY date DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});	
}

exports.balance = function (email,callback){
	var sqlQuery = "SELECT (t1.totals - t2.totals) as balance, 	\
							t1.totals as income,				\
							t2.totals as outflow				\
					FROM										\
						(SELECT SUM(amount) as totals			\
						 FROM money_sales						\
						 WHERE user ='" + email +"' AND			\
						 	   type = 'income') as t1, 			\
						(SELECT SUM(amount) as totals			\
						 FROM money_sales						\
						 WHERE user ='" + email +"' AND			\
						 	   type = 'outflow') as t2;" 			
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});	
}

exports.getByRange = function (data,callback) {
	var sqlQuery = "SELECT id, coin, tag, product, quantity, amount, date	\
					FROM	money_sales										\
					WHERE user ='" + data.email +"'	AND						\
						  date(date) BETWEEN '"+data.begin+"'	AND			\
						  					 '"+data.end +"'				\
					ORDER BY date DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.getByProduct = function (data,callback) {
	var sqlQuery = "SELECT id, coin, type, product, quantity, amount, date	\
					FROM	money_sales										\
					WHERE user ='" + data.email +"'	AND						\
						  product LIKE '%"+data.product+"%'					\
					ORDER BY date DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.getByAmount = function (data,callback) {
	var sqlQuery = "SELECT id, coin, tag, product, quantity, type, amount, date	\
					FROM	money_sales											\
					WHERE user ='" + data.email +"'	AND							\
						  amount = '"+data.amount+"'							\
					ORDER BY date DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.edit = function (data, callback){
	var sqlQuery = "UPDATE `money_sales` SET  				\
					`tag` ='" + data.tag + "',				\
					`product` ='" + data.product + "',		\
					`quantity` ='" + data.quantity + "',	\
					`amount` ='" + data.amount + "',		\
					`date` ='" + data.date + "'				\
					WHERE `id`='" + data.id + "'";
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
};
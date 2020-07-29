var DBHelper = require('../helper');

exports.create = function (data,callback) {
	var sqlQuery = "INSERT INTO money_move (user,coin,type,tag,amount,date)		\
					VALUES ('" + data.email+ "',								\
							'" + data.coin + "',								\
							'" + data.type + "',								\
							'" + data.tag  + "',								\
							'" + data.amount + "',								\
							'" + data.date + "')";
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.get = function (data,callback) {
	var sqlQuery = "SELECT coin, tag, amount, date		\
					FROM	money_move					\
					WHERE user ='"+ data.email + "'	AND	\
						  type = '" + data.type + "'	\
					ORDER BY date DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.getAll = function (email,callback) {
	var sqlQuery = "SELECT coin, tag, amount, date, type		\
					FROM	money_move							\
					WHERE user ='"+ email + "'					\
					ORDER BY date, type DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.getByDate = function (data,callback) {
	var sqlQuery = "SELECT coin, tag, amount, date				\
					FROM	money_move							\
					WHERE user ='" + data.email +"'	AND			\
						  type ='" + data.type +"'   AND			\
						  date(date) = '"+data.date+"'			\
					ORDER BY date DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.getCntM = function (data,callback){
	var sqlQuery = "SELECT coin, tag, amount, date						\
					FROM	money_move									\
					WHERE user ='" + data.email +"'				AND		\
						  type ='" + data.type +"'   			AND		\
						  YEAR(date) = YEAR(CURRENT_DATE())		AND		\
						  MONTH(date) = MONTH(CURRENT_DATE())	AND		\
					ORDER BY date DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});	
}

exports.balance = function (email,callback){
	var sqlQuery = "SELECT (t1.totals - t2.totals) as balance	\
					FROM										\
						(SELECT SUM(amount) as totals			\
						 FROM money_move						\
						 WHERE user ='" + email +"' AND			\
						 	   type = 'income') as t1, 			\
						(SELECT SUM(amount) as totals			\
						 FROM money_move						\
						 WHERE user ='" + email +"' AND			\
						 	   type = 'outflow') as t2;" 			
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});	
}
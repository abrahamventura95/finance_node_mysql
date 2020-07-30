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
	var sqlQuery = "SELECT id, coin, tag, amount, date		\
					FROM	money_move						\
					WHERE user ='"+ data.email + "'	AND		\
						  type = '" + data.type + "'		\
					ORDER BY date DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.getAll = function (email,callback) {
	var sqlQuery = "SELECT id, coin, tag, amount, date, type		\
					FROM	money_move								\
					WHERE user ='"+ email + "'						\
					ORDER BY date, type DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.getByDate = function (data,callback) {
	var sqlQuery = "SELECT id, coin, tag, amount, date				\
					FROM	money_move								\
					WHERE user ='" + data.email +"'	AND				\
						  type ='" + data.type +"'   AND			\
						  date(date) = '"+data.date+"'				\
					ORDER BY date DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.getCntM = function (data,callback){
	var sqlQuery = "SELECT id, coin, tag, amount, date						\
					FROM	money_move										\
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

exports.getByRange = function (data,callback) {
	var sqlQuery = "SELECT id, coin, tag, amount, date					\
					FROM	money_move									\
					WHERE user ='" + data.email +"'	AND					\
						  date(date) BETWEEN '"+data.begin+"'	AND		\
						  					 '"+data.end +"'			\
					ORDER BY date DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.getByTag = function (data,callback) {
	var sqlQuery = "SELECT id, coin, type, amount, date			\
					FROM	money_move							\
					WHERE user ='" + data.email +"'	AND			\
						  tag LIKE '%"+data.tag+"%'				\
					ORDER BY date DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.getByAmount = function (data,callback) {
	var sqlQuery = "SELECT id, coin, tag ,type, amount, date	\
					FROM	money_move							\
					WHERE user ='" + data.email +"'	AND			\
						  amount = '"+data.amount+"'			\
					ORDER BY date DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.edit = function (data, callback){
	var sqlQuery = "UPDATE `money_move` SET  				\
					`tag` ='" + data.tag + "',				\
					`amount` ='" + data.amount + "',		\
					`date` ='" + data.date + "'				\
					WHERE `id`='" + data.id + "'";
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
};

exports.delete = function (id, callback){
	var sqlQuery = "DELETE FROM `money_move` 		\
					WHERE `id`='" + id + "'";
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
};
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

exports.getIncome = function (email,callback) {
	var sqlQuery = "SELECT coin, tag, amount, date	\
					FROM	money_move				\
					WHERE user ='"+ email + "'	AND	\
						  type = 'income'			\
					ORDER BY date DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}
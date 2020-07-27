var DBHelper = require('../helper');

exports.existsCoin = function(name,callback) {
	var sqlQuery = "SELECT COUNT(coin.name) as value	\
					FROM coin							\
					WHERE `coin`.`name` = '" + name+"'";
	DBHelper.doQuery(sqlQuery, function(err,data) {
		callback(err,data);
	});
};
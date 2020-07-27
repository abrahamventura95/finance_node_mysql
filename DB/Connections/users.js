var DBHelper = require('../helper');

exports.getUsers = function(callback) {
	var sqlQuery = "SELECT user.email, user.full_name, user.type, user.gender	\
					FROM user													\
					Order by user.type";
	DBHelper.doQuery(sqlQuery, function(err,data) {
		callback(err,data);
	});
};

exports.existsEmail = function(email,callback) {
	var sqlQuery = "SELECT COUNT(user.email) as value	\
					FROM user							\
					WHERE `user`.`email` = '" + email+"'";
	DBHelper.doQuery(sqlQuery, function(err,data) {
		callback(err,data);
	});
};

exports.createUser = async function(data, callback) {
  	var sqlQuery = "INSERT INTO user (full_name,email,password,type,coin,gender)			\
				VALUES ('" + data.full_name + "',											\
				'" + data.email + "',														\
				'" + data.password + "',													\
				'" + data.type + "',														\
				'" + data.coin + "',														\
				'" + data.gender + "')";
	DBHelper.doQuery(sqlQuery, function(err,data_result) {
		callback(err,data_result);
	});
	//var hash = bcrypt.hashSync(datos.password, 10);
	
};
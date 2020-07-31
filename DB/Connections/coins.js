var DBHelper = require('../helper');

exports.existsCoin = function(name,callback) {
	var sqlQuery = "SELECT COUNT(coin.name) as value	\
					FROM coin							\
					WHERE `coin`.`name` = '" + name+"'";
	DBHelper.doQuery(sqlQuery, function(err,data) {
		callback(err,data);
	});
};

exports.create = function (data,callback) {
	var sqlQuery = "INSERT INTO coin (name,cu_conver)		\
					VALUES ('" + data.name + "',			\
							'" + data.cu_conver + "')";
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.get = function (name,callback) {
	var sqlQuery = "SELECT name, cu_conver			\
					FROM	coin					\
					WHERE name ='"+ name + "'		\
					ORDER BY name DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.getAll = function (callback) {
	var sqlQuery = "SELECT name, cu_conver  \
					FROM	coin			\
					ORDER BY name DESC";	
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
}

exports.edit = function (data, callback){
	var sqlQuery = "UPDATE `coin` SET  						\
					`cu_conver` ='" + data.cu_conver + "'	\
					WHERE `name`='" + data.name + "'";
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
};

exports.delete = function (name, callback){
	var sqlQuery = "DELETE FROM `coin` 		\
					WHERE `name`='" + name + "'";
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
};
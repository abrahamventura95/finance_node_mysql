var DBHelper = require('../helper');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcrypt');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.secretOrKey || 'secret';

exports.logOut = function (email, callback){
	var sqlQuery = "UPDATE `user` SET  						\
					`user`.`token` =NULL,					\
					`user`.`status` = '0'					\
					WHERE `user`.`email`='"+email+"'";
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
};

exports.postLogin = function (obj, callback){
	var sqlQuery = "UPDATE `user` SET  						\
					`user`.`token` ='"+obj.token+"',		\
					`user`.`status` = '1'					\
					WHERE `user`.`email`='"+obj.email+"'";
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
};

exports.login = function (obj, callback) {
	var sqlQuery = "SELECT user.email, user.password, user.full_name, user.type, 	\
					user.gender, user.coin											\
					FROM user														\
					WHERE `user`.`email` = '" + obj.email+"'";
	DBHelper.doQuery(sqlQuery, function(err,data) {
		if(data.length == 0){
			message = {
	          "code": 400,
	          "msg":"Unregistered email"
	        };
		}else{
	        var x = obj.password;
	        var y = data[0].password;
			if (!bcrypt.compareSync(x, y)) {
				message ={
					"code": 400,
					"msg":"Wrong password"
				};
			}else{
				let payload = {sub: data[0].email, type: data[0].type};
				let token = jwt.sign(payload, jwtOptions.secretOrKey);
				message = { 
		    		"code":200,
		      		"success": "login sucessfull",
		      		"token": token,
		      		"name": data[0].full_name,
		      		"email": data[0].email,
		      		"tipo": data[0].type,
		      		"gender": data[0].gender,
		      		"coin": data[0].coin
		    	};	
			}
		}
	  callback(err,message);
	});
};

exports.getUsers = function(callback) {
	var sqlQuery = "SELECT user.email, user.full_name, user.type, user.gender	\
					FROM user													\
					Order by user.type";
	DBHelper.doQuery(sqlQuery, function(err,data) {
		callback(err,data);
	});
};

exports.getUser = function(email,callback) {
	var sqlQuery = "SELECT user.email, user.full_name, user.type, 	\
						   user.gender, user.coin					\
					FROM user										\
					WHERE `user`.`email` = '" + email+"'";
	DBHelper.doQuery(sqlQuery, function(err,data) {
		console.log(data);
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
};


exports.edit = function(obj, callback) {
	console.log('test1');
	if(obj.password == null){
		var sqlQuery = "UPDATE `user` SET  								\
					`user`.`full_name` ='"+obj.full_name+"',		\
					`user`.`coin` ='"+obj.coin+"',					\
					`user`.`gender` ='"+obj.gender+"'				\
					WHERE `user`.`email`='"+obj.email+"'";
		DBHelper.doQuery(sqlQuery, function(err,data) {
			callback(err,data);
		});
	}else{
	  	var sqlQuery = "UPDATE `user` SET  								\
						`user`.`full_name` ='"+obj.full_name+"',		\
						`user`.`coin` ='"+obj.coin+"',					\
						`user`.`gender` ='"+obj.gender+"',				\
						`user`.`password` ='"+obj.password+"'			\
						WHERE `user`.`email`='"+obj.email+"'";
		DBHelper.doQuery(sqlQuery, function(err,data) {
			callback(err,data);
		});
	}
};

exports.dltHistoryS = function (email, callback){
	var sqlQuery = "DELETE FROM `money_sales`   		\
					WHERE `user`='"+email+"'";
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
};

exports.dltHistoryM = function (email, callback){
	var sqlQuery = "DELETE FROM `money_move`   		\
					WHERE `user`='"+email+"'";
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
};

exports.delete = function (email, callback){
	var sqlQuery = "DELETE FROM `user`   		\
					WHERE `email`='"+email+"'";
	DBHelper.doQuery(sqlQuery, function(err,data){
		callback(err,data);
	});
};

var user_queries = require('../DB/Connections/users');
var coin_queries = require('../DB/Connections/coins');

exports.findRegisteredEmail = function(email, callback){
	user_queries.existsEmail(email,function(err,data){
		callback(data[0].value);
	});
}

exports.findExistingCoin = function(coin, callback){
	coin_queries.existsCoin(coin,function(err,data){
		callback(data[0].value);
	});
}
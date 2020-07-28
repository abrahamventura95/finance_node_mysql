var queries = require('../DB/Connections/moves');
var validator = require('validator');
var user_queries = require('../DB/Connections/users');
var coin_queries = require('../DB/Connections/coins');

function findRegisteredEmail(email, callback){
	user_queries.existsEmail(email,function(err,data){
		callback(data[0].value);
	});
}

function findExistingCoin(coin, callback){
	coin_queries.existsCoin(coin,function(err,data){
		callback(data[0].value);
	});
}

function validate(body, callback) {
	//Empty validation
	if(validator.isEmpty(body.email))
		 callback('Email is required');
	if(validator.isEmpty(body.type))
		 callback('Type is required');
	if(validator.isEmpty(body.coin))
		 callback('Coin is required');
	if(validator.isEmpty(body.amount))
		 callback('Amount is required');
	if(!validator.isFloat(body.amount))
		 callback('Amount most be a number');
	if(!validator.isIn(body.type,['income','outflow']))
		 callback('Type is wrong');
	findRegisteredEmail(body.email,function(value){
		if(value == 0){
			callback('Unregistered email');
		}else{
			findExistingCoin(body.coin,function(value){
				if(value == 0){
					callback('Unregistered coin');
				}else{
					callback('pass');
				}
			});
		}
	});
};

exports.create = function (req,res) {
	validate(req.body,function(value){
		try{
			if (value == 'pass') {
				var move = {
					email: req.body.email,
				    coin: req.body.coin,
				    type: req.body.type,
					tag: req.body.tag,
					amount: req.body.amount,
					date: req.body.date
				};
				queries.create(move,function(err,data){
					res.json(data);
				});
			}
			else 
				throw Error(value);
		}catch(err){
			obj = {
				error: 400,
				msg: err.message
			};
			res.json(obj);
		}
	});
}
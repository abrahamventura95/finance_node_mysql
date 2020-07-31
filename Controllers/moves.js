var queries = require('../DB/Connections/moves');
var fun = require('./functions');
var validator = require('validator');

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
		 callback('Amount must be a number');
	if(!validator.isIn(body.type,['income','outflow']))
		 callback('Type is wrong');
	fun.findRegisteredEmail(body.email,function(value){
		if(value == 0){
			callback('Unregistered email');
		}else{
			fun.findExistingCoin(body.coin,function(value){
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
					email: req.user.sub,
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

exports.get = function(req,res){
	var obj = {
		email: req.user.sub,
		type: req.param('type')
	};
	queries.get(obj, function(err,data){
		res.json(data);
	});
}

exports.getAll = function(req,res){
	queries.getAll(req.user.sub, function(err,data){
		res.json(data);
	});
}

exports.getByDate = function(req,res){
	var obj = {
		email: req.user.sub,
		date: req.param('date'),
		type: req.param('type')
	};
	queries.getByDate(obj, function(err,data){
		res.json(data);
	});
}

exports.getCntM = function(req,res){
	var obj = {
		email: req.user.sub,
		type: req.param('type')
	};
	queries.getCntM(obj, function(err,data){
		res.json(data);
	});
}

exports.balance = function(req,res){
	queries.balance(req.user.sub, function(err,data){
		res.json(data);
	});
}

exports.range = function(req,res){
	var obj = {
		email: req.user.sub,
		date: req.param('begin'),
		end: req.param('end')
	};
	queries.getByRange(obj, function(err,data){
		res.json(data);
	});
}

exports.tag = function(req,res){
	var obj = {
		email: req.user.sub,
		tag: req.param('tag')
	};
	queries.getByTag(obj, function(err,data){
		res.json(data);
	});
}

exports.amount = function(req,res){
	var obj = {
		email: req.user.sub,
		amount: req.param('amount')
	};
	queries.getByAmount(obj, function(err,data){
		res.json(data);
	});
}

exports.edit = function(req,res){
	var obj = {
		id: req.param('id'),
		tag: req.body.tag,
		date: req.body.date,
		amount: req.body.amount
	};
	queries.edit(obj,function(err,data){
		res.json(data);
	});
}

exports.delete = function(req,res){
	queries.delete(req.param('id'),function(err,data){
		res.json(data);
	});
}
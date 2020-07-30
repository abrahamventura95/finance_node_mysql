var queries = require('../DB/Connections/sales');
var fun = require('./functions');
var validator = require('validator');

function validate(body,callback) {
	//Empty validation
	if(validator.isEmpty(body.email))
		 callback('Email is required');
	if(validator.isEmpty(body.type))
		 callback('Type is required');
	if(validator.isEmpty(body.coin))
		 callback('Coin is required');
	if(validator.isEmpty(body.product))
		 callback('Product is required');
	if(validator.isEmpty(body.quantity))
		 callback('Quantity is required');
	if(validator.isEmpty(body.amount))
		 callback('Amount is required');
	if(!validator.isFloat(body.amount))
		 callback('Amount most be a number');
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
}

exports.create = function (req,res) {
	validate(req.body,function(value){
		try{
			if (value == 'pass') {
				var sale = {
					email: req.body.email,
				    coin: req.body.coin,
				    type: req.body.type,
					tag: req.body.tag,
					amount: req.body.amount,
					product: req.body.product,
					quantity: req.body.quantity,
					date: req.body.date
				};
				queries.create(sale,function(err,data){
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

exports.get = function (req,res){
	var obj = {
		email: req.param('email'),
		type: req.param('type')
	};
	queries.get(obj,function(err,data){
		res.json(data);
	});
}

exports.getByDate = function(req,res){
	var obj = {
		email: req.param('email'),
		date: req.param('date'),
		type: req.param('type')
	};
	queries.getByDate(obj, function(err,data){
		res.json(data);
	});
}

exports.getCntM = function(req,res){
	var obj = {
		email: req.param('email'),
		type: req.param('type')
	};
	queries.getCntM(obj, function(err,data){
		res.json(data);
	});
}

exports.balance = function(req,res){
	var email = req.param('email');
	queries.balance(email, function(err,data){
		res.json(data);
	});
}

exports.range = function(req,res){
	var obj = {
		email: req.param('email'),
		date: req.param('begin'),
		end: req.param('end')
	};
	queries.getByRange(obj, function(err,data){
		res.json(data);
	});
}
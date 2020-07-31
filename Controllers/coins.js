var queries = require('../DB/Connections/coins');
var fun = require('./functions');
var validator = require('validator');

function validate(body,callback) {
	//Empty validation
	if(validator.isEmpty(body.name))
		 callback('Name is required');
	if(validator.isEmpty(body.cu_conver))
		 callback('Current conver value is required');
	if(!validator.isFloat(body.cu_conver))
		 callback('Current conver value must be a number');
	fun.findExistingCoin(body.name,function(value){
		if(value == 1){
			callback('Registered coin');
		}else{
			callback('pass');
		}
	});
}

exports.create = function (req,res) {
	validate(req.body,function(value){
		try{
			if (value == 'pass') {
				var coin = {
				    name: req.body.name,
				    cu_conver: req.body.cu_conver
				};
				queries.create(coin,function(err,data){
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
	queries.get(req.param('name'),function(err,data){
		res.json(data);
	});
}

exports.getAll = function (req,res){
	queries.getAll(function(err,data){
		res.json(data);
	});
}

exports.edit = function(req,res){
	var obj = {
		name: req.param('name'),
		cu_conver: req.body.cu_conver
	};
	queries.edit(obj,function(err,data){
		res.json(data);
	});
}

exports.delete = function(req,res){
	queries.delete(req.param('name'),function(err,data){
		res.json(data);
	});
}
var user_queries = require('../DB/Connections/users');
var fun = require('./functions');
var validator = require('validator');
var bcrypt = require('bcrypt');

function validateRegister(body,callback) {
	//Empty validation
	if(validator.isEmpty(body.email))
		 callback('Email is required');
	if(validator.isEmpty(body.password))
		 callback('Password is required');
	if(validator.isEmpty(body.password_confirm))
		 callback('Password confirm is required');
	if(validator.isEmpty(body.full_name))
		 callback('Name is required');

	//Conditional validations
	if(!validator.isEmail(body.email) )
		 callback('Invalid email');
	if(!validator.isLength(body.password, {min:6}))
		 callback('The password must be at least 6 characters');
	if(!validator.matches(body.password, body.password_confirm) ||
						  validator.isEmpty(body.password_confirm))
		 callback('The passwords do not match');
	if(!validator.isIn(body.type,['personal','business'])) 
		 callback('User\'s type is wrong');
	if(!validator.isIn(body.gender,['male','female','other']))
		 callback('User\'s gender is wrong');

	//Existing validations	
	fun.findRegisteredEmail(body.email,function(value){
		if(value == 1){
			callback('Registered email');
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

function validateUpdate(body,callback) {
	//Empty validation
	if(validator.isEmpty(body.email))
		 callback('Email is required');

	//Conditional validations
	if(body.password != undefined){
		if(!validator.isLength(body.password, {min:6}))
		 callback('The password must be at least 6 characters');
	}
	if(!validator.isIn(body.gender,['male','female','other']))
		 callback('User\'s gender is wrong');

	//Existing validations	
	fun.findExistingCoin(body.coin,function(value){
		if(value == 0){
			callback('Unregistered coin');
		}else{
			callback('pass');
		}
	});
		
};

exports.getUsers = function(req,res) {
	user_queries.getUsers(function(err,data){
		res.json(data);
	});
};

exports.createUser = function(req,res) {
	validateRegister(req.body,function(value){
		try{
			if (value == 'pass') {
				var hash = bcrypt.hashSync(req.body.password, 10);
				var user = {
					email: req.body.email,
				    full_name: req.body.full_name,
				    coin: req.body.coin,
				    type: req.body.type,
					password: hash,
					gender: req.body.gender
				};
				user_queries.createUser(user,function(err,data){
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
};

exports.login = function(req,res){
	var obj = {
	    email: req.body.email,
	    password: req.body.password
	  }
	user_queries.login(obj, function(err,data){
		if(data.code == 200){
			var temp = {
				email: req.body.email,
				token: data.token
			}
			user_queries.postLogin(temp, function(err,data){});
		}
		res.json(data);
	});
}

exports.logout = function(req,res){
	user_queries.logOut(req.body.email, function(err,data){
		res.json(data);
	});
}

exports.getUser = function(req,res) {
	var email = req.param('email');
	user_queries.getUser(email, function(err,data){
		res.json(data);
	});
};

exports.edit = function(req,res){
	var hash = null;

	if(req.body.password != undefined){
		hash = bcrypt.hashSync(req.body.password, 10);
	}
	validateUpdate(req.body,function(value){
		try{
			if(value == 'pass'){
				if(hash != null){
					var user = {
						email: req.body.email,
					    full_name: req.body.full_name,
					    coin: req.body.coin,
						password: hash,
						gender: req.body.gender
					};
					user_queries.edit(user, function(err,data){
						res.json(data);
					});
				}else{
					var user = {
						email: req.body.email,
					    full_name: req.body.full_name,
					    coin: req.body.coin,
						gender: req.body.gender
					};
					user_queries.edit(user, function(err,data){
						res.json(data);
					});
				}
			}else{
				throw Error(value);
			}
		}catch(err){
			obj = {
				error: 400,
				msg: err.message
			};
			res.json(obj);
		}
	});
}
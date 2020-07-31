const jwt = require('jsonwebtoken');

exports.auth = function(req,res,next){
    const authHeader = req.headers['authorization'];
    //console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.secretOrKey, (err, user) =>{
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
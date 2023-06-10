'use strict';

const jwt = require('jsonwebtoken');

exports.ensureAuth = (req, res, next)=>{
    if(!req.headers.authorization){
        return res.status(403).send({message: 'Doesn\'t contain headers "AUTHORIZATION"'});
    }else{
        try{
            let token = req.headers.authorization.replace(/[""]+/g, '');
            var payload = jwt.decode(token, `${process.env.SECRET_KEY}`);
            if(Math.floor(Date.now() / 1000) >= payload.exp){
                return res.status(401).send({message: 'Expired token.'});
            }
        }catch(err){
            console.error(err);
            return res.status(400).send({message: 'Invalid token.'});
        }
        req.user = payload;
        next();
    }
};

exports.isAdmin = async(req, res, next)=>{
    try{
        let user = req.user;
        if(user.role !== 'ADMIN'){
            return res.status(403).send({message: 'Not authorized.'});
        }
        next();
    }catch(err){
        console.error(err);
        return res.status(403).send({message: 'Not authorized.'});
    }
};

exports.isClient = async(req, res, next)=>{
    try{
        let user = req.user;
        if(user.role !== 'CLIENT'){
            return res.status(403).send({message: 'Not authorized.'});
        }
        next();
    }catch(err){
        console.error(err);
        return res.status(403).send({message: 'Not authorized.'});
    }
};
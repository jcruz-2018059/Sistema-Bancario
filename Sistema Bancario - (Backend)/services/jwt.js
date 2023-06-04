'use strict'

const jwt = require('jsonwebtoken');

exports.createToken = (user)=>{
    let payload = {
        sub: user.id,
        name: user.name,
        surname: user.surname,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        iat: Math.floor(Date.now()/ 1000),
        exp: Math.floor(Date.now()/ 1000) + (60 * 120)
    }
    let token = jwt.sign(payload, `${process.env.SECRET_KEY}`);
    return token;
}
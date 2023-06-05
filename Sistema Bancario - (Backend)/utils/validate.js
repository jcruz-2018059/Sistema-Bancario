'use strict';
const User = require('../src/user/user.model');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

exports.validateData = (data)=>{
    let keys = Object.keys(data), msg = '';
    for(let key of keys){
        if(data[key] !== null && data[key] !== undefined && data[key] !== ''){
            continue;
        }
        msg += `The param ${key} is required!\n`;
    }
    return msg.trim();
};

exports.encrypt = async(password)=>{
    try{
        return bcrypt.hashSync(password, 10);
    }catch(err){
        console.error(err);
        return err;
    }
};

exports.checkPassword = async(password, hash)=>{
    try{
        return await bcrypt.compare(password, hash);
    }catch(err){
        console.error(err);
        return false;
    }
};

exports.generateAccountNumber = async()=>{
    let accountNumber = '';
    for (let i = 0; i < 10; i++) {
        accountNumber += Math.floor(Math.random() * 10);
    }
    let existAccountNumber = await User.findOne({accountNumber: accountNumber});
    if(existAccountNumber){
        return this.generateAccountNumber();
    }
    return accountNumber;
};

exports.save = [
    body('email', 'Correo electrónico inválido')
        .if(body('email').exists()).notEmpty()
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('phone', 'Número de teléfono no valido, ingresa un número de 8 dígitos')
        .if(body('phone').exists()).notEmpty()
        .trim()
        .isLength({min: 8}),
    body('DPI', 'DPI no valido, ingresa un DPI de 13 dígitos')
        .if(body('DPI').exists()).notEmpty()
        .trim()
        .isLength({min: 13, max: 13})
];

exports.saveValidation = async function(req, res, next){
    try {
        let errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).send({errors: errors.array()});
        return next();
    } catch (err) {
        console.log(err);
        return res.status(400).send({err});
    }
};
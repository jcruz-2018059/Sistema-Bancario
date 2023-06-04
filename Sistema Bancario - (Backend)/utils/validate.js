'use strict'

const bcrypt = require('bcrypt');

exports.validateData = (data)=>{
    let keys = Object.keys(data), msg = '';
    for(let key of keys){
        if(data[key] !== null && data[key] !== undefined && data[key] !== ''){
            continue;
        }
        msg += `The param ${key} is required!\n`;
    }
    return msg.trim();
}

exports.encrypt = async(password)=>{
    try{
        return bcrypt.hashSync(password, 10);
    }catch(err){
        console.error(err);
        return err;
    }
}

exports.checkPassword = async(password, hash)=>{
    try{
        return await bcrypt.compare(password, hash);
    }catch(err){
        console.error(err);
        return false;
    }
}
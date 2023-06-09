const Movement = require('./movement.model');
const Service = require('../service/service.model');
const { encrypt, validateData, checkPassword, generateAccountNumber } = require('../../utils/validate');
const { createToken } = require('../../services/jwt');

exports.test = (req, res)=>{
    return res.send({message: 'Test function is running :)'});
};

exports.buy = async(req, res)=>{
    try{
        let userOrigin = req.user.accountNumber;
        let service = req.params.service;
        let existService = await Service.findOne({_id: service});
        if(existService){
            return res.status(400).send({message: 'Service does not exist.'});
        }
        let amount = existService.amount;
        console.log(amount);
        let params = {
            type: 'PUCHARSE',
            amount: amount,
            userOrigin: userOrigin,
            service: service,
            date: new Date(Date.now()).getTime()
        }
        let movement = new Movement(params);
        await movement.save();
        return res.send({message: '¡Compra satisfactoria!', movement});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error buying service.'});
    }
};
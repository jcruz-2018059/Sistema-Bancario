const Movement = require('./movement.model');
const Service = require('../service/service.model');
const User = require('../user/user.model');
const { validateData } = require('../../utils/validate');

exports.test = (req, res)=>{
    return res.send({message: 'Test function is running :)'});
};

exports.buy = async(req, res)=>{
    try{
        let service = req.params.service;
        let existService = await Service.findOne({_id: service});
        if(!existService){
            return res.status(400).send({message: 'Service does not exist.'});
        }
        let amount = existService.amount;
        let user = await User.findOne({_id: req.user.sub});
        if(user.balance < amount){
            return res.status(400).send({message: '¡No tienes los fondos necesarios para la compra!'});
        }
        let params = {
            type: 'PUCHARSE',
            amount: amount,
            userOrigin: req.user.sub,
            service: service,
            date: new Date(Date.now()).getTime()
        };
        let movement = new Movement(params);
        await movement.save();
        let savedMovement = await Movement.findOne({_id: movement._id}).populate('service').populate('userOrigin', ['name', 'surname', 'accountNumber']);
        await User.findOneAndUpdate(
            {_id: req.user.sub},
            {balance: (user.balance - amount)},
            {new: true}
        );
        return res.send({message: '¡Compra satisfactoria!', savedMovement});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error buying service.'});
    }
};

exports.transfer = async(req, res)=>{
    try{
        let data = req.body;
        let paramsReq = {
            amount: data.amount,
            userDestination: data.userDestination
        };
        let validate = validateData(paramsReq);
        if(validate){
            return res.status(400).send({validate});
        }
        let user = await User.findOne({_id: req.user.sub});
        if(user.balance < data.amount){
            return res.status(400).send({message: '¡No tienes los fondos necesarios para la transferencia!'});
        }
        let existUser = await User.findOne({accountNumber: data.userDestination});
        if(!existUser){
            return res.status(400).send({message: 'Usuario no encontrado.'});
        } 
        let params = {
            type: 'TRANSFER',
            amount: data.amount,
            userOrigin: req.user.sub,
            userDestination: Object(existUser._id).valueOf(),
            date: new Date(Date.now()).getTime()
        };
        if(data.description){
            params.description = data.description;
        }
        let movement = new Movement(params);
        await movement.save();
        let savedMovement = await Movement.findOne({_id: movement._id}).populate('userDestination', ['name', 'surname', 'accountNumber']).populate('userOrigin', ['name', 'surname', 'accountNumber']);
        await User.findOneAndUpdate(
            {_id: req.user.sub},
            {balance: (user.balance - data.amount)},
            {new: true}
        );
        await User.findOneAndUpdate(
            {_id: Object(existUser._id).valueOf()},
            {balance: (existUser.balance + data.amount)},
            {new: true}
        );
        return res.send({message: '¡Transacción satisfactoria!', savedMovement});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error transfering.', error: err.message});
    }
};
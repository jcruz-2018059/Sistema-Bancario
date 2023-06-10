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
            {balance: (user.balance - amount), movements: (user.movements + 1)},
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
            userDestination: data.userDestination,
            userDestinationDPI: data.userDestinationDPI
        };
        let validate = validateData(paramsReq);
        if(validate){
            return res.status(400).send({validate});
        }
        let user = await User.findOne({_id: req.user.sub});
        if(user.dailyTransfer >= 10000){
            return res.status(400).send({message: 'Límite de transferencias diarias superado.'});
        }
        if((user.dailyTransfer + Number(data.amount))> 10000){
            return res.status(400).send({message: 'El monto supera el límite de transferencias diarias.'});
        }
        if(user.balance < data.amount){
            return res.status(400).send({message: '¡No tienes los fondos necesarios para la transferencia!'});
        }
        if(data.amount > 2000){
            return res.status(400).send({message: 'El máximo de transferecia soportado es de Q2000.00'});
        }
        let existUser = await User.findOne({accountNumber: data.userDestination, DPI: data.userDestinationDPI});
        if(!existUser){
            return res.status(400).send({message: 'Número de cuenta o DPI inválidos.'});
        }
        if(Object(existUser._id).valueOf() === req.user.sub || existUser.DPI === req.user.DPI){
            return res.status(400).send({message: '¡No puedes transferirte a tí mismo!'});
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
            {balance: (user.balance - data.amount), dailyTransfer: (user.dailyTransfer + Number(data.amount)), movements: (user.movements + 1)},
            {new: true}
        );
        await User.findOneAndUpdate(
            {_id: Object(existUser._id).valueOf()},
            {balance: (existUser.balance + Number(data.amount)), movements: (existUser.movements + 1)},
            {new: true}
        );
        return res.send({message: '¡Transacción satisfactoria!', savedMovement});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error transfering.', error: err.message});
    }
};

exports.get = async(req, res)=>{
    try{
        let user = req.user.sub;
        let movements = await Movement.find({$or: [{userOrigin: user}, {userDestination: user}]})
            .populate('userOrigin', ['name', 'surname', 'accountNumber', 'DPI'])
            .populate('userDestination', ['name', 'surname', 'accountNumber'])
            .populate('service');
        return res.send({message: 'Movements found: ', movements});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting movements.', error: err.message});
    }
};

exports.getLast5 = async(req, res)=>{
    try{
        let user = req.params.id;
        let movements = await Movement.find({$or: [{userOrigin: user}, {userDestination: user}]})
            .populate('userOrigin', ['name', 'surname', 'accountNumber', 'DPI'])
            .populate('userDestination', ['name', 'surname', 'accountNumber'])
            .populate('service')
            .sort({date: 'desc'})
            .limit(5);
        return res.send({message: 'Movements found: ', movements});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting movements.', error: err.message});
    }
};
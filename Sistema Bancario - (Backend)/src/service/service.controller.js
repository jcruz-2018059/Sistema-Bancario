'use strict';


const Service = require('./service.model');

exports.test = (req,res)=>{
    return res.send({message: 'Test function is running'});
};

exports.addService = async(req,res)=>{
    try{
        let data = req.body;
        let service = new Service(data);
        await service.save();
        return res.send({message: 'Service created Successfully', service});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error create Service', error: err.message});
    }
};

exports.getServices = async(req,res)=>{
    try{
        let service = await Service.find();
        return res.send(service);
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Service', error: err.message});
    }
};

exports.deleteService = async(req,res)=>{
    try{
        let serviceID = req.params.id;
        let service = await Service.findOne({_id: serviceID});

        if(!service) return res.status(404).send({message: 'Service not found'});

        let serviceDeleted = await Service.findOneAndRemove({_id: service});
        if(!serviceDeleted) return res.send({message: 'Servece not Deleted'});

        return res.send({message: 'Service deleted Successfully', serviceDeleted});

    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error deleted Service', error: err.message});
    }
};
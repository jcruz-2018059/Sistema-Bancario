
const Deposit = require('./deposit.model');
const User = require('../user/user.model');

exports.test = (req,res)=>{
    return res.send({message: 'Test function is running'});
};

exports.add = async(req,res)=>{
    try{
        let data = req.body;
        let clientOrigin = await User.findOne
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error to make a deposit'});
    }
};
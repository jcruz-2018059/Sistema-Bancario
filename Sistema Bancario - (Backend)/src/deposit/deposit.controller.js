
const Deposit = require('./deposit.model');
const User = require('../user/user.model');

exports.test = (req,res)=>{
    return res.send({message: 'Test function is running'});
};

exports.add = async(req,res)=>{
    try{
        let data = req.body;
        let clientDestiny = await User.findOne({_id: data.client});

        if(!clientDestiny) return res.status(404).send({message: 'Cliente no encontrado'});
        let params = {
            clientDestiny: clientDestiny,
            noAccountDestiny: clientDestiny.accountNumber,
            amount: data.amount,
            description: data.description,
            date: Math.floor(Date.now()/ 1000)
        };
        let deposit = new Deposit(params);
        await deposit.save();

        let updateUser = await User.findOneAndUpdate(
            {}
        )

    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error to make a deposit'});
    }
};


exports.getDeposit = async(req,res)=>{
    try{
        let user = req.user.sub;
        let desposits = await Deposit.find({user});
        return res.send({desposits});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting deposits'});
    }
};
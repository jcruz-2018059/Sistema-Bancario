
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
            date: Math.floor(Date.now()/ 1000),
            exp: Math.floor(Date.now() / 1000) + 60
        };
        let deposit = new Deposit(params);
        await deposit.save();

        let clientBalance = clientDestiny.balance + params.amount;

        let updateUser = await User.findOneAndUpdate(
            {_id: clientDestiny},
            clientBalance,
            {new: true}
        );
        if(!updateUser) return res.status(404).send({message: 'Client not Updated'});
        return res.send({message: 'Deposit made correctly and balance user Updated', deposit});

    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error to make a deposit', error: err.message});
    }
};


exports.getDeposit = async(req,res)=>{
    try{
        let user = req.user.sub;
        let desposits = await Deposit.find({user});
        if(!desposits) return res.status(404).send({message: 'You have no deposit made'});
        return res.send({desposits});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting deposits'});
    }
};

exports.updateDeposit = async(req,res)=>{
    try{
        let data = req.body;
        let depositID = req.params.id;

        let deposit = await Deposit.findOne({_id: depositID});
        let client = await User.findOne({_id: deposit.clientDestiny});
        if(!deposit) return res.status(404).send({message: 'Deposit not found'});

        let params = {
            amount: data.amount
        }

        let newBalance = client.balance - params.amount;

        let depositUpdated = await Deposit.findOneAndUpdate(
            {_id: deposit},
            params,
            {new: true}
        );
        if(!depositUpdated) return res.status(404).send({message: 'Deposit nor updated'});

        let clientUpdated = await User.findOneAndUpdate(
            {id: client},
            newBalance,
            {new: true}
        );
        if(!clientUpdated) return res.status(404).send({message: 'Client not updated'});

        return res.send({message: 'Deposit Updated succeddfully', depositUpdated});


    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updated Deposit'});
    }
};


exports.reverseDeposit = async(req,res)=>{
    try{
        let depositID = req.params.id;
        let deposit = await Deposit.findOne({_id: depositID});
        let client = await User.findOne({_id: deposit.clientDestiny});

        if(!deposit) return res.status(404).send({message: 'Deposit not found'});

        let data = {
            amount: 0,
            description: 'DEPOSIT REVERSED'
        };

        if(Math.floor(Date.now() / 1000) >= deposit.exp){
            return res.status(401).send({message: 'You can no longer revert after one minute'});
        };

        let newBalance = client.balance - deposit.amount;

        let cli = {
            balance: newBalance
        }

        let clientUpdated = await User.findOneAndUpdate(
            {_id: client},
            cli,
            {new: true}
        );
        if(!clientUpdated) return res.status(500).send({message: 'Client not Updated,  not found'});
        let depositReverse = await Deposit.findOneAndUpdate(
            {_id: deposit},
            data,
            {new: true}
        );
        if(!depositReverse) return res.status(500).send({message: 'Deposit not Updated'});

        return res.send({message: 'Deposit revesed Successfully', depositReverse});


    }catch(err){
        console.error(err);
        return res.status(404).send({message: 'Error reverse Deposit', error: err.message});
    }
}
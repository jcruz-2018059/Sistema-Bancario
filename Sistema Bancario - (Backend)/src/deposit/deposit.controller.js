
const Deposit = require('./deposit.model');
const User = require('../user/user.model');

exports.test = (req,res)=>{
    return res.send({message: 'Test function is running'});
};

exports.add = async(req,res)=>{
    try{
        let data = req.body;
        let user = req.user.sub;
        let clientDestiny = await User.findOne({accountNumber: data.noAccountDestiny});

        if(!clientDestiny & data.DPI != clientDestiny.DPI) return res.status(404).send({message: 'Cliente no encontrado'});
        let params = {
            clientDestiny: clientDestiny,
            noAccountDestiny: data.noAccountDestiny,
            DPI : data.DPI,
            amount: data.amount,
            description: data.description,
            date: new Date(Date.now()).getTime(),
            exp: new Date(Date.now()).getTime() + 60,
            user: user
        };
        let deposit = new Deposit(params);
        await deposit.save();

        clientDestiny.balance += parseFloat(data.amount)
        await clientDestiny.save();

        return res.send({message: '¡Depósito exitoso!'});

    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error to make a deposit', error: err.message});
    }
};


exports.getDeposit = async(req,res)=>{
    try{
        let user = req.user.sub;
        let desposits = await Deposit.find({user: user});
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


exports.reverseDeposit = async (req, res) => {
    try {
      const data = req.body;
      const deposit = await Deposit.findOne({ _id: data.ID });
      const client = await User.findOne({ _id: deposit.clientDestiny });
      if (!deposit) {
        return res.status(404).send({ message: 'Deposit not found' });
      }
      const newBalance = client.balance - deposit.amount;
  
      const clientUpdated = await User.findOneAndUpdate(
        { _id: client._id },
        { balance: newBalance },
        { new: true }
      );
      if (!clientUpdated) {
        return res.status(500).send({ message: 'Client not updated' });
      }
  
      deposit.amount = 0;
      deposit.description = 'DEPOSIT REVERSED';
  
      const depositReversed = await deposit.save();
      if (!depositReversed) {
        return res.status(500).send({ message: 'Deposit not updated' });
      }
  
      return res.send({
        message: 'Deposit reversed successfully',
        deposit: depositReversed,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error reversing deposit', error: err.message });
    }
  };

exports.allDeposit = async(req,res)=>{
    try{
        let desposits = await Deposit.find({}).populate('clientDestiny');
        if(!desposits) return res.status(404).send({message: 'You have no deposit made'});
        return res.send(desposits);
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting deposits'});
    }
};
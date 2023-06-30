const User = require('./user.model');
const { encrypt, validateData, checkPassword, generateAccountNumber } = require('../../utils/validate');
const { createToken } = require('../../services/jwt');

exports.test = (req, res)=>{
    return res.send({message: 'Test function is running :)'});
};

exports.default = async()=>{
    try{
        let defAdmin = {
            name: 'General',
            surname: 'Administrator',
            username: 'ADMINB',
            DPI: 1265487426514,
            address: 'Guatemala',
            phone: '+502 5897 2145',
            email: 'ADMINB@bank.system.org',
            password: 'ADMINB',
            workName: 'Sistema Bancario S.A',
            monthlyIncome: 0,
            balance: 0,
            role: 'ADMIN'
        };
        let existAdministrator = await User.findOne({username: 'ADMINB'});
        if(existAdministrator){
            return console.log('Default admin is already created.');
        }
        defAdmin.accountNumber = await generateAccountNumber();
        defAdmin.password = await encrypt(defAdmin.password);
        let createDefaultAdmin = new User(defAdmin);
        await createDefaultAdmin.save();
        return console.log('Default administrator created.');
    }catch(err){
        console.error(err);
    }
};

exports.login = async(req, res)=>{
    try{
        let data = req.body;
        let credentials = {
            username: data.username,
            password: data.password
        };
        let validate = validateData(credentials);
        if(validate){
            return res.status(400).send({validate});
        }
        let user = await User.findOne({username: data.username});
        if(user && await checkPassword(data.password, user.password)){
            let token = await createToken(user);
            let userLogged = {
                id: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            };
            // Obtén la fecha actual
            let currentDate = new Date();
            let lastReset = user.lastReset;
            if(lastReset < currentDate.setHours(0,0,0,0)){
                await User.findOneAndUpdate(
                    {username: data.username},
                    { $set: { dailyTransfer: 0, lastReset: currentDate}},
                    {new: true}
                );
            }
            return res.send({message: 'Usuario logeado satisfactoriamente.', token, userLogged});
        }
        return res.status(404).send({message: 'Credenciales inválidas.'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error logging.'});
    }
};

// FUNCIONES DE ADMIN
// name surname username accountNumber DPI address phone email password workName monthlyIncome balance role
exports.add = async(req, res)=>{
    try{
        let data = req.body;
        let params = {
            name: data.name,
            surname: data.surname,
            username: data.username,
            DPI: data.DPI,
            address: data.address,
            email: data.email,
            phone: data.phone,
            password: data.password,
            workName: data.workName,
            monthlyIncome: data.monthlyIncome,
            balance: data.balance,
            role: data.role
        };
        let validate = validateData(params);
        if(validate){
            return res.status(400).send({validate});
        }
        if(data.monthlyIncome < 100){
            return res.status(400).send({message: 'Los ingresos mensuales deben ser mayores a Q100.'});
        }
        let existUsername = await User.findOne({username: data.username});
        if(existUsername){
            return res.status(400).send({message: 'El username ya está en uso.'});
        }
        let existDPI = await User.findOne({DPI: data.DPI});
        if(existDPI){
            return res.status(400).send({message: 'El DPI ya está registrado.'});
        }
        data.accountNumber = await generateAccountNumber();
        data.balance = 0;
        data.password = await encrypt(data.password);
        let user = new User(data);
        await user.save();
        return res.send({message: '¡Registro satisfactorio!', user});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating user.'});
    }
};

exports.get = async (req, res) => {
    try {
        let users = await User.find();
        const adminUsers = users.filter(user => user.role === 'ADMIN');
        const otherUsers = users.filter(user => user.role !== 'ADMIN');
        const sortedUsers = adminUsers.concat(otherUsers);
        return res.send({ message: 'Users found:', users: sortedUsers });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting users.' });
    }
};

exports.getByMovements = async(req, res)=>{
    try{
        let data = req.body;
        let params = {
            sort: data.sort
        };
        let validate = validateData(params);
        if(validate){
            return res.status(400).send({validate});
        }
        let users = await User.find().sort({movements: `${data.sort}`}).select('name surname username accountNumber DPI address phone email workName balance movements');
        return res.send({message: 'Users found: ', users});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting users.'});
    }
};

exports.update = async(req, res)=>{
    try{
        let data = req.body;
        let userId = req.params.id;
        let existUser = await User.findOne({_id: userId});
        if(!existUser){
            return res.status(404).send({message: 'User not found.'});
        }
        if(existUser.username === 'adminb' || existUser.role === 'ADMIN'){
            return res.status(400).send({message: 'Not authorized.'});
        }
        if(Object.entries(data).length === 0 || data.role || data.password || data.accountNumber || data.balance || data.DPI){
            return res.status(400).send({message: 'Alguna información no puede ser actualizada.'});
        }
        if(data.username){
            let existUsername = await User.findOne({username: data.username});
            if(existUsername){
                if(existUsername._id != userId){
                    return res.status(400).send({message: 'El username ya está en uso.'});
                }
            }
        }
        if(data.monthlyIncome){
            if(data.monthlyIncome < 100){
                return res.status(400).send({message: 'Los ingresos mensuales deben ser mayores a Q100.'});
            }
        }
        let updatedUser = await User.findByIdAndUpdate(
            {_id: userId},
            data,
            {new: true}
        ).select('name surname username accountNumber DPI address phone email workName monthlyIncome balance');
        if(!updatedUser){
            return res.status(404).send({message: 'User not found and not updated.'});
        }
        return res.send({message: '¡Usuario actualizado!', updatedUser});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating user.'});
    }
};

exports.delete = async(req, res)=>{
    try{
        let userId = req.params.id;
        let existUser = await User.findOne({_id: userId});
        if(!existUser){
            return res.status(404).send({message: 'User not found.'});
        }
        if(existUser.username === 'adminb' || existUser.role === 'ADMIN'){
            return res.status(400).send({message: 'Not authorized.'});
        }
        let deletedUser = await User.findOneAndDelete({_id: userId});
        if(!deletedUser){
            return res.status(404).send({message:'User not found and not deleted.'});
        }
        return res.send({message: 'Cuenta eliminada satisfactoriamente.', deletedUser});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error deleting user.'});
    }
};

// CLIENT
exports.updateClient = async(req, res)=>{
    try{
        let data = req.body;
        let user = req.user.sub;
        if(Object.entries(data).length === 0 || data.name || data.surname || data.address || data.workName || data.monthlyIncome || data.role || data.password || data.accountNumber || data.balance || data.DPI){
            return res.status(400).send({message: 'Alguna información no puede ser actualizada.'});
        }
        if(data.username){
            let existUsername = await User.findOne({username: data.username});
            if(existUsername){
                if(existUsername._id != user){
                    return res.status(400).send({message: 'El username ya está en uso.'});
                }
            }
        }
        let updatedUser = await User.findByIdAndUpdate(
            {_id: user},
            data,
            {new: true}
        ).select('name surname username accountNumber DPI address phone email workName monthlyIncome balance');
        if(!updatedUser){
            return res.status(404).send({message: 'User not found and not updated.'});
        }
        return res.send({message: '¡Usuario actualizado!', updatedUser});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating user.'});
    }
};

exports.getByLogin = async(req, res)=>{
    try{
        let id = req.user.sub;
        let users = await User.findOne({_id:id});
        return res.send({message: 'User found: ', users});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting users.'});
    }
};

exports.getById = async(req, res)=>{
    try{
        let id = req.params.id;
        let users = await User.findOne({_id:id});
        return res.send({message: 'User found: ', users});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting users.'});
    }
};
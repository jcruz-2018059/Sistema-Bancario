const User = require('./user.model');
const { encrypt, validateData, checkPassword, generateAccountNumber } = require('../../utils/validate');
const { createToken } = require('../../services/jwt');

exports.test = (req, res)=>{
    return res.send({message: 'Test function is running :)'});
}

// name surname username accountNumber DPI address phone email password workName monthlyIncome balance role
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
        }
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
}

exports.login = async(req, res)=>{
    try{
        let data = req.body;
        let credentials = {
            username: data.username,
            password: data.password
        }
        let validate = validateData(credentials);
        if(validate){
            return res.status(400).send({validate});
        }
        let user = await User.findOne({username: data.username})
        if(user && await checkPassword(data.password, user.password)){
            let token = await createToken(user);
            let userLogged = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            return res.send({message: 'Usuario logeado satisfactoriamente.', token, userLogged});
        }
        return res.status(404).send({message: 'Credenciales inválidas.'})

    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error logging.'});
    }
}
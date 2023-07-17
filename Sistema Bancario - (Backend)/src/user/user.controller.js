// Importación de módulos y archivos necesarios
const User = require('./user.model');
const { encrypt, validateData, checkPassword, generateAccountNumber } = require('../../utils/validate');
const { createToken } = require('../../services/jwt');
const Deposit = require('../deposit/deposit.model');
const Movement = require('../movement/movement.model');
const Favorites = require('../favorites/favorites.model');

// Definición de la función de prueba
exports.test = (req, res) => {
    // Envía una respuesta JSON con un mensaje de prueba
    return res.send({ message: 'Test function is running :)' });
};

// Definición de la función predeterminada
exports.default = async () => {
    try {
        // Definición de un objeto "defAdmin" con los detalles de un administrador predeterminado
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

        // Definición de un objeto "defUser" con los detalles de un usuario predeterminado
        let defUser = {
            name: 'Default',
            surname: 'User',
            username: 'default',
            DPI: 1234567890123,
            address: 'Guatemala',
            phone: '+502 1234 5678',
            email: 'default@bank.system.org',
            password: 'default',
            workName: 'DEFAULT',
            monthlyIncome: 0,
            balance: 0,
            role: 'ADMIN'
        };

        // Verificar si el administrador predeterminado ya existe en la base de datos
        let existAdministrator = await User.findOne({ username: 'ADMINB' });
        if (existAdministrator) {
            console.log('Default admin is already created.');
        } else {
            // Generar un número de cuenta único para el administrador predeterminado
            defAdmin.accountNumber = await generateAccountNumber();
            // Encriptar la contraseña del administrador predeterminado
            defAdmin.password = await encrypt(defAdmin.password);
            // Crear un nuevo documento de usuario con los detalles del administrador predeterminado y guardarlo en la base de datos
            let createDefaultAdmin = new User(defAdmin);
            await createDefaultAdmin.save();
            console.log('Default administrator created.');
        }

        // Verificar si el usuario predeterminado ya existe en la base de datos
        let existDefaultUser = await User.findOne({ username: 'default' });
        if (existDefaultUser) {
            console.log('Default user is already created.');
        } else {
            // Generar un número de cuenta único para el usuario predeterminado
            defUser.accountNumber = await generateAccountNumber();
            // Encriptar la contraseña del usuario predeterminado
            defUser.password = await encrypt(defUser.password);
            // Crear un nuevo documento de usuario con los detalles del usuario predeterminado y guardarlo en la base de datos
            let createDefaultUser = new User(defUser);
            await createDefaultUser.save();
            console.log('Default user created.');
        }
    } catch (err) {
        console.error(err);
    }
};

exports.login = async (req, res) => {
    try {
        // Se obtienen los datos del usuario desde la solicitud
        let data = req.body;

        // Se crean las credenciales de inicio de sesión
        let credentials = {
            username: data.username,
            password: data.password
        };

        // Se validan las credenciales
        let validate = validateData(credentials);
        if (validate) {
            // Si las credenciales no son válidas, se devuelve un mensaje de error con el código de estado 400
            return res.status(400).send({ validate });
        }

        // Se busca el usuario en la base de datos por el nombre de usuario
        let user = await User.findOne({ username: data.username });

        // Se verifica si se encuentra un usuario y si la contraseña coincide
        if (user && await checkPassword(data.password, user.password)) {
            // Se crea un token de autenticación
            let token = await createToken(user);

            // Se definen los datos del usuario logueado que se enviarán en la respuesta
            let userLogged = {
                id: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            };

            // Se obtiene la fecha actual
            let currentDate = new Date();
            let lastReset = user.lastReset;

            // Se verifica si la última fecha de reinicio es anterior a la fecha actual
            if (lastReset < currentDate.setHours(0, 0, 0, 0)) {
                // Se actualiza el documento del usuario en la base de datos para reiniciar la cantidad de transferencias diarias y la fecha de reinicio
                await User.findOneAndUpdate(
                    { username: data.username },
                    { $set: { dailyTransfer: 0, lastReset: currentDate } },
                    { new: true }
                );
            }

            // Se devuelve una respuesta exitosa con un mensaje de éxito, el token de autenticación y los datos del usuario logueado
            return res.send({ message: 'Usuario logeado satisfactoriamente.', token, userLogged });
        }

        // Si no se encuentra un usuario o las credenciales son inválidas, se devuelve un mensaje de error con el código de estado 404
        return res.status(404).send({ message: 'Credenciales inválidas.' });
    } catch (err) {
        // Si ocurre algún error durante el proceso, se captura el error, se registra en la consola y se devuelve una respuesta de error con el código de estado 500
        console.error(err);
        return res.status(500).send({ message: 'Error logging.' });
    }
};

// FUNCIONES DE ADMIN
// name surname username accountNumber DPI address phone email password workName monthlyIncome balance role
exports.add = async (req, res) => {
    try {
        // Se obtienen los datos del usuario desde la solicitud
        let data = req.body;

        // Se definen los parámetros para crear un nuevo usuario
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
            balance: 0,
            role: data.role
        };

        // Se validan los parámetros del nuevo usuario
        let validate = validateData(params);
        if (validate) {
            // Si los parámetros no son válidos, se devuelve un mensaje de error con el código de estado 400
            return res.status(400).send({ validate });
        }

        // Se verifica si los ingresos mensuales son inferiores a Q100
        if (data.monthlyIncome < 100) {
            return res.status(400).send({ message: 'Los ingresos mensuales deben ser mayores a Q100.' });
        }

        // Se verifica si el nombre de usuario ya está en uso
        let existUsername = await User.findOne({ username: data.username });
        if (existUsername) {
            return res.status(400).send({ message: 'El nombre de usuario ya está en uso.' });
        }

        // Se verifica si el DPI ya está registrado
        let existDPI = await User.findOne({ DPI: data.DPI });
        if (existDPI) {
            return res.status(400).send({ message: 'El DPI ya está registrado.' });
        }

        // Se generan un número de cuenta único y se encripta la contraseña
        data.accountNumber = await generateAccountNumber();
        data.balance = 0;
        data.password = await encrypt(data.password);

        // Se crea un nuevo documento de usuario con los datos proporcionados y se guarda en la base de datos
        let user = new User(data);
        await user.save();

        // Se devuelve una respuesta exitosa con un mensaje de éxito y los datos del usuario registrado
        return res.send({ message: '¡Registro satisfactorio!', user });
    } catch (err) {
        // Si ocurre algún error durante el proceso, se captura el error, se registra en la consola y se devuelve una respuesta de error con el código de estado 500
        console.error(err);
        return res.status(500).send({ message: 'Error creating user.' });
    }
};

exports.get = async (req, res) => {
    try {
        // Se obtienen todos los usuarios de la base de datos, excepto el usuario predeterminado
        let users = await User.find({ name: { $ne: 'Default' } });

        // Se filtran los usuarios en dos grupos: administradores y otros usuarios
        const adminUsers = users.filter(user => user.role === 'ADMIN');
        const otherUsers = users.filter(user => user.role !== 'ADMIN');

        // Se concatenan los grupos para tener una lista ordenada de usuarios con los administradores primero
        const sortedUsers = adminUsers.concat(otherUsers);

        // Se devuelve una respuesta con un mensaje de éxito y la lista de usuarios ordenada
        return res.send({ message: 'Usuarios encontrados:', users: sortedUsers });
    } catch (err) {
        // Si ocurre algún error durante el proceso, se captura el error, se registra en la consola y se devuelve una respuesta de error con el código de estado 500
        console.error(err);
        return res.status(500).send({ message: 'Error al obtener los usuarios.' });
    }
};

exports.getByMovements = async (req, res) => {
    try {
        // Se obtienen los datos de la solicitud
        let data = req.body;

        // Se definen los parámetros para la búsqueda
        let params = {
            sort: data.sort
        };

        // Se validan los parámetros
        let validate = validateData(params);
        if (validate) {
            // Si los parámetros no son válidos, se devuelve un mensaje de error con el código de estado 400
            return res.status(400).send({ validate });
        }

        // Se obtienen los usuarios ordenados según el criterio de clasificación especificado en los movimientos
        let users = await User.find().sort({ movements: `${data.sort}` }).select('name surname username accountNumber DPI address phone email workName balance movements');

        // Se devuelve una respuesta con un mensaje de éxito y la lista de usuarios encontrados
        return res.send({ message: 'Usuarios encontrados:', users });
    } catch (err) {
        // Si ocurre algún error durante el proceso, se captura el error, se registra en la consola y se devuelve una respuesta de error con el código de estado 500
        console.error(err);
        return res.status(500).send({ message: 'Error al obtener los usuarios.' });
    }
};

exports.update = async (req, res) => {
    try {
        // Se obtienen los datos y el ID del usuario desde la solicitud
        let data = req.body;
        let userId = req.params.id;

        // Se verifica si el usuario existe en la base de datos
        let existUser = await User.findOne({ _id: userId });
        if (!existUser) {
            return res.status(404).send({ message: 'Usuario no encontrado.' });
        }

        // Se verifica si el usuario tiene permisos para ser actualizado
        if (existUser.username === 'adminb' || existUser.role === 'ADMIN') {
            return res.status(400).send({ message: 'No autorizado.' });
        }

        // Se verifica si alguna información no puede ser actualizada
        if (Object.entries(data).length === 0 || data.role || data.password || data.accountNumber || data.balance || data.DPI) {
            return res.status(400).send({ message: 'Alguna información no puede ser actualizada.' });
        }

        // Se verifica si se desea actualizar el nombre de usuario y se verifica si el nuevo nombre de usuario ya está en uso
        if (data.username) {
            let existUsername = await User.findOne({ username: data.username });
            if (existUsername && existUsername._id != userId) {
                return res.status(400).send({ message: 'El nombre de usuario ya está en uso.' });
            }
        }

        // Se verifica si se desea actualizar los ingresos mensuales y se verifica que sean mayores a Q100
        if (data.monthlyIncome) {
            if (data.monthlyIncome < 100) {
                return res.status(400).send({ message: 'Los ingresos mensuales deben ser mayores a Q100.' });
            }
        }

        // Se actualiza el usuario en la base de datos
        let updatedUser = await User.findByIdAndUpdate({ _id: userId }, data, { new: true }).select('name surname username accountNumber DPI address phone email workName monthlyIncome balance');

        // Se verifica si el usuario fue actualizado con éxito
        if (!updatedUser) {
            return res.status(404).send({ message: 'Usuario no encontrado y no actualizado.' });
        }

        // Se devuelve una respuesta con un mensaje de éxito y el usuario actualizado
        return res.send({ message: '¡Usuario actualizado!', updatedUser });
    } catch (err) {
        // Si ocurre algún error durante el proceso, se captura el error, se registra en la consola y se devuelve una respuesta de error con el código de estado 500
        console.error(err);
        return res.status(500).send({ message: 'Error al actualizar el usuario.' });
    }
};

exports.delete = async (req, res) => {
    try {
        // Se obtiene el ID del usuario desde la solicitud
        let userId = req.params.id;

        // Se verifica si el usuario existe en la base de datos
        let existUser = await User.findOne({ _id: userId });
        if (!existUser) {
            return res.status(404).send({ message: 'Usuario no encontrado.' });
        }

        // Se verifica si el usuario tiene permisos para ser eliminado
        if (existUser.username === 'adminb' || existUser.role === 'ADMIN') {
            return res.status(400).send({ message: 'No autorizado.' });
        }

        // Se elimina el usuario de la base de datos
        let deletedUser = await User.findOneAndDelete({ _id: userId });

        // Se verifica si el usuario fue eliminado con éxito
        if (!deletedUser) {
            return res.status(404).send({ message: 'Usuario no encontrado y no eliminado.' });
        }

        // Se actualizan los registros relacionados con el usuario eliminado
        let existUserDeposit = await Deposit.findOne({ clientDestiny: userId });
        if (existUserDeposit) {
            await Deposit.updateMany({ clientDestiny: deletedUser._id }, { clientDestiny: '64ac86a3e771647a14bd0be9' });
        }

        let existUserTransfer = await Movement.findOne({ userDestination: userId });
        if (existUserTransfer) {
            await Movement.updateMany({ userDestination: deletedUser._id }, { userDestination: '64ac86a3e771647a14bd0be9' });
        }

        let existUserFavorites = await Favorites.findOne({ client: userId });
        if (existUserFavorites) {
            await Favorites.updateMany({ client: deletedUser._id }, { client: '64ac86a3e771647a14bd0be9' });
        }

        // Se devuelve una respuesta con un mensaje de éxito y el usuario eliminado
        return res.send({ message: 'Cuenta eliminada satisfactoriamente.', deletedUser });
    } catch (err) {
        // Si ocurre algún error durante el proceso, se captura el error, se registra en la consola y se devuelve una respuesta de error con el código de estado 500
        console.error(err);
        return res.status(500).send({ message: 'Error al eliminar el usuario.' });
    }
};

// CLIENT
exports.updateClient = async (req, res) => {
    try {
        // Se obtienen los datos y el ID del usuario desde la solicitud
        let data = req.body;
        let user = req.user.sub;

        // Se verifica si alguna información no puede ser actualizada
        if (Object.entries(data).length === 0 || data.name || data.surname || data.address || data.workName || data.monthlyIncome || data.role || data.password || data.accountNumber || data.balance || data.DPI) {
            return res.status(400).send({ message: 'Alguna información no puede ser actualizada.' });
        }

        // Se verifica si se desea actualizar el nombre de usuario y se verifica si el nuevo nombre de usuario ya está en uso
        if (data.username) {
            let existUsername = await User.findOne({ username: data.username });
            if (existUsername && existUsername._id != user) {
                return res.status(400).send({ message: 'El nombre de usuario ya está en uso.' });
            }
        }

        // Se actualiza el usuario en la base de datos
        let updatedUser = await User.findByIdAndUpdate({ _id: user }, data, { new: true }).select('name surname username accountNumber DPI address phone email workName monthlyIncome balance');

        // Se verifica si el usuario fue actualizado con éxito
        if (!updatedUser) {
            return res.status(404).send({ message: 'Usuario no encontrado y no actualizado.' });
        }

        // Se devuelve una respuesta con un mensaje de éxito y el usuario actualizado
        return res.send({ message: '¡Usuario actualizado!', updatedUser });
    } catch (err) {
        // Si ocurre algún error durante el proceso, se captura el error, se registra en la consola y se devuelve una respuesta de error con el código de estado 500
        console.error(err);
        return res.status(500).send({ message: 'Error al actualizar el usuario.' });
    }
};

exports.getByLogin = async (req, res) => {
    try {
        // Se obtiene el ID del usuario desde la solicitud
        let id = req.user.sub;

        // Se busca el usuario en la base de datos por su ID
        let users = await User.findOne({ _id: id });

        // Se devuelve una respuesta con un mensaje de éxito y el usuario encontrado
        return res.send({ message: 'Usuario encontrado:', users });
    } catch (err) {
        // Si ocurre algún error durante el proceso, se captura el error, se registra en la consola y se devuelve una respuesta de error con el código de estado 500
        console.error(err);
        return res.status(500).send({ message: 'Error al obtener el usuario.' });
    }
};

exports.getById = async (req, res) => {
    try {
        // Se obtiene el ID del usuario desde la solicitud
        let id = req.params.id;

        // Se busca el usuario en la base de datos por su ID
        let users = await User.findOne({ _id: id });

        // Se devuelve una respuesta con un mensaje de éxito y el usuario encontrado
        return res.send({ message: 'Usuario encontrado:', users });
    } catch (err) {
        // Si ocurre algún error durante el proceso, se captura el error, se registra en la consola y se devuelve una respuesta de error con el código de estado 500
        console.error(err);
        return res.status(500).send({ message: 'Error al obtener el usuario.' });
    }
};
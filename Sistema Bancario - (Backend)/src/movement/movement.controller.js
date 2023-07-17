// Importación de módulos y archivos necesarios
const Movement = require('./movement.model');
const Service = require('../service/service.model');
const User = require('../user/user.model');
const { validateData } = require('../../utils/validate');

exports.test = (req, res) => {
    // Función de prueba para verificar que la función esté en ejecución correctamente.
    return res.send({ message: 'Test function is running :)' });
};

exports.buy = async (req, res) => {
    // Controlador para realizar una compra de servicio.
    try {
        let service = req.params.service;
        let existService = await Service.findOne({ _id: service });
        if (!existService) {
            // Verificar si el servicio no existe y enviar una respuesta de error 400
            return res.status(400).send({ message: 'Service does not exist.' });
        }
        let amount = existService.amount;
        let user = await User.findOne({ _id: req.user.sub });
        if (user.balance < amount) {
            // Verificar si el usuario no tiene sufondos para la compra y enviar una respuesta de error 400
            return res.status(400).send({ message: '¡No tienes los fondos necesarios para la compra!' });
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
        let savedMovement = await Movement.findOne({ _id: movement._id }).populate('service').populate('userOrigin', ['name', 'surname', 'accountNumber']);
        await User.findOneAndUpdate(
            { _id: req.user.sub },
            { balance: (user.balance - amount), movements: (user.movements + 1) },
            { new: true }
        );
        return res.send({ message: '¡Compra satisfactoria!', savedMovement });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error buying service.' });
    }
};

exports.transfer = async (req, res) => {
    try {
        let data = req.body;
        let paramsReq = {
            amount: data.amount,
            userDestination: data.userDestination,
            userDestinationDPI: data.userDestinationDPI
        };
        let validate = validateData(paramsReq);
        if (validate) {
            // Verificar si hay errores de validación y enviar una respuesta de error 400
            return res.status(400).send({ validate });
        }
        let user = await User.findOne({ _id: req.user.sub });
        if (user.dailyTransfer >= 10000) {
            // Verificar si el usuario ha alcanzado el límite de transferencias diarias y enviar una respuesta de error 400
            return res.status(400).send({ message: 'Límite de transferencias diarias superado.' });
        }
        if ((user.dailyTransfer + Number(data.amount)) > 10000) {
            // Verificar si el monto de transferencia supera el límite diario y enviar una respuesta de error 400
            return res.status(400).send({ message: 'El monto supera el límite de transferencias diarias.' });
        }
        if (user.balance < data.amount) {
            // Verificar si el usuario no tiene suficientes fondos para la transferencia y enviar una respuesta de error 400
            return res.status(400).send({ message: '¡No tienes los fondos necesarios para la transferencia!' });
        }
        if (data.amount > 2000) {
            // Verificar si el monto de transferencia supera el límite máximo y enviar una respuesta de error 400
            return res.status(400).send({ message: 'El máximo de transferecia soportado es de Q2000.00' });
        }
        let existUser = await User.findOne({ accountNumber: data.userDestination, DPI: data.userDestinationDPI });
        if (!existUser) {
            // Verificar si el usuario de destino no existe y enviar una respuesta de error 400
            return res.status(400).send({ message: 'Número de cuenta o DPI inválidos.' });
        }
        if (Object(existUser._id).valueOf() === req.user.sub || existUser.DPI === req.user.DPI) {
            // Verificar si el usuario intenta transferirse a sí mismo y enviar una respuesta de error 400
            return res.status(400).send({ message: '¡No puedes transferirte a ti mismo!' });
        }
        let params = {
            type: 'TRANSFER',
            amount: data.amount,
            userOrigin: req.user.sub,
            userDestination: Object(existUser._id).valueOf(),
            date: new Date(Date.now()).getTime()
        };
        if (data.description) {
            params.description = data.description;
        }
        let movement = new Movement(params);
        await movement.save();
        let savedMovement = await Movement.findOne({ _id: movement._id }).populate('userDestination', ['name', 'surname', 'accountNumber']).populate('userOrigin', ['name', 'surname', 'accountNumber']);
        await User.findOneAndUpdate(
            { _id: req.user.sub },
            { balance: (user.balance - data.amount), dailyTransfer: (user.dailyTransfer + Number(data.amount)), movements: (user.movements + 1) },
            { new: true }
        );
        await User.findOneAndUpdate(
            { _id: Object(existUser._id).valueOf() },
            { balance: (existUser.balance + Number(data.amount)), movements: (existUser.movements + 1) },
            { new: true }
        );
        return res.send({ message: '¡Transacción satisfactoria!', savedMovement });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error transfering.', error: err.message });
    }
};

// Este controlador se encarga de obtener todos los movimientos de un usuario
exports.get = async (req, res) => {
    try {
        // Obtener el ID del usuario actual desde la solicitud
        let user = req.user.sub;

        // Buscar todos los movimientos donde el usuario es el origen o el destino
        let movements = await Movement.find({ $or: [{ userOrigin: user }, { userDestination: user }] })
            .populate('userOrigin', ['name', 'surname', 'accountNumber', 'DPI']) // Popula los datos del usuario origen
            .populate('userDestination', ['name', 'surname', 'accountNumber']) // Popula los datos del usuario destino
            .populate('service'); // Popula los datos del servicio asociado al movimiento

        // Modificar el tipo de movimiento a "CREDIT" si es una transferencia recibida
        movements.forEach(movement => {
            if (movement.type === 'TRANSFER' && movement.userDestination._id.toString() === user) {
                movement.type = 'CREDIT';
            }
        });

        // Devolver los movimientos encontrados como respuesta
        return res.send({ message: 'Movements found: ', movements });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting movements.', error: err.message });
    }
};

// Este controlador se encarga de obtener los últimos 5 movimientos de un usuario
exports.getLast5 = async (req, res) => {
    try {
        // Obtener el ID del usuario desde los parámetros de la solicitud
        let user = req.params.id;

        // Buscar los últimos 5 movimientos donde el usuario es el origen o el destino
        let movements = await Movement.find({ $or: [{ userOrigin: user }, { userDestination: user }] })
            .populate('userOrigin', ['name', 'surname', 'accountNumber', 'DPI']) // Popula los datos del usuario origen
            .populate('userDestination', ['name', 'surname', 'accountNumber']) // Popula los datos del usuario destino
            .populate('service') // Popula los datos del servicio asociado al movimiento
            .sort({ date: 'desc' }) // Ordenar los movimientos por fecha en orden descendente
            .limit(5); // Limitar la cantidad de movimientos a 5

        // Modificar el tipo de movimiento a "CREDIT" si es una transferencia recibida
        movements.forEach(movement => {
            if (movement.type === 'TRANSFER' && movement.userDestination._id.toString() === user) {
                movement.type = 'CREDIT';
            }
        });

        // Buscar el nombre y apellido del usuario
        let userName = await User.findOne({ _id: user }).select('name surname');

        // Devolver los movimientos encontrados y el nombre del usuario como respuesta
        return res.send({ message: 'Movements found: ', movements, userName });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting movements.', error: err.message });
    }
};
'use strict';

// Importación de módulos y archivos necesarios
const Service = require('./service.model');
const Movements = require('../movement/movement.model');

exports.test = (req, res) => {
    // Función de prueba para verificar que la función esté en ejecución correctamente.
    return res.send({ message: 'Test function is running' });
};

exports.addService = async (req, res) => {
    // Controlador para agregar un nuevo servicio.
    try {
        let data = req.body;
        let service = new Service(data);
        await service.save();
        return res.send({ message: 'Service created Successfully', service });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error create Service', error: err.message });
    }
};

exports.getServices = async (req, res) => {
    // Controlador para obtener todos los servicios.
    try {
        let service = await Service.find();
        return res.send(service);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting Service', error: err.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        let serviceID = req.params.id;
        let service = await Service.findOne({ _id: serviceID });

        if (!service) {
            // Verificar si el servicio no existe y enviar una respuesta de error 404
            return res.status(404).send({ message: 'Service not found' });
        }

        let serviceDeleted = await Service.findOneAndRemove({ _id: service });
        if (!serviceDeleted) {
            // Verificar si el servicio no se eliminó correctamente y enviar una respuesta informativa
            return res.send({ message: 'Service not Deleted' });
        }

        let existMovementsUser = await Movements.findOne({ userDestination: userId });
        if (existMovementsUser) {
            // Actualizar los movimientos relacionados al usuario eliminado
            await Movements.updateMany({ userDestination: deletedUser._id }, { userDestination: '64ac86a3e771647a14bd0be9' });
        }

        return res.send({ message: 'Service deleted Successfully', serviceDeleted });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleted Service', error: err.message });
    }
};

exports.updateService = async (req, res) => {
    try {
        let data = req.body;
        let serviceID = req.params.id;

        let updateService = await Service.findOneAndUpdate(
            { _id: serviceID },
            data,
            { new: true }
        );
        if (!updateService) {
            // Verificar si el servicio no se encontró y no se actualizó, y enviar una respuesta de error 404
            return res.status(404).send({ message: 'Service not found, not updating' });
        }

        return res.send({ message: 'Service updated successfully', updateService });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating Service', error: err.message });
    }
};

exports.getService = async (req, res) => {
    try {
        let serviceId = req.params.id;
        let service = await Service.findOne({ _id: serviceId });
        return res.send(service);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting Service', error: err.message });
    }
};
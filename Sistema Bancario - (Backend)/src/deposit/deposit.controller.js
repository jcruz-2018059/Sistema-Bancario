// Importación de módulos y archivos necesarios
const Deposit = require('./deposit.model');
const User = require('../user/user.model');

exports.test = (req,res)=>{
    return res.send({message: 'Test function is running'});
};

exports.add = async (req, res) => {
    try {
      // Obtiene los datos del cuerpo de la solicitud
      let data = req.body;
      
      // Obtiene el usuario autenticado
      let user = req.user.sub;
      
      // Busca el cliente destino en la base de datos según el número de cuenta proporcionado en los datos
      let clientDestiny = await User.findOne({ accountNumber: data.noAccountDestiny });
      
      // Verifica si no se encuentra el cliente destino o si el DPI en los datos no coincide con el DPI del cliente destino encontrado
      if (!clientDestiny || data.DPI != clientDestiny.DPI) {
        return res.status(404).send({ message: 'Cliente no encontrado' });
      }
      
      // Crea un objeto de parámetros para el nuevo depósito
      let params = {
        clientDestiny: clientDestiny,
        noAccountDestiny: data.noAccountDestiny,
        DPI: data.DPI,
        amount: data.amount,
        description: data.description,
        date: new Date(Date.now()).getTime(),
        exp: new Date(Date.now()).getTime() + 60,
        user: user
      };
      
      // Crea una nueva instancia de la clase "Deposit" utilizando los parámetros
      let deposit = new Deposit(params);
      
      // Guarda el nuevo depósito en la base de datos
      await deposit.save();
      
      // Actualiza el saldo del cliente destino
      clientDestiny.balance += parseFloat(data.amount);
      await clientDestiny.save();
      
      // Devuelve una respuesta exitosa con un mensaje
      return res.send({ message: '¡Depósito exitoso!' });
    } catch (err) {
      // Si ocurre un error, muestra el mensaje de error en la consola y devuelve una respuesta de error
      console.error(err);
      return res.status(500).send({ message: 'Error to make a deposit', error: err.message });
    }
  };


  exports.getUserDeposits = async (req, res) => {
    try {
      // Obtiene el usuario autenticado
      let user = req.user.sub;
      
      // Busca los depósitos del usuario en la base de datos
      let deposits = await Deposit.find({ clientDestiny: user });
      
      // Verifica si no se encuentran depósitos
      if (!deposits) {
        return res.status(404).send({ message: 'You have not made deposits yet.' });
      }
      
      // Devuelve los depósitos como respuesta
      return res.send({ deposits });
    } catch (err) {
      // Si ocurre un error, muestra el mensaje de error en la consola y devuelve una respuesta de error
      console.error(err);
      return res.status(500).send({ message: 'Error getting deposits' });
    }
  };
  
  exports.updateDeposit = async (req, res) => {
    try {
      // Obtiene los datos del cuerpo de la solicitud
      let data = req.body;
      
      // Obtiene el ID del depósito de los parámetros de la solicitud
      let depositID = req.params.id;
      
      // Busca el depósito en la base de datos según el ID proporcionado
      let deposit = await Deposit.findOne({ _id: depositID });
      
      // Busca el cliente en la base de datos según el ID del cliente destino en el depósito
      let client = await User.findOne({ _id: deposit.clientDestiny });
      
      // Verifica si no se encuentra el depósito
      if (!deposit) {
        return res.status(404).send({ message: 'Deposit not found' });
      }
      
      // Crea un objeto de parámetros actualizados para el depósito
      let params = {
        amount: data.amount
      };
      
      // Calcula el nuevo saldo del cliente
      let newBalance = client.balance - params.amount;
      
      // Actualiza el depósito en la base de datos
      let depositUpdated = await Deposit.findOneAndUpdate(
        { _id: deposit },
        params,
        { new: true }
      );
      
      // Verifica si no se encuentra el depósito actualizado
      if (!depositUpdated) {
        return res.status(404).send({ message: 'Deposit not updated' });
      }
      
      // Actualiza el saldo del cliente en la base de datos
      let clientUpdated = await User.findOneAndUpdate(
        { id: client },
        newBalance,
        { new: true }
      );
      
      // Verifica si no se encuentra el cliente actualizado
      if (!clientUpdated) {
        return res.status(404).send({ message: 'Client not updated' });
      }
      
      // Devuelve una respuesta exitosa con un mensaje y el depósito actualizado
      return res.send({ message: 'Deposit Updated successfully', depositUpdated });
    } catch (err) {
      // Si ocurre un error, muestra el mensaje de error en la consola y devuelve una respuesta de error
      console.error(err);
      return res.status(500).send({ message: 'Error updating Deposit' });
    }
  };


  exports.reverseDeposit = async (req, res) => {
    try {
      const data = req.body;
      
      // Busca el depósito en la base de datos según el ID proporcionado
      const deposit = await Deposit.findOne({ _id: data.ID });
      
      // Busca el cliente en la base de datos según el ID del cliente destino en el depósito
      const client = await User.findOne({ _id: deposit.clientDestiny });
      
      // Verifica si no se encuentra el depósito
      if (!deposit) {
        return res.status(404).send({ message: 'Deposit not found' });
      }
      
      // Calcula el nuevo saldo del cliente
      const newBalance = client.balance - deposit.amount;
      
      // Actualiza el saldo del cliente en la base de datos
      const clientUpdated = await User.findOneAndUpdate(
        { _id: client._id },
        { balance: newBalance },
        { new: true }
      );
      
      // Verifica si no se encuentra el cliente actualizado
      if (!clientUpdated) {
        return res.status(500).send({ message: 'Client not updated' });
      }
      
      // Actualiza el depósito en la base de datos
      deposit.amount = 0;
      deposit.description = 'DEPOSIT REVERSED';
      
      const depositReversed = await deposit.save();
      
      // Verifica si no se encuentra el depósito actualizado
      if (!depositReversed) {
        return res.status(500).send({ message: 'Deposit not updated' });
      }
      
      // Devuelve una respuesta exitosa con un mensaje y el depósito actualizado
      return res.send({
        message: 'Deposit reversed successfully',
        deposit: depositReversed,
      });
    } catch (err) {
      // Si ocurre un error, muestra el mensaje de error en la consola y devuelve una respuesta de error
      console.error(err);
      return res.status(500).send({ message: 'Error reversing deposit', error: err.message });
    }
  };
  
  exports.allDeposit = async (req, res) => {
    try {
      // Obtiene el ID del administrador autenticado
      let admin = req.user.sub;
      
      // Busca los depósitos del administrador en la base de datos y popula el campo 'clientDestiny' con los datos del cliente destino
      let deposits = await Deposit.find({ user: admin }).populate('clientDestiny');
      
      // Verifica si no se encuentran depósitos
      if (!deposits) {
        return res.status(404).send({ message: 'You have no deposit made' });
      }
      
      // Devuelve los depósitos como respuesta
      return res.send(deposits);
    } catch (err) {
      // Si ocurre un error, muestra el mensaje de error en la consola y devuelve una respuesta de error
      console.error(err);
      return res.status(500).send({ message: 'Error getting deposits' });
    }
  };
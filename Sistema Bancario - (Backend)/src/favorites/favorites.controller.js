// Importación de módulos y archivos necesarios
const Favorites = require('./favorites.model');
const User = require('../user/user.model');

exports.test = (req,res)=>{
    return res.send({message: 'Test function is running'});
};

exports.addFavorite = async (req, res) => {
    try {
      // Obtiene los datos del cuerpo de la solicitud
      let data = req.body;
      
      // Obtiene el usuario autenticado
      let userLogged = req.user.sub;
      
      // Busca un cliente en la base de datos según el número de cuenta proporcionado en los datos
      let client = await User.findOne({ accountNumber: data.accountNumber });
      
      // Verifica si no se encuentra ningún cliente o si el DPI en los datos no coincide con el DPI del cliente encontrado
      if (!client || data.dpi != client.DPI) {
        return res.status(404).send({ message: 'Client not found' });
      }
      
      // Crea un objeto de parámetros para el nuevo favorito
      let params = {
        client: client,
        clientLogged: userLogged,
        alias: data.alias,
        accountNumber: data.accountNumber,
        dpi: data.dpi
      };
      
      // Crea una nueva instancia de la clase "Favorites" utilizando los parámetros
      let favorites = new Favorites(params);
      
      // Guarda el nuevo favorito en la base de datos
      await favorites.save();
      
      // Devuelve una respuesta exitosa con un mensaje y el favorito agregado
      return res.send({ message: 'Favorite adding successfully', favorites });
    } catch (err) {
      // Si ocurre un error, muestra el mensaje de error en la consola y devuelve una respuesta de error
      console.error(err);
      return res.status(500).send({ message: 'Error adding a Favorite', error: err.message });
    }
  };

  exports.getFavorites = async (req, res) => {
    try {
      // Obtiene todos los favoritos de la base de datos y popula el campo 'client' con los datos del cliente asociado
      let favorites = await Favorites.find().populate('client');
      
      // Devuelve los favoritos como respuesta
      return res.send(favorites);
    } catch (err) {
      // Si ocurre un error, muestra el mensaje de error en la consola y devuelve una respuesta de error
      console.error(err);
      return res.status(500).send({ message: 'Error getting favorites', error: err.message });
    }
  };
  
  exports.getFavorite = async (req, res) => {
    try {
      // Obtiene el ID del favorito de los parámetros de la solicitud
      let favoriteID = req.params.id;
      
      // Busca un favorito en la base de datos según el ID proporcionado
      let favorite = await Favorites.findOne({ _id: favoriteID });
      
      // Verifica si no se encuentra el favorito
      if (!favorite) {
        return res.status(404).send({ message: 'Favorite not found' });
      }
      
      // Devuelve una respuesta exitosa con un mensaje y el favorito encontrado
      return res.send({ message: 'Favorite found', favorite });
    } catch (err) {
      // Si ocurre un error, muestra el mensaje de error en la consola y devuelve una respuesta de error
      console.error(err);
      return res.status(500).send({ message: 'Error getting a Favorite', error: err.message });
    }
  };
  
  exports.deleteFavorite = async (req, res) => {
    try {
      // Obtiene el ID del favorito de los parámetros de la solicitud
      let favoriteID = req.params.id;
      
      // Busca y elimina un favorito de la base de datos según el ID proporcionado
      let deleteFavorito = await Favorites.findOneAndRemove({ _id: favoriteID });
      
      // Verifica si no se encuentra el favorito
      if (!deleteFavorito) {
        return res.status(404).send({ message: 'Favorite not found, not deleted' });
      }
      
      // Devuelve una respuesta exitosa con un mensaje
      return res.send({ message: 'Favorite deleted successfully' });
    } catch (err) {
      // Si ocurre un error, muestra el mensaje de error en la consola y devuelve una respuesta de error
      console.error(err);
      return res.status(500).send({ message: 'Error deleting Favorite', error: err.message });
    }
  };

  exports.updateFavorite = async (req, res) => {
    try {
      // Obtiene los datos del cuerpo de la solicitud
      let data = req.body;
      
      // Obtiene el ID del favorito de los parámetros de la solicitud
      let favoriteID = req.params.id;
      
      // Obtiene el usuario autenticado
      let userLogged = req.user.sub;
      
      // Verifica si el campo 'dpi' está presente en los datos
      if (!data.dpi) {
        return res.status(400).send({ message: 'DPI is required' });
      }
      
      // Busca un cliente en la base de datos según el número de cuenta proporcionado en los datos
      let client = await User.findOne({ accountNumber: data.accountNumber });
      
      // Verifica si no se encuentra ningún cliente o si el DPI en los datos no coincide con el DPI del cliente encontrado
      if (!client || data.dpi != client.DPI) {
        return res.status(404).send({ message: 'Client not found' });
      }
      
      // Crea un objeto de parámetros actualizados para el favorito
      let params = {
        client: client,
        clientLogged: userLogged,
        alias: data.alias,
        accountNumber: data.accountNumber,
        dpi: data.dpi
      };
      
      // Busca y actualiza el favorito en la base de datos según el ID proporcionado
      let favoriteUpdate = await Favorites.findOneAndUpdate(
        { _id: favoriteID },
        params,
        { new: true }
      );
      
      // Verifica si no se encuentra el favorito actualizado
      if (!favoriteUpdate) {
        return res.status(404).send({ message: 'Favorite not found, not updated' });
      }
      
      // Devuelve una respuesta exitosa con un mensaje y el favorito actualizado
      return res.send({ message: 'Favorite Updated', favoriteUpdate });
    } catch (err) {
      // Si ocurre un error, muestra el mensaje de error en la consola y devuelve una respuesta de error
      console.error(err);
      return res.status(500).send({ message: 'Error updating the favorite', error: err.message });
    }
  };
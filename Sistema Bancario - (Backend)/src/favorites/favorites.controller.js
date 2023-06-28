const Favorites = require('./favorites.model');
const User = require('../user/user.model');

exports.test = (req,res)=>{
    return res.send({message: 'Test function is running'});
};

exports.addFavorite = async(req,res)=>{
    try{
        let data = req.body; 
        let userLogged = req.user.sub;

        let client = await User.findOne({_id: data.client});
        if(!client) return res.status(404).send({message: 'Client not found'});
        let params ={
            client:  client,
            clientLogged: userLogged,
            alias: data.alias,
            accountNumber: client.accountNumber,
            dpi: client.DPI
        };
        let favorites = new Favorites(params);
        await favorites.save();
        return res.send({message: 'Favorite adding successfully', favorites});

    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error adding a Favorite', error: err.message});
    }
};

exports.getFavorites = async(req,res)=>{
    try{
        let favorites = await Favorites.find();
        return res.send(favorites);
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting favorites', error: err.message});
    }
};

exports.getFavorite = async(req,res)=>{
    try{
        let favoriteID = req.params.id;
        let favorite = await Favorites.findOne({_id: favoriteID});
        if(!favorite) return res.status(404).send({message: 'Favorite not found'});
        return res.send({favorite});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting a Favorite', error: err.message});
    }
};

exports.deleteFavorite = async(req,res)=>{
    try{
        let favoriteID = req.params.id;
        let deleteFavorito = await Favorites.findOneAndRemove({_id: favoriteID});
        if(!deleteFavorito) return res.status(404).send({message: 'Favorite nor found, not deleted'});
        return res.send({message: 'Favorite deleted Successfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error delete Favorite', error: err.message});
    }
};

exports.updateFavorite = async(req,res)=>{
    try{
        let data = req.body;
        let favoriteID = req.params.id;
        let userLogged = req.user.sub;

        let client = await User.findOne({_id: data.client});
        let params = {
            client: client,
            clientLogged: userLogged,
            alias: data.alias,
            accountNumber: client.accountNumber,
            dpi: client.DPI
        };
        let favoriteUpdate = await Favorites.findOneAndUpdate(
            {_id: favoriteID},
            params,
            {new: true}
        );
        if(!favoriteUpdate) return res.status(404).send({message: 'Favorite not found not updated'});
        return res.send({message: 'Favorite Updated', favoriteUpdate});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updatign the favaorite', error:err.message});
    }
};
function UsuariosDAO( connection ){
	this._connection = connection();
};

UsuariosDAO.prototype.inserirUsuario = function( usuarioJson ) {
	console.log(this._connection);
	this._connection.open( function( err, mongoClient ) {
		mongoClient.collection( "usuarios", function( err, collection ){
			collection.insert( usuarioJson );

			mongoClient.close();
		} );
	} );
};

module.exports = function(){
	return UsuariosDAO;
};
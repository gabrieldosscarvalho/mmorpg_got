/* Importar o mongodb */
var mongo = require('mongodb');

var conexaoMongoDB = function(){
	console.log('entrou');
	var db = new mongo.Db(
		'got',
		new mongo.Server(
			'localhost', // string contendo o endereço do servidor
			2707, // porta de conexão padrao
			{}
		),
		{}
	);

	return db;
}

module.exports = function(){
	return conexaoMongoDB;
}
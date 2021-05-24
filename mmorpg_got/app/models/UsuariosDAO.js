function UsuariosDAO(connection) {
  this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function (usuarioJson) {
  console.log(this._connection);
  this._connection.open(function (err, mongoClient) {
    mongoClient.collection("usuarios", function (err, collection) {
      collection.insert(usuarioJson);

      mongoClient.close();
    });
  });
};

UsuariosDAO.prototype.autenticar = function (usuario, req, res) {
  console.log("-- autenticar");
  console.table(usuario);
  this._connection.open(function (err, mongoClient) {
    mongoClient.collection("usuarios", function (err, collection) {
      var cursor = collection.find({
        usuario: { $eq: usuario.usuario },
        senha: { $eq: usuario.senha },
      });

      //   **** TMBM PODERIA SER ASSIM ****
      //   var cursor = collection.find({
      //     usuario: usuario.usuario,
      //     senha: usuario.senha,
      //   });
      //   **** CONSEQUENTEMENTE TMBM PODERIA SER ASSIM ****
      //   var cursor = collection.find(usuario);

      cursor.toArray(function (err, result) {
        if (result[0] !== undefined) {
          req.session.autorizado = true;
          req.session.usuario = result[0].usuario;
          req.session.casa = result[0].casa;
        }

        if (req.session.autorizado) {
          res.redirect("jogo");
        } else {
          res.render("index", { validacao: {} });
        }
      });

      mongoClient.close();
    });
  });
};

module.exports = function () {
  return UsuariosDAO;
};

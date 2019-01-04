
module.exports.cadastro = function( application, req, res ){
	res.render('cadastro', {validacao: {}, dadosForm: {}});
};

module.exports.cadastrar = function( application, req, res ){
	let dadosForm = req.body;

	req.assert('nome',		'Nome não pode ser vazio').notEmpty();
	req.assert('usuario',	'Usuário não pode ser vazio').notEmpty();
	req.assert('senha',		'Senha não pode ser vazio').notEmpty();
	req.assert('casa',		'Casa não pode ser vazio').notEmpty();

	let errosForm = req.validationErrors();

	if ( errosForm ) {
		res.render('cadastro', {validacao: errosForm, dadosForm: dadosForm});
		// console.log(errosForm);
		// res.send(`Existem erros no formulário.<br><br>${errosForm.reduce(function(acc, value){
		// 	return ( acc instanceof Object )? acc.msg : `${acc}<br>${value.msg}` ;
		// })}`);
		return;
	}

	res.send("Podem cadastrar");
};
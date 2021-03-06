var express = require('express');
//torna a variavel visivel nos outros modulos
var app = module.exports = express();
var bodyParser = require('body-parser');

//executado antes de cada resposta
var allowCors = function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST'); //DELETE
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Credentials', 'true');
	next(); // continue com o processamento
}
 app.listen(5000);
 app.use(allowCors);
 app.use(bodyParser.json());
 app.use(express.static(__dirname + '/doc'));
 app.use(bodyParser.urlencoded ({
 	extended: true
}));

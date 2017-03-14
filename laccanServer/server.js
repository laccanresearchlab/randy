var app = require('./server_config.js');
var sensorCtrl = require('./controller/sensorCtrl.js');
var emailCtrl = require('./controller/emailCtrl.js');
var validator = require('validator'); //medida de segurança
var http = require('http');

app.get('/', function(req, res){
	res.end("LaCCAN, pronto para voar.");

	console.log("Servidor ligado, pronto para voar.");
});

app.get('/teste', function(req, res){
	res.end("Laccanianos, estamos em teste!!!");

	console.log("Testes Laccanianos, console!!!");
});

/*******  Operacoes em sensores  ********/

/**
*@api{get}/api/v1/sensors 1.Retorna todos os registros do sensor
*@apiName GetSensors
*@apiGroup Sensors
*@apiVersion 1.0.0
*@apiSuccessExample Documento de retorno
*{
*   "nodeID": "9",
*   "sensirion_temp": "28.580000000000005",
*   "sensirion_hum": "66.923304712",
*   "intersema_temp": "28",
*   "intersema_press": "1005",
*   "infrared_light": "0",
*   "light": "0",
*   "accel_x": "208",
*   "accel_y": "137",
*   "voltage": "2494",
*   "country": "Brazil",
*   "state": "Alagoas",
*   "city": "Maceió",
*   "latitude": "-9.555032",
*   "longitude": "-35.774708",
*   "env_id": "lab_17",
*   "date": "2016-06-24T21:58:19.000Z",
*}
*/
app.get('/api/v1/sensors', function(req, res){
	//res.end("Pegando dados de sensores");
	sensorCtrl.list(function(resp){
		res.send(resp);
	//	res.json(resp);
	});
	console.log("Conspirações Laccanianas pegando dados de sensores!!!");
});

app.get('/api/v1/sensors0', function(req, res){
	sensorCtrl.list0(function(resp){
		res.send(resp);
	});
//	res.send("Pronto, sensors");
});

/**
*@api{get}/api/v1/sensors/:fields 2.Retorna todos os registros com os campos especificados em fields
*@apiName GetSensorsFields
*@apiGroup Sensors
*@apiVersion 1.0.0
*@apiSuccess {String} fields Campos que quer nos seus dados separados por espaço.
* Exemplo: http://200.133.124.11/api/v1/sensors/nodeID city state
*@apiSuccessExample Documento de retorno
*{
*   nodeID: 9,
*   sensirion_temp: 28.580000000000005,
*   sensirion_hum: 66.923304712,
*   intersema_temp: 28,
*   intersema_press: 1005,
*   infrared_light: 0,
*   light: 0,
*   ...
*   env_id: lab_17,
*   date: 2016-06-24T21:58:19.000Z,
*}
*/
app.get('/api/v1/sensors/:fields', function(req, res){
	var fields = validator.trim(validator.escape(req.param('fields')));	
	sensorCtrl.sensor_fields(fields, function(respo){
		res.send(respo);
	});

});

/**
*@api{get}/api/v1/sensors/:nodeID/:env_id 3.Retorna todos os registros com nodeID e env_id especificados
*@apiName GetSensorsNodeEnvir
*@apiGroup Sensors
*@apiVersion 1.0.0
*@apiSuccess {String} nodeID Código identificador do sensor.
*@apiSuccess {String} env_id Localização física do sensor.
* Exemplo: http://200.133.124.11/api/v1/sensors/7/lab_17
*@apiSuccessExample Documento de retorno
*{
*   nodeID: 9,
*   sensirion_temp: 28.580000000000005,
*   sensirion_hum: 66.923304712,
*   intersema_temp: 28,
*   intersema_press: 1005,
*   infrared_light: 0,
*   light: 0,
*   ...
*   env_id: lab_17,
*   date: 2016-06-24T21:58:19.000Z,
*}
*/
app.get('/api/v1/sensors/:nodeID/:env_id', function(req, res){
	//res.end("Pegando sensor com esse nodeID");
	var nodeID = validator.trim(validator.escape(req.param('nodeID'))),
	    env_id = validator.trim(validator.escape(req.param('env_id')));
	sensorCtrl.sensor(nodeID, env_id, function(resp){
		res.json(resp);
	});
	console.log("Laccaniano, pegando sensor com nodeID: "+ nodeID+" e env_id: "+env_id);
});


//*****************Deprecated
app.get('/api/v1/sensors/:from/:to/teste', function(req, res){
	var from = validator.trim(validator.escape(req.param('from'))),
	    to   = validator.trim(validator.escape(req.param('to')));

	sensorCtrl.sensor_range(from, to, function(resp){
		res.json(resp);
	});
	console.log('Laccaniano pesquisa por data efetuada!');
});

//***************Interno
app.get('/api/v1/sensors/:from/:to/:fields/:env_id/dados.json', function(req, res){
	var from = req.param('from'),
	      to = req.param('to'),
	  fields = req.param('fields');

	env_id = (env_id == "All" ? "":env_id);
//	console.log('No download: env_id: '+env_id);
	sensorCtrl.sensor_with_fields(from, to, fields,env_id, function(resp){
		
		res.send(new Buffer(JSON.stringify(resp)));
	});
	console.log('Laccaniano, pesquisa com campos personalizados bem feita!');
});

/**
*@api{get}/api/v1/sensors/:from/:to/:env_id/:email/:fields/ 4.Retorna os últimos 30 registros do sensor e envia arquivo para email especificado
*@apiName GetSensorsEmail
*@apiGroup Sensors
*@apiVersion 1.0.0
*@apiSuccess {String} from Data de início no formato UTF, Exemplo: Tue Mar 01 2016 00:00:00
*@apiSuccess {String} to Data de fim no formato UTF, Exemplo: Fri Jun 24 2016 17:07:15
*@apiSuccess {String} env_id Localização física do sensor
*@apiSuccess {String} email Lista de email's que irão receber o arquivo (separar com vírgula)
*@apiSuccess {String} fields Campos que você quer no seu arquivo separados por espaço. Exemplo: http://laccan.ufal.br/api/v1/sensors/Tue Mar 01 2016 00:00:00/Fri Jun 24 2016 17:07:15/lab_17/seu_email@provedor.com/nodeID sensirion_hum light sensirion_temp date
*@apiSuccessExample Arquivo retornado dados.json:
*{
*	nodeID: 3,
*	sensirion_hum: 555,
*	light: 434,
*	sensirion_temp: 6343,
*	date: 12/12/12
*}
*@apiDescription Envia o arquivo para baixar na lista de email informada
*/
app.get('/api/v1/sensors/:from/:to/:env_id/:email/:fields', function(req, res){
	var from = validator.trim(validator.escape(req.param('from'))),
	      to = validator.trim(validator.escape(req.param('to'))),
	  env_id = validator.trim(validator.escape(req.param('env_id'))),
	  fields = validator.trim(validator.escape(req.param('fields'))),
	   email = validator.trim(validator.escape(req.param('email')));

	var from = (isNaN(from) ? from : new Date(Number(from)));
	var to = (isNaN(to) ? to: new Date(Number(to)));
	var resp = 'http://200.133.124.11/api/v1/sensors/'+from+'/'+to+'/'+fields+'/'+env_id+'/dados.json';
	emailCtrl.send(email, resp, function(respo){
		res.send(respo);
	});
//	res.end('Laccaniano trabalhando, em construção!');
});

app.post('/api/v1/sensors0', function(req, res){
        //res.json(req.body);
        //res.end("Gravando usuario");
        //precisa chamar save() para salvar no banco de dados
        var nodeID = validator.escape(req.body.nodeID),
                sensirion_temp = validator.escape(req.body.sensirion_temp),
                sensirion_hum = validator.escape(req.body.sensirion_hum),
                intersema_temp = validator.escape(req.body.intersema_temp),
                intersema_press = validator.escape(req.body.intersema_press),
                infrared_light = validator.escape(req.body.infrared_light),
                light = validator.escape(req.body.light),
                accel_x = validator.escape(req.body.accel_x),
                accel_y = validator.escape(req.body.accel_y),
                voltage = validator.escape(req.body.voltage),
                country = validator.escape(req.body.country),
                state = validator.escape(req.body.state),
                city = validator.escape(req.body.city),
                latitude = validator.escape(req.body.latitude),
                longitude = validator.escape(req.body.longitude);
                data = validator.escape(req.body.date);
                env_id = validator.escape(req.body.env_id);
        // res.send(nodeID +"\n"+sensirion_temp+
        //      "\n"+ sensirion_hum+ "\n"+ intersema_temp+
        //      "\n"+ intersema_press +"\n"+ infrared_light+
        //      "\n"+ light +"\n"+ accel_x+ "\n"+ accel_y+
        //      "\n"+ voltage +"\n"+ country+ "\n"+ state+
        //      "\n"+ city +"\n"+ latitude + "\n"+ longitude);

         sensorCtrl.save0(nodeID, sensirion_temp, sensirion_hum, intersema_temp, intersema_press, infrared_light, light,accel_x,accel_y, voltage, country, state, city, latitude, longitude, data, env_id, function(resp){
                res.json(resp);
        });

});

app.post('/api/v1/sensors', function(req, res){
	//res.json(req.body);
	//res.end("Gravando usuario");
	//precisa chamar save() para salvar no banco de dados
	var nodeID = validator.escape(req.body.nodeID),
		sensirion_temp = validator.escape(req.body.sensirion_temp),
		sensirion_hum = validator.escape(req.body.sensirion_hum),
		intersema_temp = validator.escape(req.body.intersema_temp),
		intersema_press = validator.escape(req.body.intersema_press),
		infrared_light = validator.escape(req.body.infrared_light),
		light = validator.escape(req.body.light),
		accel_x = validator.escape(req.body.accel_x),
		accel_y = validator.escape(req.body.accel_y),
		voltage = validator.escape(req.body.voltage),
		country = validator.escape(req.body.country),
		state = validator.escape(req.body.state),
		city = validator.escape(req.body.city),
		latitude = validator.escape(req.body.latitude),
		longitude = validator.escape(req.body.longitude);
		data = validator.escape(req.body.date);
		env_id = validator.escape(req.body.env_id);
	// res.send(nodeID +"\n"+sensirion_temp+
	// 	"\n"+ sensirion_hum+ "\n"+ intersema_temp+
	// 	"\n"+ intersema_press +"\n"+ infrared_light+
	// 	"\n"+ light +"\n"+ accel_x+ "\n"+ accel_y+
	// 	"\n"+ voltage +"\n"+ country+ "\n"+ state+
	// 	"\n"+ city +"\n"+ latitude + "\n"+ longitude);
	
	 sensorCtrl.save(nodeID, sensirion_temp, sensirion_hum, intersema_temp, intersema_press, infrared_light, light,accel_x,accel_y, voltage, country, state, city, latitude, longitude, data, env_id, function(resp){
	 	res.json(resp);
	});
	
});
// app.put('/api/v1/sensors', function(req, res){
// 	//res.end("Atualiza sensor com esse nodeID");

// 	var id = validator.trim(validator.escape(req.param('id')));
// 	var fullname = validator.trim(validator.escape(req.param('fullname')));
// 	var email = validator.trim(validator.escape(req.param('email')));
// 	var password = validator.trim(validator.escape(req.param('password')));
	
// 	usrCtrl.update(id, fullname, email, password, function(resp){
// 		res.json(resp);
// 	});
// 	console.log("Atualiza usuario com esse ID, console");
// });

//qualquer acesso externo é redirecionado para essa página
 app.get('*', function(req, res) {
	res.sendFile('doc/index.html', {root: __dirname});
	//res.sendfile('./public/index.html');
 });

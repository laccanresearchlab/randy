var db_string = 'mongodb://127.0.0.1/sensornet';
var mongoose = require('mongoose').connect(db_string);
var db = mongoose.connection;
var Sensor, Sensors0;

 db.on('error', console.error.bind(console, 'Erro ao conectar com o mongodb!'));
 db.once('open', function(){
  	var sensorSchema = mongoose.Schema({
 		//minhas propriedades
		'nodeID': String, //7
		"sensirion_temp" : String, //22.270000000000003,
		'sensirion_hum' : String, //51.08037623200001,
		'intersema_temp' : String, //22,
		'intersema_press' : String, //1002,
		'infrared_light' : String, //2223,
		'light' : String, //263, 
		'accel_x' : String, //190,
		'accel_y' : String, //173,
		'voltage' : String, //2566,
		'country' : String, //"Brazil",
		'state' : String, //"Alagoas",
		'city' : String, //"Maceio",
		'latitude' : String, //-9.555032,
		'longitude' : String, //-35.774708,
		'env_id' : String,
		'date' : Date //ISODate("2015-10-15T18:38:08.851Z")	 });
	});
	 //define como indice de pesquisa
	 sensorSchema.index({"_id":1, "date":-1, "env_id":1}); 
	 //podemos usar os metodos do model do mongoose
	 exports.Sensor = mongoose.model('Sensor', sensorSchema);
	 exports.Sensors0 = mongoose.model('Sensors0', sensorSchema);
 });

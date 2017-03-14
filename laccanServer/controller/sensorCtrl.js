var db = require('../db_config.js');

//Collection Sensors0
exports.list0 = function(callback){
	db.Sensors0.find({}, function(error, sensors){
		if(error){
			callback({error: 'Erro no Sensors0'});
		}
		else {
			callback(sensors);
		}
	});
};

exports.sensor_fields0 = function(fields, callback){
        db.Sensors0.find({},fields, function(error, sensors){
                if(error){
                        callback({error:'Ocorreu um problema: '+error});
                } else {
                        callback(sensors);
                }
        });
};

exports.sensor0 = function(nodeID, env_id, callback){
        db.Sensors0.find({'nodeID':nodeID, 'env_id':env_id}, function(error, sensor){
                if(error){
                        callback({error: 'Nao foi possível retornar os dados do sensor de id='+ nodeID});
                }else {
                        callback(sensor);
                }
        }).setOptions({lean: true}).limit(30).sort({'date':-1});
};
  
exports.save0 = function(nodeID, sensirion_temp, sensirion_hum, intersema_temp, intersema_press, infrared_light, light,accel_x,accel_y, voltage, country, state, city, latitude, longitude,data, env_id, callback){
        new db.Sensors0({
                'nodeID' : nodeID,
                'sensirion_temp' : sensirion_temp,
                'sensirion_hum' : sensirion_hum,
                'intersema_temp' : intersema_temp,
                'intersema_press' : intersema_press,
                'infrared_light' : infrared_light,
                'light' : light,
                'accel_x' : accel_x,
                'accel_y' : accel_y,
                'voltage' : voltage,
                'country' : country,
                'state' : state,
                'city' : city,
                'latitude' : latitude,
                'longitude' : longitude,
                'env_id': env_id,
                'date': data

        }).save(function(error, sensor){
                if(error){
                        callback({erro: 'Não foi possível salvar dados!'+ error});
                } else {
                        callback(sensor);
                }
        });

};



//Collection Sensor
exports.list = function(callback){
	db.Sensor.find({}, function(error, sensors){
		if(error){
			callback({error: 'Nao foi possível retornar os dados dos sensores!'});
		}else {
			callback(sensors);
		}
	}).setOptions({lean: true}).sort({'date':-1}).limit(30);//.skip(2) - limita a dois resultados e pula dois resultados

};

exports.sensor_fields = function(fields, callback){
	db.Sensor.find({},fields, function(error, sensors){
		if(error){
			callback({error:'Ocorreu um problema: '+error});
		} else {
			callback(sensors);
		}
	}).setOptions({lean: true}).sort({'date':-1}).limit(30);
};

exports.sensor = function(nodeID, env_id, callback){
	db.Sensor.find({'nodeID':nodeID, 'env_id':env_id}, function(error, sensor){
		if(error){
			callback({error: 'Nao foi possível retornar os dados do sensor de id='+ nodeID});
		}else {
			callback(sensor);
		}
	}).setOptions({lean: true}).limit(30).sort({'date':-1});
};

exports.sensor_range = function(from, to, callback){
	db.Sensor.find({date:{$gt: new Date(from).toISOString(),
				$lt: new Date(to).toISOString()}},
			function(error, sensor){
		if(error){
			callback({error: 'Erro, ocorreu um problema com as datas passadas no parametro:'+error});
		}else{
			callback(sensor);
		}
			
	}).setOptions({lean: true});

};

exports.sensor_with_fields = function(from, to, fields,env_id, callback){
//	console.log("FROM: "+ from);
//	console.log("TO: "+ to);
	db.Sensor.find({date:{$gt: new Date(from).toISOString(),
				$lt: new Date(to).toISOString()},
				'env_id':env_id},
				fields,
				function(error, sensor){
		if (error){
		   callback({error: 'Erro, ocorreu um problema com as datas passadas no parametro: '+error});
		}else {
		   callback(sensor);
		   console.log('Laccaniano fez pesquisa com data e campos personalizados');
		}
	}).setOptions({lean: true});

};

//exports.sensor_to_email

exports.save = function(nodeID, sensirion_temp, sensirion_hum, intersema_temp, intersema_press, infrared_light, light,accel_x,accel_y, voltage, country, state, city, latitude, longitude,data, env_id, callback){
	new db.Sensor({
		'nodeID' : nodeID,
		'sensirion_temp' : sensirion_temp,
		'sensirion_hum' : sensirion_hum,
		'intersema_temp' : intersema_temp,
		'intersema_press' : intersema_press,
		'infrared_light' : infrared_light,
		'light' : light,
		'accel_x' : accel_x,
		'accel_y' : accel_y,
		'voltage' : voltage,
		'country' : country,
		'state' : state,
		'city' : city,
		'latitude' : latitude,
		'longitude' : longitude,
		'env_id': env_id,
		'date': data

	}).save(function(error, sensor){
		if(error){
			callback({erro: 'Não foi possível salvar dados!'+ error});
		} else {
			callback(sensor);
		}
	});
	
};


exports.update = function(id, nodeID, sensirion_temp, sensirion_hum, intersema_temp, intersema_press, infrared_light, light,accel_x,accel_y, voltage, country, state, city, latitude, longitude,callback){
	db.Sensor.findById(id, function(error, sensor){
		if(sensirion_temp) sensor.sensirion_temp = sensirion_temp;
		if(sensirion_hum) sensor.sensirion_hum = sensirion_hum;

		sensor.save(function(error, sensor){
			if(error){
				callback({error: 'Nao foi possível atualizar o sensor de id='+ id});
			}else {
				callback(sensor);
			}	
		})
		
	});
};

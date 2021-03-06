define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/sensors",
    "title": "1.Retorna todos os registros do sensor",
    "name": "GetSensors",
    "group": "Sensors",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Documento de retorno",
          "content": "{\n  \"nodeID\": \"9\",\n  \"sensirion_temp\": \"28.580000000000005\",\n  \"sensirion_hum\": \"66.923304712\",\n  \"intersema_temp\": \"28\",\n  \"intersema_press\": \"1005\",\n  \"infrared_light\": \"0\",\n  \"light\": \"0\",\n  \"accel_x\": \"208\",\n  \"accel_y\": \"137\",\n  \"voltage\": \"2494\",\n  \"country\": \"Brazil\",\n  \"state\": \"Alagoas\",\n  \"city\": \"Maceió\",\n  \"latitude\": \"-9.555032\",\n  \"longitude\": \"-35.774708\",\n  \"env_id\": \"lab_17\",\n  \"date\": \"2016-06-24T21:58:19.000Z\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./server.js",
    "groupTitle": "Sensors",
    "sampleRequest": [
      {
        "url": "http://200.133.124.11/api/v1/sensors"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/sensors/:from/:to/:env_id/:email/:fields/",
    "title": "4.Retorna os últimos 30 registros do sensor e envia arquivo para email especificado",
    "name": "GetSensorsEmail",
    "group": "Sensors",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "from",
            "description": "<p>Data de início no formato UTF, Exemplo: Tue Mar 01 2016 00:00:00</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "to",
            "description": "<p>Data de fim no formato UTF, Exemplo: Fri Jun 24 2016 17:07:15</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "env_id",
            "description": "<p>Localização física do sensor</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Lista de email's que irão receber o arquivo (separar com vírgula)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fields",
            "description": "<p>Campos que você quer no seu arquivo separados por espaço. Exemplo: http://laccan.ufal.br/api/v1/sensors/Tue Mar 01 2016 00:00:00/Fri Jun 24 2016 17:07:15/lab_17/seu_email@provedor.com/nodeID sensirion_hum light sensirion_temp date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Arquivo retornado dados.json:",
          "content": "{\n\tnodeID: 3,\n\tsensirion_hum: 555,\n\tlight: 434,\n\tsensirion_temp: 6343,\n\tdate: 12/12/12\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Envia o arquivo para baixar na lista de email informada</p>",
    "filename": "./server.js",
    "groupTitle": "Sensors",
    "sampleRequest": [
      {
        "url": "http://200.133.124.11/api/v1/sensors/:from/:to/:env_id/:email/:fields/"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/sensors/:fields",
    "title": "2.Retorna todos os registros com os campos especificados em fields",
    "name": "GetSensorsFields",
    "group": "Sensors",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fields",
            "description": "<p>Campos que quer nos seus dados separados por espaço. Exemplo: http://200.133.124.11/api/v1/sensors/nodeID city state</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Documento de retorno",
          "content": "{\n  nodeID: 9,\n  sensirion_temp: 28.580000000000005,\n  sensirion_hum: 66.923304712,\n  intersema_temp: 28,\n  intersema_press: 1005,\n  infrared_light: 0,\n  light: 0,\n  ...\n  env_id: lab_17,\n  date: 2016-06-24T21:58:19.000Z,\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./server.js",
    "groupTitle": "Sensors",
    "sampleRequest": [
      {
        "url": "http://200.133.124.11/api/v1/sensors/:fields"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/sensors/:nodeID/:env_id",
    "title": "3.Retorna todos os registros com nodeID e env_id especificados",
    "name": "GetSensorsNodeEnvir",
    "group": "Sensors",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nodeID",
            "description": "<p>Código identificador do sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "env_id",
            "description": "<p>Localização física do sensor. Exemplo: http://200.133.124.11/api/v1/sensors/7/lab_17</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Documento de retorno",
          "content": "{\n  nodeID: 9,\n  sensirion_temp: 28.580000000000005,\n  sensirion_hum: 66.923304712,\n  intersema_temp: 28,\n  intersema_press: 1005,\n  infrared_light: 0,\n  light: 0,\n  ...\n  env_id: lab_17,\n  date: 2016-06-24T21:58:19.000Z,\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./server.js",
    "groupTitle": "Sensors",
    "sampleRequest": [
      {
        "url": "http://200.133.124.11/api/v1/sensors/:nodeID/:env_id"
      }
    ]
  }
] });

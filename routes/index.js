var express = require('express');
var router = express.Router();
var fs = require('fs');
var cacheFile = './routes/cache/cache.json';

var data = [];

var tempSensor = require('./objects/temperature.js');
var humSensor = require('./objects/humidity.js');
var vibSensor = require('./objects/vibration.js');

var temperatureSensor =  new tempSensor("Temperature", "0.0", "Celsius");
var humiditySensor = new humSensor("Humidity", "0.0", "%");
var vibrationSensor = new vibSensor("Vibration", "False", "Boolean");

data.push(temperatureSensor);
data.push(humiditySensor);
data.push(vibrationSensor);

/* GET home page. */
router.get('/', function(req, res) {
	updateDataFromCache();
	res.render('index', {
		title: 'piSensors',
		sensorData: data
	});
});

router.get('/update/:reqSensor', function(req, res, next) {
	processEndpoint(req, res, function(found){
		if (!found) {
			var err = new Error('Endpoint Not Found');
			err.status = 500;
			next(err);
		}
	});
});

function processEndpoint(req, res, callback) {
	var found = false;
	data.forEach(function(sensor) {
		if (sensor.sensor == req.params.reqSensor) {
			found = true;
			sensor.fetchDataFromSensor(function(error){
				if (!error) {
					res.json(sensor);
				} else {
					res.status(501).send('python script execution error!');
				}
			});
		}
	});
	callback(found);
}

function updateDataFromCache() {
	var cachedData = fs.readFileSync(cacheFile, 'utf8');
	cachedData = JSON.parse(cachedData).sensors;
	data.forEach(function (sensor) {
        sensor.fetchDataFromCache(cachedData);
    });
}


module.exports = router;

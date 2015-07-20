var express = require('express');
var router = express.Router();
var Sensor = require('./objects/sensor.js');
var fs = require('fs');
var cacheFile = './routes/cache/cache.json';

var data = [];

var temperatureSensor = new Sensor("Temperature", "0.0", "Celsius");
var humiditySensor = new Sensor("Humidity", "0.0", "%");
var viberationSensor = new Sensor("Viberation", "False", "Boolean");

data.push(temperatureSensor);
data.push(humiditySensor);
data.push(viberationSensor);

/* GET home page. */
router.get('/', function(req, res, next) {
	updateDataFromCache();
  res.render('index', { 
		title: 'piSeonsers',
		sensorData: data
	});
});

function updateDataFromCache (){
	cachedData = fs.readFileSync(cacheFile, 'utf8');
  cachedData = JSON.parse(cachedData).sensors;
	updateInstancesWithCache(cachedData);
}

function updateInstancesWithCache (cachedData) {
	
	for (var i = 0; i < cachedData.length; i++) {
		switch(cachedData[i].sensor) {
			case 'Temperature':	
				temperatureSensor.fetchDataFromCache(cachedData[i]);
				break;
			case 'Humidity':	
				humiditySensor.fetchDataFromCache(cachedData[i]);
				break;
			case 'Viberation':	
				viberationSensor.fetchDataFromCache(cachedData[i]);
				break;
			default:
				console.warn('Error! Out of scope.');
		}
	}
}

module.exports = router;

/**
 * Created by tyler on 7/19/15.
 */

var Sensor = require('./sensor.js');

function Humidity(sensor, value, unit) {
    Sensor.call(this, sensor, value, unit);
}

Humidity.prototype = new Sensor();

Humidity.prototype.fetchDataFromSensor = function(callback) {
    var cmd = 'sudo ./scripts/temphum.py 4 hum';
    Sensor.prototype.fetchDataFromSensor.call(this, cmd, callback);
};

Humidity.prototype.fetchDataFromCache = function(cachedData) {
    var JSONData = cachedData.Humidity;
    Sensor.prototype.fetchDataFromCache.call(this, JSONData);
};

module.exports = Humidity;
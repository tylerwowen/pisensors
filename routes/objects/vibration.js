/**
 * Created by tyler on 7/19/15.
 */

var Sensor = require('./sensor.js');

function Vibration(sensor, value, unit) {
    Sensor.call(this, sensor, value, unit);
}

Vibration.prototype = new Sensor();

Vibration.prototype.fetchDataFromSensor = function(callback) {
    var cmd = 'sudo ./scripts/temphum.py 4 hum';
    Sensor.prototype.fetchDataFromSensor.call(this, cmd, callback);
};

Vibration.prototype.fetchDataFromCache = function(cachedData) {
    var JSONData = cachedData.Vibration;
    Sensor.prototype.fetchDataFromCache.call(this, JSONData);
};

module.exports = Vibration;
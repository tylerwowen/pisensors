/**
 * Created by tyler on 7/19/15.
 */

var Sensor = require('./sensor.js');

function Temperature(sensor, value, unit) {
    Sensor.call(this, sensor, value, unit);
}

Temperature.prototype = new Sensor();

Temperature.prototype.fetchDataFromSensor = function(callback) {
    var cmd = 'sudo ./scripts/temphum.py 4 temp';
    Sensor.prototype.fetchDataFromSensor.call(this, cmd, callback);
};

Temperature.prototype.fetchDataFromCache = function(cachedData) {
    var JSONData = cachedData.Temperature;
    Sensor.prototype.fetchDataFromCache.call(this, JSONData);
};

module.exports = Temperature;
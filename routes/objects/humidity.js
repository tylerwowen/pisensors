/**
 * Created by tyler on 7/19/15.
 */

var Sensor = require('./sensor.js');

function Humidity(sensor, value, unit) {
    Sensor.call(this, sensor, value, unit);
}

Humidity.prototype = new Sensor();

Humidity.prototype.fetchDataFromSensor = function() {
    var exec = require('child_process').exec;
    var cmd = 'sudo ./scripts/temphum.py 4 hum';
    exec(cmd,
        {
            timeout:2000
        },
        function(error, stdout, stderr) {
            if (error == null) {
                this.value = stdout;
                this.updateTime();
            } else {
                console.log('exec error: ' + error);
            }
        }
    );
};

Humidity.prototype.fetchDataFromCache = function(cachedData) {
    var JSONData = cachedData.Humidity;
    this.value = JSONData.value;
    this.updatedAt = JSONData.updatedAt;
};

module.exports = Humidity;
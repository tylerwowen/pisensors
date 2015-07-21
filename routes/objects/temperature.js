/**
 * Created by tyler on 7/19/15.
 */

var Sensor = require('./sensor.js');

function Temperature(sensor, value, unit) {
    Sensor.call(this, sensor, value, unit);
}

Temperature.prototype = new Sensor();

Temperature.prototype.fetchDataFromSensor = function() {
    var exec = require('child_process').exec;
    var cmd = 'sudo /scripts/temphum.py 4 temp';
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

Temperature.prototype.fetchDataFromCache = function(cachedData) {
    var JSONData = cachedData.Temperature;
    this.value = JSONData.value;
    this.updatedAt = JSONData.updatedAt;
};

module.exports = Temperature;
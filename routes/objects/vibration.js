/**
 * Created by tyler on 7/19/15.
 */

var Sensor = require('./sensor.js');

function Vibration(sensor, value, unit) {
    Sensor.call(this, sensor, value, unit);
}

Vibration.prototype = new Sensor();

Vibration.prototype.fetchDataFromSensor = function() {
    var exec = require('child_process').exec;
    var cmd = 'sudo ./scripts/temphum.py 4 temp';
    var thisObject = this;
    exec(cmd,
        {
            timeout:2000
        },
        function(error, stdout, stderr) {
            if (error == null) {
                thisObject.value = stdout;
                thisObject.updateTime();
            } else {
                console.log('exec error: ' + error);
            }
        }
    );
};

Vibration.prototype.fetchDataFromCache = function(cachedData) {
    var JSONData = cachedData.Vibration;
    this.value = JSONData.value;
    this.updatedAt = JSONData.updatedAt;
};

module.exports = Vibration;
function Sensor(sensor, value, unit) {
	this.sensor = sensor;
	this.value = value;
	this.unit = unit;
	this.updatedAt = "";
}

Sensor.prototype.setValue = function(value) {
	this.value = value;
};

Sensor.prototype.fetchDataFromSensor = function(cmd, callback) {
	var exec = require('child_process').exec;
	var thisObject = this;
	exec(cmd,
		{
			timeout:3000
		},
		function(error, stdout, stderr) {
			if (error == null) {
				thisObject.value = stdout;
				thisObject.updateTime()
				callback();
			} else {
				console.log('exec error: ' + error);
				callback(error);
			}
		}
	);
};

Sensor.prototype.fetchDataFromCache = function(JSONData) {
	this.value = JSONData.value;
	this.updatedAt = JSONData.updatedAt;
};

Sensor.prototype.updateTime = function() {
	this.updatedAt = new Date().toLocaleTimeString()
};


module.exports = Sensor;
function Sensor(sensor, value, unit) {
	this.sensor = sensor;
	this.value = value;
	this.unit = unit;
	this.updatedAt = "";
}

Sensor.prototype.setValue = function(value) {
	this.value = value;
};

Sensor.prototype.fetchDataFromSensor = function() {

};

Sensor.prototype.fetchDataFromCache = function(cachedData) {

};

Sensor.prototype.updateTime = function() {
	this.updatedAt = new Date().toLocaleTimeString()
};


module.exports = Sensor;
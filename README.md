PiSensors
=========
What's the temperature in my room? Do I need to water my plants? I have a Raspberry Pi with several sensors connected to it, it's not hard to answer these questions. SSH to your Pi, run a Python script you wrote before and then I can get the data. The problem here is, however, how to access them easily? A web app is a good candidate for this purpose.

[Github repository](https://github.com/tylerwowen/pisensors).

## Overview
----------
The basic idea is that to create a web app that shows the data from different sensors. The data can be either cached or just updated. The information is presented in a table, with an `Update` button at the end of each row. Once `Update` is clicked, the front-end makes an API call so the backend activates the sensor and sends back the date.

## Setup
--------
I chose *Node.js* with *Express.js* framework as my backend. For front-end, apart from *HTML*, *Javascript* and *CSS*, I also used *Jade* to generate pages.

### Installation
* Install Node.js + npm  
  `sudo apt-get install node`
* Choose a proper directory and clone my [git repo](https://github.com/tylerwowen/pisensors)

  ```bash
  cd somewhere/
  git clone https://github.com/tylerwowen/pisensors
  cd pisensors
  npm install
  ```

  `npm install` will install all required dependencies that are defined in package.json

* I include a python script that reads from `DHT 11 Temperature and Humidity` sensor. Change permission of `temphum.py` if you see any thing like: `sudo: ./scripts/temphum.py: command not found`

  ```sh
  chmod 755 pisensor/scripts/temphum.py
  ```  

After the above steps, the layout should be like this:

```
├── app.js
├── bin
│   └── www
├── node_modules
│   ├── body-parser
│   ├── debug
│   ├── express
│   ├── jade
│   └── morgan
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── cache
│       └── cache.json
│   ├── objects
│       ├── humidity.js
│       ├── sensor.js
│       ├── temperature.js
│       └── vibration.js
│   ├── index.js
│   └── users.js
├── scripts
│   └── temphum.py
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade
```

### Configuration

#### Dependencies

* To run /scripts/temphum.py, you need to install the Adtruit_DHT library.

  ```bash  
  sudo apt-get update
  sudo apt-get install build-essential python-dev
  git clone https://github.com/adafruit/Adafruit_Python_DHT.git dhtlib
  cd dhtlib
  sudo python setup.py install
  cd .. && sudo rm -r dhtlib
  ```

* If you have other sensors instead, you should also place your scripts/programs under this directory

#### Add New Sensors
When you need to add a new sensor.

* In /routes/objects, create a subclass of sensors.js. For example, create a light.js

  ```javascript
  var Sensor = require('./sensor.js');

  function Light(sensor, value, unit) {
    Sensor.call(this, sensor, value, unit);
  }

  Light.prototype = new Sensor();

  Light.prototype.fetchDataFromSensor = function(callback) {
    var cmd = 'sudo ./scripts/light.py'; // You need to write this script
    Sensor.prototype.fetchDataFromSensor.call(this, cmd, callback);
  };

  Light.prototype.fetchDataFromCache = function(cachedData) {
    var JSONData = cachedData.light;
    Sensor.prototype.fetchDataFromCache.call(this, JSONData);
  };

  module.exports = Light;
  ```

* In /routes/index.js
  * Add `litsSensor = require('./objects/light.js');` under `var vibSensor = require('./objects/vibration.js');`
  * Add `var lightSensor = new litSensor("Light", "False", "Boolean");` under `var vibrationSensor = new vibSensor("Vibration", "False", "Boolean");`
  * Add `data.push(lightSensor);` under `data.push(vibrationSensor);`

* In /routes/cahe/cache.json, append initial data to make it look like this:

  ```json
  ...
  "Vibration": {
    "sensor": "Vibration",
    "value": "True",
    "unit": "celsius",
    "updatedAt": "11:37:31 PM"
  },
  "Light": {
    "sensor": "Light",
    "value": "True",
    "unit": "celsius",
    "updatedAt": "12:27:31 PM"
  }
  ...
  ```
  Since I haven't implemented the database at this moment(July 26, 2015), it's necessary to modify the cache file manually. Later the MongoDB will be added and this part will be discarded.

## Implementation
------------------

### /routes/index.js
This file is the core of this web application. It has two responsibilities (I know this violates the Single Responsibility Principle, but I will explain):

* Generates the contents of index page

* Responses to API calls in JSON format

### /routes/objects/Sensor.js
It is the super class for all other specific sensors. It's not totally abstract, and it has some concrete methods.

### /views/index.jade
The index.jade provides a layout for the data table. It works for any number of sensors. To do so, it loops over the array `sensorData` which is passed from `index.js`.  

### /public/javascript/main.js
This is the front-end javascript that listens to click events. Once an user clicks the `Update` button of a sensor, the scripts calls the corresponding API and updates the row based on the response from backend. An example API call: `http://127.0.0.1:3000/update/Temperature`.

## Outcome
----------

The web page looks like the picture below. 
![alt test]({{ site.baseurl }}/images/pisensors_web_ui.png "PiSensors Web Screenshot")

## Todo
-------
[ ] Add MongoDB supports  
[ ] Beautify front-end with Bootstrap  
[ ] Data visualization -- present history data in diagrams

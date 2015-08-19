#!/usr/bin/python
# Tyler Ouyang

import sys
import Adafruit_DHT

# Parse command line parameters.
data_args = { 'temp' : 1,
						 	'hum'  : 2 }
if len(sys.argv) == 3 and sys.argv[2] in data_args:
	pin = sys.argv[1]
	sensor = Adafruit_DHT.DHT11
	dataType = data_args[sys.argv[2]]
else:
	print 'usage: sudo ./Adafruit_DHT.py GPIOpin# [temp|hum]'
	print 'example: sudo ./Adafruit_DHT.py 4 temp - Read from the DHT11 connected to GPIO #4, and returns temperature.'
	sys.exit(1)

# Try to grab a sensor reading.  Use the read_retry method which will retry up
# to 15 times to get a sensor reading (waiting 2 seconds between each retry).
humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)

# Note that sometimes you won't get a reading and
# the results will be null (because Linux can't
# guarantee the timing of calls to read the sensor).  
# If this happens try again!
if humidity is not None and temperature is not None:
	if dataType == 1:
		print temperature
	else:
		print humidity
else:
	print 'Failed to get reading. Try again!'
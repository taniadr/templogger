###########################################################
# TaniaR: Temperature Logger - date 12.11.2015 
# Python beta script for sending arduino data to 
# firebase in a json object. 
###########################################################

import serial
import time
import requests
import json

firebase_url = 'https://templogger.firebaseio.com/' #My firebase-URL to the temperature logger DB
ser = serial.Serial('COM3', 9600, timeout=0) #Arduino port on my dell is COM3
fixed_interval = 10 #Each 10s it sends a json to firebase
 
while 1:
 try:
 
	temperature_c = ser.readline() #temperature value obtained from Arduino + LM35 Temp Sensor
	time_hhmmss = time.strftime('%H:%M:%S')
	
	date_mmddyyyy = time.strftime('%d/%m/%Y')
	temperature_location = 'Living-Room';
 
	print temperature_c + ',' + time_hhmmss + ',' + date_mmddyyyy + ',' + temperature_location
 
 #insert record
 
	data = {'date':date_mmddyyyy,'time':time_hhmmss,'value':temperature_c} #Json object 
	result = requests.post(firebase_url + '/' + temperature_location + '/temperature.json', data=json.dumps(data))
 
 #insert record
	print 'Record inserted. Result Code = ' + str(result.status_code) + ',' + result.text
	time.sleep(fixed_interval)
	
 except IOError:
	print('Error! Something went wrong.')
	time.sleep(fixed_interval)

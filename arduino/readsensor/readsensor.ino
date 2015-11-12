/***************************************\
* TaniaR :: Date 11.11.2015 - 1.0.0 *** 
* Temperature Logger Reader ***********
* Development board: Arduino UNO ******
* Sensor NTC + 10k Resistor ***********
\**************************************/

const int pinSensor = 0; //analog input pin 0
int valueSensor = 0;
float temp;

void setup(){
  Serial.begin(9600);
}
void loop(){
  valueSensor = analogRead(pinSensor);
  temp = valueSensor*0.48828125;
  Serial.println(valueSensor);
  Serial.println(temp);
  delay(1000);
}

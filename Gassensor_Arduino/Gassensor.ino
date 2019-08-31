/*
  Analog Input

  Demonstrates analog input by reading an analog sensor on analog pin 0 and
  turning on and off a light emitting diode(LED) connected to digital pin 13.
  The amount of time the LED will be on and off depends on the value obtained
  by analogRead().

  The circuit:
  - potentiometer
    center pin of the potentiometer to the analog input 0
    one side pin (either one) to ground
    the other side pin to +5V
  - LED
    anode (long leg) attached to digital output 13
    cathode (short leg) attached to ground

  - Note: because most Arduinos have a built-in LED attached to pin 13 on the
    board, the LED is optional.

  created by David Cuartielles
  modified 30 Aug 2011
  By Tom Igoe

  This example code is in the public domain.

  http://www.arduino.cc/en/Tutorial/AnalogInput
*/

int sensorPin = A0;
int sensorPin2 = A1;// select the input pin for the potentiometer
int ledPin = 9;      // select the pin for the LED
int sensorValue = 0;  // variable to store the value coming from the sensor
int sensorValue2 = 0;
void setup() {
  // declare the ledPin as an OUTPUT:
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // read the value from the sensor:
  sensorValue = analogRead(sensorPin);
  sensorValue2 = analogRead (sensorPin2);
  // turn the ledPin on
 // digitalWrite(ledPin, HIGH);
  // stop the program for <sensorValue> milliseconds:
  //delay(1000);
  // turn the ledPin off:
  //digitalWrite(ledPin, LOW);
  // stop the program for for <sensorValue> milliseconds:
  //delay(1000);
  Serial.println("LABR: " + String(sensorValue));
  //Luftqualität, Alkohol, Benzon, Rauch
  Serial.println("CO2: " + String(sensorValue2));
  if (sensorValue>= 4)
    { digitalWrite(ledPin, HIGH);
      delay(100);
      digitalWrite(ledPin, LOW);
      delay(100);
    }
}

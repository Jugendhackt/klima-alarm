/*
  Analog Input
 Demonstrates analog input by reading an analog sensor on analog pin 0 and
 turning on and off a light emitting diode(LED)  connected to digital pin 13. 
 The amount of time the LED will be on and off depends on
 the value obtained by analogRead(). 
 
 The circuit:
 * Potentiometer attached to analog input 0
 * center pin of the potentiometer to the analog pin
 * one side pin (either one) to ground
 * the other side pin to +5V
 * LED anode (long leg) attached to digital output 13
 * LED cathode (short leg) attached to ground
 
 * Note: because most Arduinos have a built-in LED attached 
 to pin 13 on the board, the LED is optional.
 
 
 Created by David Cuartielles
 modified 30 Aug 2011
 By Tom Igoe
 
 This example code is in the public domain.
 
 http://arduino.cc/en/Tutorial/AnalogInput
 
 */
//char string[] = "wert überschritrten" 
int sensorPin = A0;    // select the input pin for the potentiometer
int ledPin = 7;      // select the pin for the LED
int sensorValue = 0;  // variable to store the value coming from the sensor

#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#define SEALEVELPRESSURE_HPA (1013.25)

#define BME_SCK 13
#define BME_MISO 12
#define BME_MOSI 11
#define BME_CS 10
Adafruit_BME280 bme(BME_CS); 

    
void setup(){
  unsigned status;  
 Serial.begin(9600);
 while(!Serial);
 pinMode(ledPin, OUTPUT);
 pinMode(LED_BUILTIN, OUTPUT);  
 status = bme.begin();  
 }


void loop() {
  //Serial.begin(9600);
  
    //while(!Serial); 
  
  // read the value from the sensor:
  sensorValue = analogRead(sensorPin);  
    
  
  delay(1000); 
  Serial.println("LABR: " + String(sensorValue));
  Serial.print("Temperature = ");
    Serial.print(bme.readTemperature());
    Serial.println(" *C");

    Serial.print("Pressure = ");

    Serial.print(bme.readPressure() / 100.0F);
    Serial.println(" hPa");

    Serial.print("Approx. Altitude = ");
    Serial.print(bme.readAltitude(SEALEVELPRESSURE_HPA));
    Serial.println(" m");

    Serial.print("Humidity = ");
    Serial.print(bme.readHumidity());
    Serial.println(" %");

    Serial.println();
  if (sensorValue>= 800){
    
    digitalWrite(ledPin, HIGH);
    delay(50);
    digitalWrite(ledPin, LOW);
    delay(50);
    
  }
}

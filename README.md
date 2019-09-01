# klima-alarm
Portabler Gassensor, der bei Grenzüberschreitung alarmiert.

Sensoren, die CO2, die Luftqualität oder andere Gase messen, sind an den Arduino angeschlossen: /home/hackerschool/Bilder/IMG_20190831_142548.jpgP
Wenn bei der Messung bestimmte Grenzwerte überschritten werden, fängt eine Lampe auf dem Arduino an zu blinken.
Der Arduino ist mit einem Raspberry Pi verbunden, der die gemessenen Daten durch einen WLAN-Hotspot auf eine Website überträgt. 
In Zukunft wollen wir die Daten zusammen mit einem Standort an einen Server schicken und mithilfe dieser Daten eine Karte erzeugen, die darstellt, an welchen Orten welche Gaskonzentrationen in der Luft sind. Damit kann der Benutzer seine Gesundheit besser schützen und die Bevölkerung wird auf den Klimawandel aufmerksam gemacht.

Desktop Skeleton - A qooxdoo Application Template
==================================================

This is a qooxdoo application skeleton which is used as a template. The 
'create-application.py' script (usually under tool/bin/create-application.py)
will use this and expand it into a self-contained qooxdoo application which 
can then be further extended. Please refer to the script and other documentation
for further information.

short:: is a standard qooxdoo GUI application
copy_file:: tool/data/generator/needs_generation.js source/script/custom.js


TODO:
* DONE Iconhandler auf Webfont umstellen (inkl. Generierung des Webfonts aus SVG's über Qooxdoo Generator)
* Vereinheitlichung von PHP Ausgaben in REST-API
* Automatische Generierung von Basis-Klassen für Widgets aus XSD?
* DONE Struct-Widgets austauschbar machen
* Syntax-Check der Config im Client?
* Design-Kompabilität (evtl. Compability-Mode damit die DOM-Struktur gleich ist)
	* ggf. CSS Einbinden
* Plugin-Kompabilität???
* Plugins in Parts/Module packen, damit sie bei Bedarf nachgeladen werden können
* Replay/Logging für User-Aktionen (Debugging)
* Parse-Queue: Alle Pages, die nicht sichtbar sind erstmal in die Queue und erst parsen, wenn sie sichtbar werden (oder im Hintergrund durch Webworker???)


Vorteile Qooxdoo:
- Code sauberer strukturiert durch Klassenhierarchie, Interfaces, Mixins, Properties, usw.
- integriertes Build Tool, generiert Source inkl. Syntax-Check (für Entwickler) Build, Api (Doku), Abhängigkeiten werden automatisch augelöst und nur das integriert, was auch wirklich genutzt wird. Es können auch optimierte Builds für die gängigen Browser Engines erstellt werden. 
- Ebenso kann man einzelne Parts erstellen, die nur bei Bedarf nachgeladen werden (könnte man z.B. für Plugins + den Editor nutzen)
- Komplette Abstraktion der Browser Unterschiede, man schreibt nur einen Code für alles
- Vorhandene Layout Engines (HBox, VBox, Flow, ...), die mehr Möglichkeiten für das Layout der Seiten bieten.
- Qooxdoo intern ist da viel Optimierung in die Verbindung Javascript <-> DOM geflossen, von dem man sicherlich profitieren kann
- Zur Manipulation der Darstellung können Themes erstellt werden, die sich zur Laufzeit austauschen lassen. Mit CSS hat man hier direkt nichts zu tun. Könnte man zukünftige Designs mit erstellen, auch hier hat man eine sauberere Struktur als mit CSS

Portierung:
- Sollte dieselbe DOM-Struktur wie die alte Visu erzeugen um mit den vorhandenen Designs Kompatibel zu sein. Wobei man dafür einen Weg finden muss das von Qooxdoo automatisch generierte CSS zu teilweise umgehen.
denkbar wäre hier auch ein Kompabilitätsmodus für alte Designs und einen "nativen" für neue auf Themes basierende. Ggf. wären hier Unittests sinnvoll die die ausgegebene DOM-Struktir mit der alten vergleichen
- Plugin-Kompabilität wird wohl nicht möglich sein. Die müssten portiert werden. Dabei könnte man aber ein Plugin-Interface definieren, welches jedes Plugin implementieren muss => Saubere Schnittstelle
- KNX-Iconset in Webfont konvertieren und so nutzen. Ist einfach umsetzbar, auch unabhängig von der Portierung. So kann man jedes Icon beliebig skalieren/färben (wie normalen Text halt)
- Alles was mit PHP läuft in eine einheiliche REST-API packen (auch unabhängig vom Qooxdoo-Port)

Was schon läuft:
- Client mit Long-Polling
- einzelne Widgets, Statusbar
- nachladen der alten Designs (ohne den Javascript Teil)

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
* Iconhandler auf Webfont umstellen (inkl. Generierung des Webfonts aus SVG's über Qooxdoo Generator)
* Vereinheitlichung von PHP Ausgaben in REST-API
* Automatische Generierung von Basis-Klassen für Widgets aus XSD?
* Struct-Widgets austauschbar machen (über irgendeine Form von Classloader?)
* Syntax-Check der Config im Client?
* Design-Kompabilität (evtl. Compability-Mode damit die DOM-Struktur gleich ist)
	* ggf. CSS Einbinden
* Plugin-Kompabilität???
* Plugins in Parts/Module packen, damit sie bei Bedarf nachgeladen werden können
* Replay/Logging für User-Aktionen (Debugging)

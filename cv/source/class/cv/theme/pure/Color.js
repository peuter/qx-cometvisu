/* 
 * QometVisu - version 0.0.1-SNAPSHOT - 13-02-2016
 *  @see(https://github.com/peuter/qx-cometvisu)
 * 
 * This is a port of the CometVisu smart home visualization, based on the qooxdoo framework
 *  @see(https://github.com/cometvisu/cometvisu)
 *  @see(https://github.com/qooxdoo/qooxdoo)
 * 
 * copyright (c) 2016 Tobias Bräutigam (Peuter) [tbraeutigam at gmail dot com]
 * 
 * based on: 
 * cometvisu.js (c) 2010 by Christian Mayer (ChristianMayer) [CometVisu at ChristianMayer dot de]
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */


qx.Theme.define("cv.theme.pure.Color",
{
  extend : qx.theme.modern.Color,

  colors :
  {
    // form
    "text-label" : "#FFFFFF",
    "background-application" : "#000000",

    "line" : "rgb(255, 128, 0)",
    "actor-border-top" : "#666666",
    "actor-border-bottom" : "#444444",
    "actor-border-inner" : "#FFFFFF",
    "actor-gradient-start" : "#0F0F0F",
    "actor-gradient-end" : "#000000",
    
    "line-gradient": "rgba(255, 128, 0, 0.2)",

    // some styling colors
    "red" : "#FF4444",
    "green" : "#44FF44",
    "blue" : "#44FFFF",
    "purple" : "#FF44FF",

    "widget-info-bg" : "#DDDDDD",
    "widgetinfo-bg-nav-text-color" : "#000000",
    "widgetinfo-text-color" : "#999999",
    "widget-info-bg-nav" : "#FFFFFF"
  }
});
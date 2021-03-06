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


qx.Theme.define("cv.theme.metal.Color",
{
  extend : cv.theme.pure.Color,

  colors :
  {
    "border-main" : "#666666",

    "main-gradient-start" : "#444444",
    "main-gradient-end" : "#222222",
    "line" : "#81664B",

    "group-border" : "#B3B3B3",
    "group-title-start" : "#999999",
    "group-title-end" : "#666666",

    "grey" : "#808080",

    "actor-border-top" : "#444444",
    "actor-border-bottom" : "#282828",
    "actor-border-inner" : "#010101",
    "actor-gradient-start" : "#444444",
    "actor-gradient-end" : "#2d2d2d",

    "navbar-top-end" : "#111111",
    "navbar-top-start" : "#666666",

    "widgetinfo-bg-nav-text-color" : "#000000",
    "widgetinfo-text-color" : "#999999",
    "widget-info-bg-nav" : "#FFFFFF",
    "widget-info-bg" : "#666666",
    "slide-gradient-start" : "#121212",
    "slide-gradient-end" : "#A4A4A4"
  }
});
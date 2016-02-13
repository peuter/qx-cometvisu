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


qx.Theme.define("cv.theme.pure.Decoration",
{
  extend : qx.theme.modern.Decoration,

  decorations :
  {
    // basic page parts
    "footer" : {
      
    },
    
    "cv-widget" : {
      style : {
        width : 1,
        radius : 5,
        color : "border-main"
      }
    },
    "line" : {
      style : {
        orientation : "horizontal",
        gradientStart : ["line-gradient", 0],
        gradientEnd : ["line-gradient", 100],
        colorStop : ["line", 33, 33]
      }
    },
    "vline" : {
      style : {
        orientation : "vertical",
        gradientStart : ["line-gradient", 0],
        gradientEnd : ["line-gradient", 100],
        colorStop : ["line", 33, 33]
      }
    },
    "switch" : {
      style : {
        innerWidth : 1,
        width : 1,
        radius : 5,
        color : [ "actor-border-top",  "actor-border-bottom", "actor-border-bottom", "actor-border-top"],
        innerColor : [ "actor-border-inner", "actor-border-top", "actor-border-top", "actor-border-inner"],
        gradientStart : ["actor-gradient-start", 0],
        gradientEnd : ["actor-gradient-end", 100]
      }
    },
    "switch-pressed" : {
      style : {
        innerWidth : 1,
        width : 1,
        radius : 5,
        color : [ "actor-border-top",  "actor-border-inner", "actor-border-inner", "actor-border-top"],
        innerColor : [ "actor-border-bottom", "actor-border-top", "actor-border-top", "actor-border-bottom"],
        gradientStart : ["actor-gradient-start", 0],
        gradientEnd : ["actor-gradient-start", 100]
      }
    },
    /**
     * The 4 navbars
     */
    "navbar-top": {
      style : {

      }
    },
    "navbar-bottom": {
      style :
      {

      }
    },
    "navbar-left": {
      style :
      {
        width : [ 0, 1, 0, 0],
        colorRight : "line",
        widthLeft : 0,
        borderGradientOrientation : "vertical",
        borderGradientStart : ["line-gradient", 0],
        borderGradientEnd : ["line-gradient", 100],
        borderColorStop : ["line", 33, 33]
      }
    },
    "navbar-right": {
      style :
      {
        width : [ 0, 0, 0, 1],
        borderGradientOrientation : "vertical",
        borderGradientStart : ["line-gradient", 0],
        borderGradientEnd : ["line-gradient", 100],
        borderColorStop : ["line", 33, 33]
      }
    },

    "widgetinfo" : {
      style : {
        radius: [0, 0, 0, 25],
        width : 0,
        backgroundColor : "widget-info-bg"
      }
    },

    "widgetinfo-topbottom" : {
      style : {
        radius: 20,
        width : 0,
        backgroundColor : "widget-info-bg-nav"
      }
    }
  }
});
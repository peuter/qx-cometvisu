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


qx.Theme.define("cv.theme.metal.Decoration",
{
  extend : cv.theme.pure.Decoration,

  decorations :
  {
    "main-gradient" : {
      style : {
        gradientStart : ["main-gradient-start", 0],
        gradientEnd : ["main-gradient-end", 100]
      }
    },

    "cv-widget" : {
      style : {
        width : 1,
        color : "border-main",
        gradientStart : ["main-gradient-start", 0],
        gradientEnd : ["main-gradient-end", 100]
      }
    },

    "cv-nowidget" : {
      style : {
        gradientStart : ["main-gradient-start", 0],
        gradientEnd : ["main-gradient-end", 100]
      }
    },

    "switch" : {
      style : {
        innerWidth : 1,
        width : [1, 2, 2, 1],
        radius : 12,
        color : [ "actor-border-top",  "actor-border-bottom", "actor-border-bottom", "actor-border-top"],
        innerColor : [ "actor-border-inner", "actor-border-top", "actor-border-top", "actor-border-inner"],
        gradientStart : ["actor-gradient-start", 0],
        gradientEnd : ["actor-gradient-end", 100]
      }
    },
    "switch-pressed" : {
      style : {
        innerWidth : 1,
        width : [2, 1, 1, 2],
        radius : 12,
        color : [ "actor-border-top",  "actor-border-inner", "actor-border-inner", "actor-border-top"],
        innerColor : [ "actor-border-bottom", "actor-border-top", "actor-border-top", "actor-border-bottom"],
        gradientStart : ["actor-gradient-end", 0],
        gradientEnd : ["actor-gradient-start", 100]
      }
    },
    // just for inheritance, not directly used
    "switch-styled": {
      include : "switch",
      style : {
        backgroundPositionX : "center",
        backgroundPositionY : "center",
        backgroundRepeat : "no-repeat"
      }
    },
    "switch-pressed-styled": {
      include : "switch-pressed",
      style : {
        backgroundPositionX : "center",
        backgroundPositionY : "center",
        backgroundRepeat : "no-repeat"
      }
    },
    "switch-green": {
      include : "switch-styled",
      style : {
        backgroundImage : "resource/cv/designs/metal/images/dot_green.png"
      }
    },
    "switch-red": {
      include : "switch-styled",
      style : {
        backgroundImage : "resource/cv/designs/metal/images/red.png"
      }
    },
    "switch-grey": {
      include : "switch-styled",
      style : {
        backgroundImage : "resource/cv/designs/metal/images/dot_grey.png"
      }
    },
    "switch-pressed-green": {
      include : "switch-pressed-styled",
      style : {
        backgroundImage : "resource/cv/designs/metal/images/dot_green.png"
      }
    },
    "switch-pressed-red": {
      include : "switch-pressed-styled",
      style : {
        backgroundImage : "resource/cv/designs/metal/images/red.png"
      }
    },
    "switch-pressed-grey": {
      include : "switch-pressed-styled",
      style : {
        backgroundImage : "resource/cv/designs/metal/images/dot_grey.png"
      }
    },

    "group" : {
      style : {
        width : 1,
        color : [ "group-border" ],
        radius : 12
      }
    },
    "group-title": {
      style : {
        gradientStart : ["group-title-start", 0],
        gradientEnd : ["group-title-end", 100]
      }
    },

    "navbar-top": {
      style : {
        gradientStart : ["navbar-top-start", 0],
        gradientEnd : ["navbar-top-end", 100]
      }
    },
    "navbar-bottom": {
      style :
      {
        gradientStart : ["navbar-top-end", 0],
        gradientEnd : ["navbar-top-start", 100]
      }
    },

    "slide" : {
      style : {
        width : 1,
        radius : 4,
        color:  ["#010101", "#282828", "#282828", "#010101" ],
        orientation : "horizontal",
        gradientStart : ["actor-gradient-start", 0],
        gradientEnd : ["slide-gradient-end", 100]
      }
    }
  }
});
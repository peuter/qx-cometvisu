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


qx.Theme.define("cv.theme.pure.Appearance",
{
  extend : qx.theme.modern.Appearance,

  appearances :
  {
    "template-engine" : { },
    "template-engine/footer" : {
      style : function()
      {
        return {
          decorator : "footer",
          textColor : "line"
        };
      }
    },
    "group": {},
    "page" : {},

    "cv-icon" : {
      style : function() {
        return {
          color : "#FFFFFF",
          size : 36,
          textAlign : "center"
        };
      }
    },

    /**
     * Widget stuff
     */
    "cv-widget" : {
      style : function()
      {
        return {
          padding : [3, 5],
          decorator : "cv-widget"
        };
      }
    },

    "navbar-list" : {},
    "navbar-item" : {},

    "text" : {
      include : "cv-widget",
      alias : "cv-widget"
    },
    "pagejump" : {
      include : "cv-widget",
      alias : "cv-widget",

      style : function(states)
      {
        if (states.top || states.bottom) {
          // pagejump on top/bottom navbar
          return {
            decorator : null
          }
        } else {
          return {};
        }
      }

    },
    "pagejump/label" : {
      include : "cv-widget/label",
      alias : "cv-widget/label",

      style : function(states)
      {
        if (states.top || states.bottom) {
          // pagejump on top/bottom navbar
          return {
            decorator : null,
            iconPosition: "top",
            font : "subtext",
            center : true,
            iconSize: 50,
            minWidth : 50
          }
        } else {
          return {};
        }
      }
    },
    "pagejump/label/label" : {
      style : function()
      {
        return {
          textAlign : "center"
        };
      }
    },
    "pagejump/actor" : {
      include : "cv-widget/actor",
      alias : "cv-widget/actor",

      style : function(states) {

        if (states.top || states.bottom) {
          // pagejump on top/bottom navbar
          return {
            excluded : true
            //decorator : null,
            //iconPosition: "top",
            //font : "subtext"
          }
        } else {
          return {};
        }
      }
    },

    // container for the right side if a widget (e.g. used in infotrigger)
    "cv-widget/right-container" : {
      style : function() {
        return {
          padding : 3,
          marginLeft : 15
        }
      }
    },

    // main button styling
    "cv-button" : {
      style : function(states)
      {
        return {
          marginRight : 15,
          padding : 3,
          minWidth : 100,
          maxWidth : 200,
          allowGrowY : false,
          center : true,
          show : "label",
          decorator : states.pressed ? "switch-pressed" : "switch"
        };
      }
    },
    
    "cv-widget/actor" : "cv-button",

    "cv-widget/up" : "cv-widget/actor",
    "cv-widget/down" : "cv-widget/actor",
    "cv-widget/info" :  {
      style : function()
      {
        return {
          marginRight : 15,
          padding : 3,
          minWidth : 100,
          maxWidth : 200,
          alignX : "center"
        };
      }
    },

    "cv-widget/actor/label" : {
      style : function(states)
      {
        // apply stylings to the widget
        var tc = "text-label"; // default color
        if (states.red) {
          tc = "red";
        } else if (states.green) {
          tc = "green";
        } else if (states.blue) {
          tc = "blue";
        } else if (states.purple) {
          tc = "purple";
        }

        return {
          textColor : tc
        };
      }
    },
    "cv-widget/label/label" : {
      style : function()
      {
        return {
          textAlign : "right",
          allowGrowY : true,
          allowGrowX : true
        };
      }
    },
    "cv-widget/image" : {
      style : function() {
        return {
          marginLeft: 15,
          padding: 3
        };
      }
    },

    "cv-widget/slider" : {
      style : function() {
        return {
          marginLeft: 15,
          rangeMargin : 5
        };
      }
    },

    "cv-widget/slider/range" : {
      style : function()
      {
        return {
          decorator : "switch"
        };
      }
    },

    "cv-widget/slider/knob" :
    {
      include : "slider/knob",

      style : function()
      {
        return {
          decorator : "switch",
          minWidth : 30
        };
      }
    },

    "link" : {
      style : function()
      {
        return {
          textColor : "line"
        };
      }
    },
    
    "line" : {
      style : function(states)
      {
        if (states.top || states.bottom) {
          return {
            width: 1,
            decorator: "vline",
            margin: 1,
            allowGrowX: false
          };
        } else {
          return {
            height: 1,
            decorator: "line",
            margin: 1,
            allowGrowY: false
          };
        }
      }
    },
    
    "break" : {
      style : function()
      {
        return {
          height: 0
        };
      }
    },
    
    "page-title" : {
       style : function()
      {
        return {
          font : "title",
          marginLeft : 15
        };
      }
    },

    /**
     * The 4 navbars
     */
    "navbar-top": {
      style : function()
      {
        return {
          decorator : "navbar-top"
        };
      }
    },
    "navbar-bottom": {
      style : function()
      {
        return {
          decorator : "navbar-bottom"
        };
      }
    },
    "navbar-left": {
      style : function()
      {
        return {
          decorator : "navbar-left"
        };
      }
    },
    "navbar-right": {
      style : function()
      {
        return {
          decorator : "navbar-right"
        };
      }
    },

    "widgetinfo" : {
      style : function(states) {
        if (states.top || states.bottom) {
          // in navbars
          return {
            decorator: "widgetinfo-topbottom",
            font: "widgetinfo",
            textColor: "widgetinfo-text-color"
          }
        } else {
          return {
            height: 20,
            width: 30,
            maxWidth: 30,
            maxHeight: 30,
            decorator: "widgetinfo",
            font: "widgetinfo",
            textColor: "widgetinfo-text-color"
          }
        }
      }
    }
  }
});
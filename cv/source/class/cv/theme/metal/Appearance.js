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


qx.Theme.define("cv.theme.metal.Appearance",
{
  extend : cv.theme.pure.Appearance,

  appearances :
  {
    "root" :
    {
      style : function()
      {
        return {
          backgroundColor : "background-application",
          decorator       : "main-gradient",
          textColor       : "text-label",
          font            : "default"
        };
      }
    },

    "group": {
      style : function(states) {
        if (states.nowidget) {
          // a nowidget group has no special appearance
          return {};
        } else {
          // normal group appearance
          return {
            decorator: "group",
            margin: [4, 10]
          };
        }
      }
    },

    "cv-widget" : {
      style : function(states) {
        if (states.nowidget) {
          // a nowidget group has no special appearance
          return {
            padding : [3, 5],
            decorator: null
          };
        } else {
          return {
            padding : [3, 5],
            decorator : "cv-widget"
          };
        }
      }
    },

    "group/title": {
      style : function() {
        return {
          decorator : "group-title",
          padding : [0, 10],
          font: "group-title"
        }
      }
    },

    // do not show page titles
    "page-title" : {
      style : function()
      {
        return {
          excluded : true
        };
      }
    }
  }
});
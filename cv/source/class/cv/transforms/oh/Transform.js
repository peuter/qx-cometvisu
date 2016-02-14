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


/**
 * Factory for value transformators
 *
 */
qx.Class.define("cv.transforms.oh.Transform",
{
  type : "static",
  
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics :
  {
    transforms : {
      'switch': {
        name: 'OH_Switch',
        encode: function (phy) {
          return phy == 1 ? 'ON' : 'OFF';
        },
        decode: function (string) {
          return (string == "ON" || parseInt(string) > 0) ? 1 : 0;
        }
      },
      'contact': {
        name: 'OH_Contact',
        encode: function (phy) {
          return phy == 1 ? 'OPEN' : 'CLOSED';
        },
        decode: function (string) {
          return string == "OPEN" ? 1 : 0;
        }
      },
      'rollershutter': {
        name: "OH_RollerShutter",
        encode: function (phy) {
          if (phy == 1) {
            return 'DOWN';
          }
          else if (phy == 0) {
            return 'UP';
          }
          else {
            return phy;
          }
        },
        decode: function (str) {
          if (!str || str == "NaN" || str == 'Uninitialized' || str == 'Undefined') {
            return 0;
          }
          else if (str == "UP") {
            return 0;
          }
          else if (str == "DOWN") {
            return 1;
          }
          else {
            return str;
          }
        }
      },
      'dimmer': {
        name: "OH_Dimmer",
        encode: function (phy) {
          return parseInt(phy);
        },
        decode: function (str) {
          if (!str || str == "NaN" || str == 'Uninitialized' || str == 'Undefined') {
            return 0;
          }
          else if (str == "ON") {
            return 100;
          }
          else if (str == "OFF") {
            return 0;
          }
          else {
            return parseInt(str);
          }
        }
      },
      'number': {
        name: "OH_Number",
        encode: function (phy) {
          return parseFloat(phy);
        },
        decode: function (str) {
          if (!str || str == "NaN" || str == 'Uninitialized' || str == 'Undefined') {
            return 0;
          }
          return parseFloat(str);
        }
      },
      'string': {
        name: "OH_String",
        encode: function (phy) {
          if (!phy) {
            return "";
          } else {
            return phy;
          }
        },
        decode: function (str) {
          if (!str) {
            return "";
          } else {
            return str;
          }
        }
      },
      'datetime': {
        name: "OH_DateTime",
        encode: function (phy) {
          if (phy instanceof Date) {
            return phy.toLocaleDateString();
          } else {
            return phy;
          }
        },
        decode: function (str) {
          if (!str || str == "NaN" || str == 'Uninitialized' || str == 'Undefined') {
            return '-';
          }
          return new Date(str);
        }
      },
      'time': {
        name: "OH_Time",
        encode: function (phy) {
          if (phy instanceof Date) {
            return phy.toLocaleTimeString();
          } else {
            return phy;
          }
        },
        decode: function (str) {
          if (!str || str == "NaN" || str == 'Uninitialized' || str == 'Undefined') {
            return '-';
          }
          return new Date(str);
        }
      },
      'color': {
        name: "OH_Color",
        encode: function (rgb) {
          var max, min, h, s, v, d;
          var r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
          max = Math.max(r, g, b);
          min = Math.min(r, g, b);
          v = max;
          d = max - min;
          s = max === 0 ? 0 : d / max;
          if (max === min) {
            h = 0; // achromatic
          } else {
            switch (max) {
              case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
              case g:
                h = (b - r) / d + 2;
                break;
              case b:
                h = (r - g) / d + 4;
                break;
            }
            h /= 6;
          }
          // map top 360,100,100
          h = h * 360;
          s = s * 100;
          v = v * 100;
          return [h, s, v];
        },
        decode: function (hsbString) {
          if (!hsbString) {
            return [0,0,0];
          }
          // decode HSV/HSB to RGB
          var hsb = hsbString.split(",");
          var h = hsb[0], s = hsb[1], v = hsb[2];
          var r, g, b, i, f, p, qq, t;
          // h = h / 360;
          if (v === 0) {
            return [0, 0, 0];
          }
          s = s / 100;
          v = v / 100;
          h = h / 60;
          i = Math.floor(h);
          f = h - i;
          p = v * (1 - s);
          qq = v * (1 - (s * f));
          t = v * (1 - (s * (1 - f)));
          if (i === 0) {
            r = v;
            g = t;
            b = p;
          } else if (i === 1) {
            r = q;
            g = v;
            b = p;
          } else if (i === 2) {
            r = p;
            g = v;
            b = t;
          } else if (i === 3) {
            r = p;
            g = q;
            b = v;
          } else if (i === 4) {
            r = t;
            g = p;
            b = v;
          } else if (i === 5) {
            r = v;
            g = p;
            b = qq;
          }
          r = Math.floor(r * 255);
          g = Math.floor(g * 255);
          b = Math.floor(b * 255);
          return [r, g, b];
        }
      }
    },

    getTransform : function(type) {
      if (cv.transforms.oh.Transform.transforms.hasOwnProperty(type)) {
        return cv.transforms.oh.Transform.transforms[type];
      }
    }
  }
});

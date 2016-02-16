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


//noinspection JSUnusedGlobalSymbols
/**
 * Mixin for standard property value transformations *
 */
qx.Mixin.define("cv.util.MTransform",
{

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members : {
    _cssValueRegex : null,
    
    /**
     * Convert undefined to null
     * 
     * @param value {var} Any value
     * @returns {var|null}
     */
     transformUndefined : function(value) {
      if (value === undefined) {
        value = null;
      }
      return value;
    },
    
    /**
     * Convert string to boolean value
     * 
     * @param value {String} "true" or "false"
     * @returns {Boolean}
     */
    stringToBool : function(value) {
      if (qx.lang.Type.isString(value)) {
        return value === "true";
      } else {
        return value;
      }
    },

    /**
     * Convert string to number
     * @param value {String}
     * @returns {Number}
     */
    stringToNumber : function(value) {
      if (!value || value === "") {
        return 0;
      }
      return parseFloat(value);
    },
    
    /**
     * Convert CSS width/height/size definitions to number (omit px,pt,... suffixes)
     * @param value {String} CSS value like 200px
     */
    cssSizeToNumber : function(value) {
      if (!this._cssValueRegex) {
        this._cssValueRegex = /([0-9]+)[ptxem]{3}/i;
      }
      var res = this._cssValueRegex.exec(value);
      if (res) {
        return parseInt(res[0]);
      } else {
        return parseInt(value);
      }
    }
  }
});

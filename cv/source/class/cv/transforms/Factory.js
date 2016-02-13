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
qx.Class.define("cv.transforms.Factory",
{
  type : "static",
  
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics :
  {

    getTransform : function(transform) {
      if (!transform || transform === "") {
        return null;
      }
      var parts = transform.split(":");
      var path = "cv.transforms";

      var type = null;
      if (parts.length === 2) {
        path+= "."+parts[0].toLowerCase();
        type = parts[1];
      } else {
        qx.log.Logger.error("illegal transform value "+transform);
        return null;
      }
      path+= ".Transform";

      var clazz = qx.Class.getByName(path);
      if (clazz) {
        return clazz.getTransform(type);
      } else {
        qx.log.Logger.debug("no class found: "+path);
        return null;
      }
    },

    doTransformDecode : function(transform, value) {
      var lookup = cv.transforms.Factory.getTransform(transform);
      if (lookup) {
        return lookup.decode(value);
      }
      return value;
    },

    doTransformEncode : function(transform, value) {
      var lookup = cv.transforms.Factory.getTransform(transform);
      if (lookup) {
        return lookup.encode(value);
      }
      return value;
    }
  }
});

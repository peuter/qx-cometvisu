/* cometvisu.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
    doTransformDecode : function(transform, value) {
      if (!transform) {
        return value;
      }
      var parts = transform.split(":");
      var path = "cv.transforms";
      
      var type = null;
      if (parts.length === 2) {
        path+= "."+parts[0].toLowerCase();
        type = parts[1];
      } else {
        qx.log.Logger.error("illegal transform value "+transform);
        return value;
      }
      path+= ".Transform";
       
      var clazz = qx.Class.getByName(path);
      if (clazz) {
        return clazz.doTransformDecode(type, value);
      } else {
        qx.log.Logger.debug("no class found: "+path);
        return value;
      }
    },

    doTransformEncode : function(transform, value) {
      if (!transform) {
        return value;
      }
      var parts = transform.split(":");
      var path = "cv.transforms";

      var type = null;
      if (parts.length === 2) {
        path+= "."+parts[0].toLowerCase();
        type = parts[1];
      } else {
        qx.log.Logger.error("illegal transform value "+transform);
        return value;
      }
      path+= ".Transform";

      var clazz = qx.Class.getByName(path);
      if (clazz) {
        return clazz.doTransformEncode(type, value);
      } else {
        qx.log.Logger.debug("no class found: "+path);
        return value;
      }
    }
  }
});

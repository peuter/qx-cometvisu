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
 * Main item class. An item has one address but 1..n transform functions to transform the value
 *
 */
qx.Class.define("cv.model.item.Item",
{
  extend : cv.model.AbstractItem,

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  construct : function(address, type) {
    this.base(arguments, address);
  },
  
  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    
    // the raw value of the item as it is delivered from the backend
    value : {
      check : "String",
      init : null,
      event : "changeValue"
    },
    
    transforms : {
      check : "Object",
      init : {}
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    //property apply
    _applyRawValue : function(value) {
      this.debug("updating %s to %s", this.getAddress(), value);
      this.setValue(value);
    }  
  }
});

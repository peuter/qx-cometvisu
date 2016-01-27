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
 * 
 *
 */
qx.Class.define("cv.ui.structure.pure.Navbar",
{
  extend : cv.ui.structure.pure.Base,
  
  include : [
    cv.mixin.Label,
    cv.mixin.Layout,
    cv.mixin.Align,
    cv.mixin.Flavour
  ],

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    position : {
      check : [ "top", "left", "bottom", "right"],
      init : "left",
      apply : "_applyPosition",
      themeable : true
    },
    
    dynamic : {
      check : "Boolean",
      transform : "stringToBool"
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {       
    _draw : function() {
      
    },
    
    //overridden
    getLayoutOptions : function() {
      if (this.getPosition() === "top" || this.getPosition() === "bottom") {
        return { edge : 0 };
      } else {
        return null;
      }
    },
    
    _applyPosition : function(value) {
      
    }
  },
  
  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */
  destruct : function() {
  }
});

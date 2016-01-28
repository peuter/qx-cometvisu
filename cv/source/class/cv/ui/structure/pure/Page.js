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
qx.Class.define("cv.ui.structure.pure.Page",
{
  extend : cv.ui.structure.pure.Base,
  
  include : [
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
    
    /**
     * Attributes
     */
    name : {},
    ga : {},
    visible : {
      check : "Boolean",
      init : true,
      transform : "cv.util.Transform.stringToBool"
    },
    type : {
      check : ["text", "2d", "3d"],
      init : "text"
    },
    size : {
      check : ["fixed", "scaled"]
    },
    backdrop : {
      check : "String"
    },
    showtopnavigation : {
      check : "Boolean",
      transform : "cv.util.Transform.stringToBool",
      init : true
    },
    showfooter : {
      check : "Boolean",
      transform : "cv.util.Transform.stringToBool",
      init : true
    },
    shownavbarTop : {
      check : "Boolean",
      transform : "cv.util.Transform.stringToBool",
      init : true
    },
    shownavbarBottom : {
      check : "Boolean",
      transform : "cv.util.Transform.stringToBool",
      init : true
    },
    shownavbarLeft : {
      check : "Boolean",
      transform : "cv.util.Transform.stringToBool",
      init : true
    },
    shownavbarRight : {
      check : "Boolean",
      transform : "cv.util.Transform.stringToBool",
      init : true
    },
    shownavbar : {
      group : ["shownavbarTop", "shownavbarRight", "shownavbarBottom", "shownavbarLeft"],
      mode : "shorthand"
    },
    
    /**
     * Children
     */
    pages : {
      check : "qx.data.Array",
      init : new qx.data.Array()
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
   _initLayout : function() {
      this._setLayout(new qx.ui.layout.Flow());
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

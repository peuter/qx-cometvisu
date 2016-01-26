/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

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

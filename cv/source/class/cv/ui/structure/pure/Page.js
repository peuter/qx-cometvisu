/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

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
   
  },
  
  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */
  destruct : function() {
  }
});

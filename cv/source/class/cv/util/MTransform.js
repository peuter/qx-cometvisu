/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * 
 *
 */
qx.Mixin.define("cv.util.MTransform",
{

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members : {
    
     transformUndefined : function(value) {
      if (value === undefined) {
        value = null;
      }
      return value;
    },
    
    stringToBool : function(value) {
      if ( qx.lang.Type.isString(value) ) {
        value = value === "true";
      }
      return false;
    }
  }
});

/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * 
 *
 */
qx.Class.define("cv.util.Transform",
{
  type : "static",

  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    
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

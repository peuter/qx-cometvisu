/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * 
 */
qx.Class.define("cv.structure.Factory",
{
  type : "static",
  
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics :
  {
    createWidget : function(type) {
      var clazz = qx.Class.getByName("cv.structure."+cv.Config.structure+"."+qx.lang.String.firstUp(type));
      if (clazz) {
        return new clazz();
      } else {
        console.log("no class found: cv.structure."+cv.Config.structure+"."+qx.lang.String.firstUp(type));
        return null;
      }
    }
  }
});

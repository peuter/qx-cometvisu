/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * 
 */
qx.Class.define("cv.ui.structure.Factory",
{
  type : "static",
  
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics :
  {
    createWidget : function(node, path) {
      var clazz = qx.Class.getByName("cv.ui.structure."+cv.Config.structure+"."+qx.lang.String.firstUp(node.nodeName));
      if (clazz) {
        return new clazz(node, path).set({
          path: path
        });
      } else {
        console.log("no class found: cv.ui.structure."+cv.Config.structure+"."+qx.lang.String.firstUp(node.nodeName));
        return new cv.ui.structure.Unknown().set({name: node.nodeName});
      }
    }
  }
});

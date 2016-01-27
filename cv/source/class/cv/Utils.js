/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * 
 *
 */
qx.Class.define("cv.Utils",
{
  type : "static",

  /*
   *****************************************************************************
      statics
   *****************************************************************************
   */
  statics : {
    // all singletons
    
    // the template engine
    engine : null,
    
    // the configurator
    configurator : null,
    
    // client to backend
    client : null,
    
    // model
    model : null,
    
    init : function() {
      cv.Utils.engine = cv.ui.Templateengine.getInstance();
    
      // the configurator
      cv.Utils.configurator = cv.util.Configurator.getInstance();
      
      // client to backend
      cv.Utils.client = cv.client.Cometvisu.getInstance();
      
      // model
      cv.Utils.model = cv.Model.getInstance();
    }
  }
});

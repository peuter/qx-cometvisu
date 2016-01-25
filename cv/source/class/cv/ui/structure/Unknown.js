/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * Fallback widget for all unknown widgets
 *
 */
qx.Class.define("cv.ui.structure.Unknown",
{
  extend : qx.ui.core.Widget,
  
  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    name : { 
      check : "String", 
      init : ""
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    getDataType : function() {
      return "unknown";
    },
    
    //overridden
    _draw : function() {
      var label = new qx.ui.basic.Label(this.tr("Unknown widget: $1", this.getName()));
      this._add(label);
    }
  }
});

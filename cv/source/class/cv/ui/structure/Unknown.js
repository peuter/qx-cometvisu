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
  implement : cv.ui.structure.IWidget,
  
  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  construct : function(node, path) {
    this.base(arguments);
    this._path = path;
  },

  
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
    _path : null,
    
    getPath : function() {
      return this._path;
    },
    
    getDataType : function() {
      return "unknown";
    },
    
    getLayoutOptions : function() {
      
    },
    
    //overridden
    _draw : function() {
      var label = new qx.ui.basic.Label(this.tr("Unknown widget: $1", this.getName()));
      this._add(label);
    }
  }
});

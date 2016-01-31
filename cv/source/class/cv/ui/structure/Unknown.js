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
  include : [
    cv.mixin.Layout
  ],
  
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
    },
     /**
     * The parent page this page belongs to
     */
    parentPage : {
      check : "cv.ui.structure.pure.Page",
      init : null,
      nullable : true
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
    
    getLayoutOptions : function(map) {
      if (this.getAlign) {
        if (map && !map.alignX) {
          map.alignX = this.getAlign();
        }
      }
      return map; 
    },
    
    //overridden
    _draw : function() {
      var label = new qx.ui.basic.Label(this.tr("Unknown widget: $1", this.getName()));
      this._add(label);
    }
  }
});

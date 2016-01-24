/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * 
 *
 */
qx.Class.define("cv.structure.pure.Base",
{
  extend : qx.ui.core.Widget,
  type : "abstract",

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  construct : function() {
    this.base(arguments);
    
    // add default CSS class
    this.getContentElement().addClass("widget_container");
  },

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    rowspanClass : { 
      check : "String", 
      init : "",
      apply : "_applyClass"
    },
    colspanClass : { 
      check : "String", 
      init : "",
      apply : "_applyClass"
    },
    containerClass : { 
      check : "String", 
      init : "",
      apply : "_applyClass"
    },
    dataType : { 
      check : "String", 
      init : "",
      apply : "_applyDataType"
    },
    id : { check : "String", init : ""}
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    /**
     * Basic creation function must be overriden by subclasses
     */
    create: function( page, path, flavour, type ) {
      this.setDataType(page.nodeName);  
    },
    
    //property apply
    _applyDataType : function(value, old) {
      // special case for break widget
      if (old === "break") {
        this.getContentElement().removeClass("break_container");
      }
      if (value === "break") {
        this.getContentElement().addClass("break_container");
      }
    },
    
    //property apply
    _applyClass : function(value, old) {
      if (old) {
        this.getContentElement().removeClass(old);
      }
      if (value) {
        this.getContentElement().addClass(value);
      }
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

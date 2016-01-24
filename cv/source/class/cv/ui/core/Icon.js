/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * Icon loaded from webfont
 *
 */
qx.Class.define("cv.ui.core.Icon",
{
  extend : qx.ui.core.Widget,

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  construct : function(name) {
    this.base(arguments);
    if (name) {
      this.setName(name);
    }
    this.getContentElement().addClass("icon");
    this.bind("size", this, "height");
    this.bind("size", this, "width");
  },

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    name : {
      check : "String",
      init : null,
      apply : "_applyName"
    },
    flavour : {
      check : "String",
      init : "",
      apply : "_applyFlavour"
    },
    size : {
      check : "Number",
      init : 16,
      apply : "_applySize",
      event : "changeSize"
    },
    color : {
      check : "String",
      transform : "_transformColor",
      init : "#000000",
      apply : "_applyColor"
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    _transformColor : function(value) {
      var color = value;
      switch (value) {
        case "black": 
          color = "#000000";
          break;
        case "white": 
          color = "#ffffff";
          break;
        case "antimony": 
          color = "#00ddff";
          break;
        case "boron": 
          color = "#00ff11";
          break;
        case "lithium": 
          color = "#ff0000";
          break;
        case "potassium": 
          color = "#d00055";
          break;
        case "orange":
          color = "#ff8000";
          break;
      }
      return color;
    },
    
    //property apply
    _applyColor : function(value) {
      this.getContentElement().setStyle("color", value);
    },
    
    //property apply
    _applySize : function(value) {
      this.getContentElement().setStyle("font-size", value+"px");
    },
    
    //property apply
    _applyName : function(value, old) {
      if (old) {
        this.getContentElement().removeClass("icon_"+old);
      }
      if (value) {
        this.getContentElement().addClass("icon_"+value);
        this.show();
      } else {
        this.exclude();
      }
    },
    
    //property apply
    _applyFlavour : function(value) {
      this.setColor(value);
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
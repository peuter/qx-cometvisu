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
  extend : qx.ui.basic.Label,

  include : [
    cv.mixin.CssClass
  ],

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

    this.set({
      anonymous : true,
      allowGrowX : true,
      allowGrowY : true,
      font : qx.theme.manager.Font.getInstance().resolve("Icons"),
      rich : true
    });
  },

  /*
   *****************************************************************************
      STATICS
   *****************************************************************************
   */
  statics : {
    getIconText : function(name) {
      var index = cv.config.IconSet.glyphs.indexOf(name);
      if (index >= 0) {
        return String.fromCodePoint("0x"+cv.config.IconSet.codepoints[index]);
      }
      return null;
    }
  },

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    appearance : {
      init : "cv-icon",
      refine : true
    },
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
      event : "changeSize",
      themeable : true
    },
    color : {
      check : "String",
      transform : "_transformColor",
      init : "#FFFFFF",
      apply : "_applyColor",
      themeable : true
    },
    styling : {
      check : "cv.config.meta.Styling",
      nullable : true,
      transform : "__getStylingByName"
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
    _applyName : function(value) {
      var text = cv.ui.core.Icon.getIconText(value);
      if (text) {
        this.setValue(text);
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

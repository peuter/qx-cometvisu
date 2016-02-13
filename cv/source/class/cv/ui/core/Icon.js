/* 
 * QometVisu - version 0.0.1-SNAPSHOT - 13-02-2016
 *  @see(https://github.com/peuter/qx-cometvisu)
 * 
 * This is a port of the CometVisu smart home visualization, based on the qooxdoo framework
 *  @see(https://github.com/cometvisu/cometvisu)
 *  @see(https://github.com/qooxdoo/qooxdoo)
 * 
 * copyright (c) 2016 Tobias Bräutigam (Peuter) [tbraeutigam at gmail dot com]
 * 
 * based on: 
 * cometvisu.js (c) 2010 by Christian Mayer (ChristianMayer) [CometVisu at ChristianMayer dot de]
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */


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
    this._setLayout(new qx.ui.layout.Grow());

    if (name) {
      this.setName(name);
    }
    this.getContentElement().addClass("icon");

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
      this.setMinWidth(value);
      this.setMinHeight(value);
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

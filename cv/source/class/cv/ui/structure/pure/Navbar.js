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
 * 
 *
 */
qx.Class.define("cv.ui.structure.pure.Navbar",
{
  extend : cv.ui.structure.pure.Base,
  
  include : [
    cv.mixin.Label,
    cv.mixin.Layout,
    cv.mixin.Align,
    cv.mixin.Flavour
  ],

  /*
   *****************************************************************************
      STATICS
   *****************************************************************************
   */
  statics : {
     propertyMapping : {
       width : "definedWidth"
     }
  },

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    appearance : {
      init : "navbar-part",
      refine : true
    },

    position : {
      check : [ "top", "left", "bottom", "right"],
      init : "left",
      apply : "_applyPosition",
      themeable : true
    },
    
    dynamic : {
      check : "Boolean",
      transform : "stringToBool"
    },

    definedWidth : {
      check : "Number",
      transform : "cssSizeToNumber",
      apply : "_applyDefinedWidth"
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    //property apply
    _applyDefinedWidth : function(value) {
      if (this.getPosition() === "top" || this.getPosition() === "bottom") {
        // ignore width settings on top/bottom navbars
        return;
      }
      this.setWidth(value);
      this.setMinWidth(value);
      this.setMaxWidth(value);
    },

    //overridden
    getLayoutOptions : function() {
      if (this.getPosition() === "top" || this.getPosition() === "bottom") {
        return { edge : 0 };
      } else {
        return null;
      }
    },
    
    //property apply
    _applyPosition : function(value) {
      switch (value) {
        case "left":
        case "right":
          this._setLayout(new qx.ui.layout.VBox());
          break;
        case "top":
        case "bottom":
          this._setLayout(new qx.ui.layout.HBox());
          break;
      }
    },
    
    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "label":
          control = new qx.ui.basic.Label().set({
            rich : true,
            wrap : true
          });
          control.getContentElement().addClass("label");
          this.add(control);
          break;
          
        case "icon":
          control = new cv.ui.core.Icon();
          this.add(control);
          break;
      }

      return control || this.base(arguments, id);
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

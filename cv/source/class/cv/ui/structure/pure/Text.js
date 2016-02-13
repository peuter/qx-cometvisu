/* QX-CometVisu - version master - 13-02-2016
 * This is a port of the CometVisu based on the qooxdoo framework
 * copyright (c) 2016 Tobias Bräutigam (Peuter) [tbraeutigam at gmail dot com]
 * 
 * based on the original cometvisu.js (c) 2010 by Christian Mayer (ChristianMayer) [CometVisu at ChristianMayer dot de]
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


//noinspection JSUnusedGlobalSymbols
/**
 * Text widget
 */
qx.Class.define("cv.ui.structure.pure.Text",
{
  extend : cv.ui.structure.pure.Base,
  
  include : [
    cv.mixin.Label,
    cv.mixin.Align,
    cv.mixin.Flavour,
    cv.mixin.CssClass
  ],

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    appearance : {
      init : "text",
      refine : true
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
   
    _initLayout : function() {
      this._setLayout(new qx.ui.layout.Grow());
    },
    
    // overridden
    _draw : function() {
    },
    
    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "widget":
          control = new qx.ui.container.Composite();
          control.setLayout(new qx.ui.layout.HBox());
          control.getContentElement().addClass("widget");
          control.getContentElement().addClass(this.getDataType());
          
          if (this.getFlavour()) {
            control.getContentElement().addClass(this.getFlavour());
          }
          this._add(control);
          break;
          
        case "label":
          control = this.base(arguments, id);
          if (this.getAlign && this.getAlign() === "center") {
            control.setCenter(true);
          }
          break;
//           
        // case "icon":
          // control = new cv.ui.core.Icon();
          // this.getChildControl("widget").addAt(control, 0);
          // break;
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

/* cometvisu.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
qx.Class.define("cv.ui.structure.pure.Switch",
{
  extend : cv.ui.structure.pure.Base,
  
  include : [
    cv.mixin.Label,
    cv.mixin.Address,
    cv.mixin.Align,
    cv.mixin.Flavour
  ],

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    styling : {},
    mapping : {},
    on_value : {},
    off_value : {},
    bind_click_to_widget : {
      check : "Boolean",
      transform : "cv.util.Transform.stringToBool",
      init : false
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {    
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
          if (this.getAlign()) {
            control.getContentElement().addClass(this.getAlign());
          }
          if (this.getFlavour()) {
            control.getContentElement().addClass(this.getFlavour());
          }
          this._addAt(control);
          break;
         
        case "actor":
          control = new qx.ui.container.Composite();
          control.getContentElement().addClass("actor");
          control.getContentElement().addClass("switchUnpressed");
          control.setLayout(new qx.ui.layout.Grow());
          this.getChildControl("widget").addAt(control, 1);
          break;
          
        case "status":
          control = new qx.ui.basic.Label(this.getAddress());
          control.getContentElement().addClass("value");
          this.getChildControl("actor").add(control);
          break;
          
        case "label":
          control = new cv.ui.basic.Atom();
          control.getContentElement().addClass("label");
          this.getChildControl("widget").addAt(control, 0);
          break;
      }

      return control || this.base(arguments, id);
    },
    
    //overridden
    getChildrenContainer : function() {
      return this.getChildControl("widget");
    },
    
    
    _draw : function() {
      this.getChildControl("actor");
      this.getChildControl("status");
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

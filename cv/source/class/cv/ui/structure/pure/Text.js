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
 * Text widget
 */
qx.Class.define("cv.ui.structure.pure.Text",
{
  extend : cv.ui.structure.pure.Base,
  
  include : [
    cv.mixin.Label,
    cv.mixin.Align,
    cv.mixin.Flavour
  ],

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    "class" : {}
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
   //overridden
    getLayoutOptions : function() {
      if (this.getWidthPercent() === 100) {
        return { lineBreak: true, stretch: true };
      } else {
        return null;
      }
    },
    
    // overridden
    _draw : function() {
      this.setHeight(50);
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
          if (this.getAlign()) {
            control.getContentElement().addClass(this.getAlign());
          }
          if (this.getFlavour()) {
            control.getContentElement().addClass(this.getFlavour());
          }
          this._addAt(control);
          break;
          
        case "label":
          control = new cv.ui.basic.Atom();
          control.getContentElement().addClass("label");
          this.getChildControl("widget").addAt(control, 0);
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

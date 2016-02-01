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
 * This Mixin adds the default child control structure for the most common CV-widgets 
 *  
 */
qx.Mixin.define("cv.mixin.MBaseWidget",
{
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    _hasMixinChildControl : function(id) {
      return id === "widget" || id === "actor" || id === "status" || id === "label";
    },
    
    //overridden
    getChildrenContainer : function() {
      return this.getChildControl("widget");
    },
    
    /**
     * Get a mixin defined in this mixin by id
     * 
     * @param id {String} id of the childcontrol
     * @returns {Widget|null}
     * @protected
     */
    _getMixinChildControl : function(id) {
      var control;

      switch(id)
      {
        case "widget":
          control = new qx.ui.container.Composite();
          control.setAppearance("cv-widget");
          control.setLayout(new qx.ui.layout.HBox());
          control.getContentElement().addClass(this.getDataType());
          if (this.getAlign && this.getAlign()) {
            control.getContentElement().addClass(this.getAlign());
          } else {
            control.getContentElement().addClass("right");
          }
          if (this.getFlavour && this.getFlavour()) {
            control.getContentElement().addClass(this.getFlavour());
          }
          this._add(control,{ flex: 1});
          break;
         
        case "actor":
          control = new cv.ui.basic.Atom();
          if (this.getAlign && this.getAlign() === "center") {
            control.setCenter(true);
          }
          this.getChildControl("widget").addAt(control, 1);
          break;

        case "left" :
          control = new qx.ui.container.Composite(new qx.ui.layout.Dock());
          control.setAnonymous(true);
          this.getChildControl("widget").addAt(control, 0, { width: "50%"});
          break;
          
        case "label":
          control = new cv.ui.basic.Atom().set({
            rich : true,
            wrap : true,
            allowGrowX : false
          });
          var align = qx.Class.hasMixin(this.constructor, cv.mixin.Align) && this.getAlign() ? this.getAlign() : "right";
          var dock = align === "left" ? "west" : align === "right" ? "east" : "center";
          this._getMixinChildControl("left").add(control, {edge : dock});
          break;
      }
      return control;
    } 
  }
});

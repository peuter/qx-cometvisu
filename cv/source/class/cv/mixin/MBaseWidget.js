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
      return id === "widget" || id === "actor" || id === "status" || id === "label" || id === "label-container" || id === "right-container";
    },
    
    //overridden
    getChildrenContainer : function() {
      return this.getChildControl("widget");
    },

    /**
     * Returns the widget the incoming value is shown in
     */
    getValueWidget : function() {
      return this.getChildControl("actor");
    },

    /**
     * Returns the property name of the value widget where the value is written in
     * @returns {string}
     */
    getValueProperty : function() {
      return "label";
    },

    /**
     * Show the incoming value in the value widget
     *
     * @param value {String}
     */
    setDisplayValue : function(value) {
      this.getValueWidget().set(this.getValueProperty(), value !== undefined && value !== "" ? value : "-");
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
          control.setLayout(new qx.ui.layout.Canvas());
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

        case "right-container":
          control = new qx.ui.container.Composite(new qx.ui.layout.Grow());
          this.getChildControl("widget").addAt(control, 1, {left: "50%", top: 0});
          break;
         
        case "actor":
          control = new cv.ui.basic.Atom();
          if (this.getAlign && this.getAlign() === "center") {
            control.setCenter(true);
          }
          this.getChildControl("right-container").add(control);
          break;

        case "label-container" :
          control = new qx.ui.container.Composite(new qx.ui.layout.Dock());
          control.setAnonymous(true);
          this.getChildControl("widget").addAt(control, 0, { top: 0, left: 0, width: "50%"});
          break;
          
        case "label":
          control = new cv.ui.basic.Atom().set({
            rich : true,
            wrap : true,
            allowGrowX : false
          });
          var align = qx.Class.hasMixin(this.constructor, cv.mixin.Align) && this.getAlign() ? this.getAlign() : "right";
          var dock = align === "left" ? "west" : align === "right" ? "east" : "center";
          this.getChildControl("label-container").add(control, {edge : dock});
          break;
      }
      return control;
    } 
  }
});

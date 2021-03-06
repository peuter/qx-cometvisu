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

    transformForDisplay : function(value) {
      if (!qx.lang.Type.isString()) {
        return qx.data.Conversion.toString(value);
      }
    },

    /**
     * Show the incoming value in the value widget
     *
     * @param value {String}
     */
    setDisplayValue : function(value) {
      var widget = this.getValueWidget();
      if (qx.lang.Type.isArray(value)) {
        if (widget instanceof qx.ui.basic.Atom) {
          // check for icon and Label
          for (var i = 0; i < value.length; i++) {
            if (value[i] instanceof cv.ui.core.Icon) {
              // copy property values to Atoms icon
              widget.getChildControl("icon").fromOtherIcon(value[i]);
            } else if (value[i] instanceof qx.ui.basic.Label) {
              // copy value
              widget.getChildControl("label").setValue(value[i].getValue());
            } else if (qx.lang.Type.isString(value[i])) {
              widget.getChildControl("label").setValue(value[i]);
            }
          }
        }
      } else if (value instanceof cv.ui.core.Icon) {
        if (widget instanceof qx.ui.basic.Atom) {
          widget.getChildControl("icon").fromOtherIcon(value);
          widget.getChildControl("icon").show();
        }
      } else {
        widget.set(this.getValueProperty(), this.transformForDisplay(value));
      }
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
          control.getContentElement().addClass("widget");
          break;

        case "right-container":
          control = new qx.ui.container.Composite(new qx.ui.layout.HBox());
          control.getContentElement().addClass("right-container");
          this.getChildControl("widget").addAt(control, 1, {edge: 0});
          break;
         
        case "actor":
          control = new cv.ui.basic.Atom();
          control.getContentElement().addClass("actor");
          if (this.getAlign && this.getAlign() === "center") {
            control.setCenter(true);
          }
          this.getChildControl("right-container").add(control);
          break;

        case "label-container" :
          control = new qx.ui.container.Composite(new qx.ui.layout.Dock());
          control.setAnonymous(true);
          // free space from right-container
          control.getContentElement().addClass("label-container");
          this.getChildControl("right-container").setLayoutProperties({left: "50%", top: 0, right: 0, bottom: 0});
          // add label-container
          this.getChildControl("widget").addAt(control, 0, { top: 0, left: 0, bottom: 0, width: "50%"});
          break;
          
        case "label":
          control = new cv.ui.basic.Atom().set({
            rich : true,
            wrap : true
          });
          control.getContentElement().addClass("label");
          var align = qx.Class.hasMixin(this.constructor, cv.mixin.Align) && this.getAlign() ? this.getAlign() : "left";
          var dock = align === "left" ? "west" : align === "right" ? "east" : "center";
          this.getChildControl("label-container").add(control, {edge : dock});
          break;
      }
      return control;
    } 
  }
});

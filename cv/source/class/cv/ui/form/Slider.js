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
 * Extended slider which allows the knob to be higher than the slider range, and also allows
 * the know to show the slider value
 */
qx.Class.define("cv.ui.form.Slider",
  {
    extend: qx.ui.form.Slider,

    /*
     *****************************************************************************
     CONSTRUCTOR
     *****************************************************************************
     */
    construct: function(orientation) {
      this.base(arguments,orientation);
      this._createChildControl("range");
    },
    /*
     *****************************************************************************
     PROPERTIES
     *****************************************************************************
     */
    properties: {

      rangeMargin : {
        check : "Number",
        init : 0,
        apply : "_applyRangeMargin",
        themeable : true
      },

      format : {
        check : "String",
        nullable : true,
        apply : "_applyFormat"
      }
    },
    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members: {
      _bid : null,

      //property apply
      _applyFormat : function(value) {
        if (value) {
          var widget = this.getChildControl("label");
          if (this._bid) {
            // remove old binding first
            this.removeRelatedBindings(widget);
          }
          this._bid = this.bind("value", widget, "value", {
            converter: function (data) {
              return cv.util.StringFormat.getInstance().sprintf(value, [data]);
            }
          });
        }
      },

      //property apply
      _applyRangeMargin : function(value) {
        this.getChildControl("range").set( {
          marginTop : value,
          marginBottom : value
        });
      },

      // overridden
      _createChildControlImpl : function(id, hash)
      {
        var control;

        switch(id)
        {
          case "range":
            control = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
            control.setMargin([this.getRangeMargin(),0]);
            control.setZIndex(1);
            this._add(control, {edge: 0});
            break;

          case "knob":
            control = new qx.ui.container.Composite(new qx.ui.layout.Grow());

            control.addListener("resize", this._onUpdate, this);
            control.addListener("pointerover", this._onPointerOver);
            control.addListener("pointerout", this._onPointerOut);
            this._add(control);
            break;

          case "label":
            control = new qx.ui.basic.Label();
            this.getChildControl("knob").add(control);
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
    destruct: function () {
      this._bid = null;
    }
});


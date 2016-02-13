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
      appearance : {
        init : "cv-slider",
        refine : true
      },

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
          var widget = this.getChildControl("knob-value");
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
            control.setAppearance("slider");
            control.setMargin([this.getRangeMargin(),0]);
            control.setZIndex(1);
            this._add(control, {edge: 0});
            break;

          case "knob-value":
            control = new qx.ui.basic.Label();
            var format = this.getFormat();
            if (format) {
              this._bid = this.bind("value", control, "value", {
                converter: function (data) {
                  return cv.util.StringFormat.getInstance().sprintf(format, [data]);
                }
              });
            }
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


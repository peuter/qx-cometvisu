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

//noinspection JSUnusedGlobalSymbols
/**
 * Slider widget
 *
 * @Todo: change the widgets structure to allow the knob to be higher than the slider range
 * (add an extra slider range widget ad chilcontrol with top/bottom padding
 */
qx.Class.define("cv.ui.structure.pure.Slide",
{
  extend : cv.ui.structure.pure.BaseWidget,

  /*
   *****************************************************************************
   CONSTRUCTOR
   *****************************************************************************
   */
  construct: function (node, path, root) {
    this.base(arguments, node, path, root);

    // listen to changes of parsing state, especially when we are done
    this.addListener("changeParsingState", this._onParsingStateChange, this);

  },

  /*
   *****************************************************************************
   PROPERTIES
   *****************************************************************************
   */
  properties: {
    /**
     * Minimum value of the slider range
     */
    min : {
      check : "Number",
      init : 0,
      transform : "stringToNumber",
      event : "changeMin"
    },

    /**
     * Maximum value of the slider range
     */
    max : {
      check : "Number",
      init : 100,
      transform : "stringToNumber",
      event : "changeMax"
    },

    /**
     * Step size of slider changes
     */
    step : {
      check : "Number",
      init : 1,
      transform : "stringToNumber",
      event : "changeStep"
    },

    /**
     * Indicates wether the slide value should only be send when the user interaction has been finished or continuosly
     */
    sendOnFinish : {
      check : "Boolean",
      init : false,
      transform : "stringToBoolean"
    }
  },

  members : {
    _checkAddressRanges : null,

    //overridden
    _mapProperties : function(node) {
      this.base(arguments,node);

      if (!node.getAttribute("min") || !node.getAttribute("max")) {
        this._checkAddressRanges = {};
        if (!node.getAttribute("min")) {
          this._checkAddressRanges.min = true;
        }
        if (!node.getAttribute("max")) {
          this._checkAddressRanges.max = true;
        }
      }
    },

    /**
     * handle parsing state changes
     *
     * @param e {Event}
     * @protected
     */
    _onParsingStateChange : function(e) {
      if (e.getData() === "done") {
        if (this._checkAddressRanges) {
          // check the address transforms for ranges
          var datatype_min = undefined;
          var datatype_max = undefined;

          this.getAddresses().forEach(function (addr) {
            var transform = cv.transforms.Factory.getTransform(addr.getTransform());
            if (transform && transform.getRange()) {
              if (!(datatype_min > transform.getRange().min)) {
                datatype_min = transform.getRange().min;
              }
              if (!(datatype_max < transform.getRange().max)) {
                datatype_max = transform.getRange().max;
              }
            }
          }, this);
          if (this._checkAddressRanges.min) {
            this.setMin(datatype_min);
          }
          if (this._checkAddressRanges.max) {
            this.setMax(datatype_max);
          }
          this._checkAddressRanges = null;
        }
        this.removeListener("changeParsingState", this._onParsingStateChange, this);
      }
    },

    // overridden
    getValueWidget : function() {
      return this.getChildControl("slider");
    },

    // overridden
    getValueProperty : function() {
      return "value";
    },

    setDisplayValue : function(value) {
      this.getValueWidget().set(this.getValueProperty(), this.stringToNumber(value));
    },

    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch (id) {
        case "slider":
          control = new cv.ui.form.Slider();
          this.bind("min", control, "minimum");
          this.bind("max", control, "maximum");
          this.bind("step", control, "singleStep");
          //do not allow changes when in readOnly mode
          this.bind("readOnly", control, "enabled", {
            converter : function(data) {
              return !data;
            }
          });

          // create a throttled function to avoid flooding the backend with value changes
          var action = qx.util.Function.throttle(this._action, 250);

          if (this.isSendOnFinish()) {
            control.addListener("slideAnimationEnd", action, this);
          } else {
            control.addListener("changeValue", action, this);
          }
          console.log(control);
          this.getChildControl("widget").add(control, {flex:1});
          break;
      }
      return control || this.base(arguments, id);
    },

    /**
     * Handle slider value change event
     * @protected
     */
    _action : function() {
      // toggle switch state
      var writeValue = this.getChildControl("slider").getValue();
      console.log("sending "+writeValue+" to backend");
      var addresses = this.getAddresses();
      if (addresses) {
        addresses.forEach(function (address) {
          if (address.getMode() !== "read") {
            cv.Utils.client.write(address.getItem().getAddress(), writeValue);
          }
        }, this);
      }
    }
  },

  /*
   *****************************************************************************
   DESTRUCTOR
   *****************************************************************************
   */
  destruct: function () {
    this.removeListener("changeParsingState", this._onParsingStateChange, this);
  }
});

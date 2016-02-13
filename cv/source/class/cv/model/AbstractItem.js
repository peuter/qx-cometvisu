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
 * Base item class
 *
 */
qx.Class.define("cv.model.AbstractItem",
{
  extend : qx.core.Object,
  type : "abstract",


  construct : function(address) {
    if (qx.core.Environment.get("qx.debug")) {
      qx.core.Assert.assertString(address, "address must be set");
    }
    this._address = address;
    this._valueListeners = {};
  },
  
  properties : {
    
    // the raw value of the item as it is delivered from the backend
    rawValue : {
      check : "String",
      init : null,
      apply : "_applyRawValue",
      event : "changeRawValue"
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    _address : null,
    _valueListeners : null,
    
    /**
     * Register a widget to be notified when the value changes
     */
    addValueListener : function(widget, callback) {
      if (!this._valueListeners.hasOwnProperty(widget.getTransform())) {
        this._valueListeners[widget.getTransform()] = new qx.data.Array();
      }
      this._valueListeners[widget.getTransform()].push({
        widget : widget,
        callback : callback
      });
    },
    
    /**
     * Remove a widget from beeing notified when value changes
     */
    removeValueListener : function(widget) {
      if (this._valueListeners.hasOwnProperty(widget.getTransform())) {
        delete this._valueListeners[widget.getTransform()];
      }
    },
   
    /**
     * handle updates from event bus
     */
    update : function(msg) {
      this.setRawValue(msg.getData());
    },
    
    getAddress : function() {
      return this._address;
    },
    
    // property apply
    _applyRawValue : function(value) {
      // notify listeners
      for (var transform in this._valueListeners) {
        if (this._valueListeners.hasOwnProperty(transform)) {
          this._valueListeners[transform].forEach(function (elem) {
            // transform value
            var transformedValue = cv.transforms.Factory.doTransform(transform, value);

            // call callback with correct context
            var bound = qx.lang.Function.bind(elem.callback, elem.widget, transformedValue);
            bound();
          }, this);
        }
      }
    }
  }
});

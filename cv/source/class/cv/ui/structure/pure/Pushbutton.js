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
 * Pushbutton widget: sends on value on pointerdown and off value on pointer up
 */
qx.Class.define("cv.ui.structure.pure.Pushbutton",
{
  extend : cv.ui.structure.pure.BaseWidget,

  /*
  *****************************************************************************
    PROPERTIES
  *****************************************************************************
  */
  properties: {
     downValue : {
       check : "String",
       nullable : true
     },
    upValue : {
      check : "String",
      nullable : true
    }
  },

  statics : {
    variantBitMapping : {
      up : 1,
      down : 2,
      unset : 1|2
    }
  },

  /*
   *****************************************************************************
   MEMBERS
   *****************************************************************************
   */
  members : {
    //overridden
    _draw: function () {
      var actionControl = this.getActionChildControl();
      actionControl.addListener("pointerdown", this._downAction, this);
      actionControl.addListener("pointerup", this._upAction, this);
    },

    /**
     * Handle pointerdown event
     *
     * @protected
     */
    _downAction: function () {
      // toggle switch state
      var writeValue = this.getDownValue();
      this.getAddresses().forEach(function(address) {
        if (address.isWriteable() && address.getVariantBitmask() & self.variantBitMapping.down) {
          cv.Utils.client.write(address.getItem().getAddress(), address.encodeValue(writeValue));
        }
      }, this);
    },

    /**
     * Handle pointerup event
     *
     * @protected
     */
    _upAction: function () {
      // toggle switch state
      var writeValue = this.getUpValue();
      this.getAddresses().forEach(function(address) {
        if (address.isWriteable() && address.getVariantBitmask() & self.variantBitMapping.up) {
          cv.Utils.client.write(address.getItem().getAddress(), address.encodeValue(writeValue));
        }
      }, this);
    },

    /*
     *****************************************************************************
     DESTRUCTOR
     *****************************************************************************
     */
    destruct: function () {
      var actionControl = this.getActionChildControl();
      actionControl.removeListener("pointerdown", this._downAction, this);
      actionControl.removeListener("pointerup", this._upAction, this);
    }
  }
});

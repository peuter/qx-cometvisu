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
 * Address class
 *
 */
qx.Class.define("cv.model.Address", {
  extend: qx.core.Object,
  /*
   *****************************************************************************
   CONSTRUCTOR
   *****************************************************************************
   */
  construct: function (item) {
    this.base(arguments);
    if (item) {
      this.setItem(item);
    }
  },
  /*
   *****************************************************************************
   PROPERTIES
   *****************************************************************************
   */
  properties: {
    value :  {
      check : "String",
      init : "",
      transform : "decodeValue",
      event : "changeValue"
    },

    transform : {
      check : "String",
      init : ""
    },

    /**
     * Mode bitmask: bit 1: read, bit2: write
     */
    mode : {
      check : "Number",
      init : 1|2,
      transform : "_transformModeBitmask"
    },

    item : {
      check : "cv.model.item.Item",
      init : null,
      apply : "_applyItem"
    },

    variant : {
      check : "String",
      nullable : true
    },

    variantBitmask : {
      check : "Number",
      init : 0
    }
  },
  /*
   *****************************************************************************
   MEMBERS
   *****************************************************************************
   */
  members: {

    /**
     * Transform mode textvalue into bitmask value
     *
     * @param value {String} read, write, readwrite
     * @returns {number} 1 for read, 2 for write and 4 for readwrite
     */
    _transformModeBitmask : function(value) {
      switch (value) {
        case "read":
          return 1;
        case "write":
          return 2;
        default:
          return 1|2;
      }
    },

    /**
     * Returns true is this address is readable
     *
     * @returns {boolean}
     */
    isReadable : function() {
      return this.getMode() & 1 > 0;
    },

    /**
     * Returns true is this address is writeable
     *
     * @returns {boolean}
     */
    isWriteable : function() {
      return this.getMode() & 2 > 0;
    },

    /**
     * transform incoming value
     *
     * @param value {String}
     * @protected
     */
    decodeValue : function(value) {
      return cv.transforms.Factory.doTransformDecode(this.getTransform(), value);
    },

    encodeValue : function(value) {
      return cv.transforms.Factory.doTransformEncode(this.getTransform(), value);
    },

    _applyItem : function(value, old) {
      if (old) {
        old.removeRelatedBindings(this);
      }
      if (value) {
        value.bind("value", this, "value");
      }
    }
  },
  /*
   *****************************************************************************
   DESTRUCTOR
   *****************************************************************************
   */
  destruct: function () {
  }
});


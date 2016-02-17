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
 * This is the main model class for all items
 *
 */
qx.Class.define("cv.Model",
{
  extend : qx.core.Object,
  type : "singleton",

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  construct : function() {
    this.base(arguments);
    this._items = new qx.data.Array();
    
    this._items.addListener("changeLength", function() {
      // reset cached address list of all items in model
      this._addresses = null;
    }, this);
    this.__lookupCache = {};
  },

  /*
   *****************************************************************************
      Properties
   *****************************************************************************
   */
  properties : {
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    _addresses : null, // cached address list of all items in model
    _items : null,
    __lookupCache : null, // cache items by address
    
    /**
     * Get all items from model
     * 
     * @returns {qx.data.Array<cv.model.AbstractItem>}
     */
    getItems : function() {
      return this._items;
    },
    
    /**
     * Find an item in the model with the given address. Creates a new one if not found.
     * 
     * @param address {String} address to search for
     * @returns {cv.model.AbstractItem}
     */
    getItemByAddress : function(address) {
      var found = null;
      if (this.__lookupCache[address]) {
        return this.__lookupCache[address];
      }
      this._items.some(function(item) {
        if (item.getAddress() === address) {
          found = item;
          this.__lookupCache[address] = item;
          return true;
        }
      }, this);
      
      // create new item if not found in model
      if (!found) {
        found = new cv.model.item.Item(address);
        this.addItem(found);
      }
      return found;
    },
    
    /**
     * Add item to model
     * 
     * @param item {cv.model.AbstractItem}
     */
    addItem : function(item) {
      if (!this._items.contains(item)) {
        // subscribe to updates
        qx.event.message.Bus.getInstance().subscribe("model.item.update."+item.getAddress(), item.update, item);
        this._items.push(item);
      }
    },
    
    /**
     * Remove item from model
     * 
     * @param item {cv.model.AbstractItem}
     */
    removeItem : function(item) {
      if (this._items.contains(item)) {
        // subscribe to updates
        qx.event.message.Bus.getInstance().unsubscribe("model.item.update."+item.getAddress(), item.update, item);
        this._items.remove(item);
      }
    },
    
    /**
     * Get addresses from all items in model
     *
     * @returns {qx.data.Array} String array of addresses
     */
    getAddresses : function() {
      if (!this._addresses) {
        this._addresses = this._items.map(function(item) {
          return item.getAddress();
        }, this);
      }
      return this._addresses;
    }
  },
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
    this._disposeArray("_addresses", "_items");
  }
});

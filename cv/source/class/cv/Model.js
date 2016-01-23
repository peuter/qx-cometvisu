/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This is the main model class for all items
 *
 */
qx.Class.define("cv.Model",
{
  extend : qx.core.Object,
  type : "singleton",

  construct : function() {
    this.base(arguments);
    this._items = new qx.data.Array();
    
    this._items.addListener("changeLength", function() {
      // reset cached address list of all items in model
      this._addresses = null;
    }, this);
    
  },

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
    
    getItems : function() {
      return this._items;
    },
    
    addItem : function(item) {
      if (!this._items.contains(item)) {
        // subscribe to updates
        qx.event.message.Bus.getInstance().subscribe("model.item.update."+item.getAddress(), item.update, item);
        this._items.push(item);
      }
    },
    
    removeItem : function(item) {
      if (this._items.contains(item)) {
        // subscribe to updates
        qx.event.message.Bus.getInstance().unsubscribe("model.item.update."+item.getAddress(), item.update, item);
        this._items.remove(item);
      }
    },
    
    getAddresses : function() {
      if (!this._addresses) {
        this._addresses = this._items.map(function(item) {
          return item.getAddress();
        }, this);
      }
      return this._addresses;
    }
  },
  
  destruct : function() {
    this._disposeArray("_addresses", "_items");
  }
});

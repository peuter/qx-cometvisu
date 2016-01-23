/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

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
  },
  
  properties : {
    
    // the raw value of the item as it is deleivered from the backend
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
   
    /**
     * handle updates from event bus
     */
    update : function(msg) {
      this.setRawValue(msg.getData());
    },
    
    getAddress : function() {
      return this._address;
    },
    
    _applyRawValue : function() {}
  }
});

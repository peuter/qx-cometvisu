/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * String item class
 *
 */
qx.Class.define("cv.model.item.String",
{
  extend : cv.model.AbstractItem,


  construct : function(address, type) {
    this.base(arguments, address, "string");
  },
  
  properties : {
    
    // the raw value of the item as it is deleivered from the backend
    value : {
      check : "String",
      init : null,
      event : "changeValue"
    } 
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    //property apply
    _applyRawValue : function(value) {
      console.log("updating %s to %s", this.getAddress(), value);
      // nothing to transform here
      this.setValue(value);
    }  
  }
});

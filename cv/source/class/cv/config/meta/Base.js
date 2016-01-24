/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * 
 *
 */
qx.Class.define("cv.config.meta.Base",
{
  extend : qx.core.Object,
  type : "abstract",

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  construct : function(node) {
    this.base(arguments);
    this._parseNode(node);
  },

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    name : {
      check : "String",
      init : ""
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    /**
     * Map node attribute values to properties with the same name
     */
    _parseNode : function(node) {
      var attributes = node.attributes;
      var props = {};
      for(var i=attributes.length-1; i>=0; i--) {
        if (qx.Class.hasProperty(this.constructor, attributes[i].name)) {
          props[attributes[i].name] = attributes[i].value;
        } else {
          this.error("class "+this.classname+" has no property named "+attributes[i].name);
        }
      }
      this.set(props);
    }
  },
  
  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */
  destruct : function() {
    
  }
});

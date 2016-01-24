/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * 
 *
 */
qx.Class.define("cv.config.meta.Styling",
{
  extend : cv.config.meta.Base,

  /*
   *****************************************************************************
      CONSTRCUTOR
   *****************************************************************************
   */
  construct : function(node) {
    this.base(arguments, node);
  },
  
   /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    
    classnames : {
      check : "String",
      init : ""
    },
    value : {
      check : "Object",
      init : {}
    },
    defaultValue : {},
    range : {
      check : "Object",
      init : {}
    }
  },
  
   /*
   *****************************************************************************
      MEMBERS
   *****************************************************************************
   */
  members : {
    
    _parseNode : function(node) {
      this.base(arguments, node);
      
      var classnames = '';
      var entries = node.getElementsByTagName('entry');
      for (var i=0; i < entries.length; i++) {
        var entry = entries.item(i);
        
        classnames += entry.textContent + ' ';
        // check for default entry
        var isDefaultValue = entry.attributes.getNamedItem('default');
        if (isDefaultValue) {
          isDefaultValue = isDefaultValue.value === "true";
        } else {
          isDefaultValue = false;
        }
        // now set the mapped values
        var val = entry.attributes.getNamedItem('value');
        if (val) {
          this.getValue()[val.value] = entry.textContent;
          if (isDefaultValue) {
            this.setDefaulValue(val.value);
          }
        }
        else {
          var min = parseFloat(entry.attributes.getNamedItem('range_min').value);
          var max = parseFloat(entry.attributes.getNamedItem('range_max').value);
          this.getRange().min = [ max, entry.textContent ];
          if (isDefaultValue) {
            this.setDefaultValue(min);
          }
        }      
      }
      this.setClassnames(classnames);
    }
  }
});

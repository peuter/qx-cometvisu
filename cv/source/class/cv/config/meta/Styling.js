/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

//noinspection JSUnusedGlobalSymbols
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
      check : "qx.data.Array",
      nullable : true
    },
    value : {
      check : "Object",
      nullable : true
    },
    defaultValue : {
      check : "String",
      nullable : true
    },
    range : {
      check : "Object",
      nullable : true
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

      this.setValue({});
      this.setRange({});
      
      var classnames = new qx.data.Array();
      var entries = node.getElementsByTagName('entry');
      for (var i=0; i < entries.length; i++) {
        var entry = entries.item(i);
        
        classnames.push(entry.textContent);
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

/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * 
 *
 */
qx.Class.define("cv.config.meta.Mapping",
{
  extend : cv.config.meta.Base,

  /*
   *****************************************************************************
      CONSTRUCTOR
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
    
    formula : {},
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
  
  members : {
    
    //overridden
    _parseNode : function(node) {
      this.base(arguments, node);
      
      var formula = node.getElementsByTagName('formula');
      if (formula.length > 0) {
        var func = qx.lang.Function.globalEval('var func = function(x){var y;' + formula.item(0).textContent + '; return y;}; func');
        this.setFormula(func);
      }
      var entries = node.getElementsByTagName('entry');
      for (var i=0; i < entries.length; i++) {
        var subNode = entries.item(i);
        var origin = subNode.childNodes;
        var value = [];
        for (var j = 0; j < origin.length; j++) {
           var v = origin.item(j);
           if (v.nodeType === 3) {
             // text node
             value[j] = v.textContent;
           }
           else if (v.nodeType === 1 && v.matches('icon')) {
            value[j] = cv.ui.Templateengine.getInstance().getIconHandler().getIconElement(
      				v.attributes.getNamedItem('name') ? v.attributes.getNamedItem('name').value : undefined, 
      				v.attributes.getNamedItem('type') ? v.attributes.getNamedItem('type').value : undefined,
      				v.attributes.getNamedItem('flavour') ? v.attributes.getNamedItem('flavour').value : undefined,
      				v.attributes.getNamedItem('color') ? v.attributes.getNamedItem('color').value : undefined,
      				v.attributes.getNamedItem('styling') ? v.attributes.getNamedItem('styling').value : undefined,
      				v.attributes.getNamedItem('class') ? v.attributes.getNamedItem('class').value : undefined
      			);
           }
        }
        // check for default entry
        var isDefaultValue = subNode.attributes.getNamedItem('default');
        if (isDefaultValue) {
          isDefaultValue = isDefaultValue.value === "true";
        }
        else {
          isDefaultValue = false;
        }
        // now set the mapped values
        var val = subNode.attributes.getNamedItem('value');
        if (val) {
          this.getValue()[val.value] = value.length === 1 ? value[0] : value;
          if (isDefaultValue) {
            this.setDefaulValue(val.value);
          }
        }
        else {
          var min = parseFloat(subNode.attributes.getNamedItem('range_min').value);
          var max = parseFloat(subNode.attributes.getNamedItem('range_max').value);
          this.getRange().min = [ max, value ];
          if (isDefaultValue) {
            this.setDefaultValue(min);
          }
        }
      }
    }
  
  }
});

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
  
  members : {
    _formula : null,
    _value : null,
    _defaultValue : null,
    _range : null,
    
    //overridden
    _parseNode : function(node) {
      this.base(arguments, node);

      this._value = {};
      
      var formula = node.getElementsByTagName('formula');
      if (formula.length > 0) {
        this._formula = qx.lang.Function.globalEval('var func = function(x){var y;' + formula.item(0).textContent + '; return y;}; func');
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
          this._value[val.value] = value.length === 1 ? value[0] : value;
          if (isDefaultValue) {
            this._defaultValue = val.value;
          }
        }
        else {
          var min = parseFloat(subNode.attributes.getNamedItem('range_min').value);
          var max = parseFloat(subNode.attributes.getNamedItem('range_max').value);
          if (!this._range) {
            this._range = {};
          }
          this._range.min = [ max, value ];
          if (isDefaultValue) {
            this._defaultValue = min;
          }
        }
      }
    },

    /**
     * Apply mapping to the given value
     *
     * @param value {String}
     * @returns {String}
     */
    map : function(value) {
      var ret = value;

      if (this._formula) {
        ret = this._formula(ret);
      }
      var mapValue = function(v) {

        if (this._value.hasOwnProperty(v)) {
          return this._value[v];
        } else if (this._range) {
          var valueFloat = parseFloat(v);
          var range = this._range;
          for (var min in range) {
            if (min > valueFloat) continue;
            //noinspection JSUnfilteredForInLoop
            if (range[min][0] < valueFloat) continue; // check max
            //noinspection JSUnfilteredForInLoop
            return range[min][1];
          }
        }
        return v; // pass through when nothing was found
      }.bind(this);

      ret = mapValue(ret);
      if (!ret && this._defaultValue) {
        ret = mapValue(this._defaultValue);
      }
      if( ret !== undefined ) {
        return ret;
      }
      return value;
    }
  }
});

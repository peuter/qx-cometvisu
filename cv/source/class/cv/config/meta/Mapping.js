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
        var index = 0;
        for (var j = 0; j < origin.length; j++) {
           var v = origin.item(j);
           if (v.nodeType === 3 && v.textContent.trim()!="") {
             // text node
             value[index] = v.textContent.trim();
             index++;
           }
           else if (v.nodeType === 1 && v.matches('icon')) {
             var icon = new cv.ui.core.Icon(v.getAttribute("name"));
             icon.fromNode(v);
             value[index] = icon;
             index++;
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
            if (min > valueFloat) {
              continue;
            }
            //noinspection JSUnfilteredForInLoop
            if (range[min][0] < valueFloat) {
              continue;
            } // check max
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

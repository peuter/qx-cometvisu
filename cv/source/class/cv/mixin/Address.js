/* cometvisu.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
 * Mixin for address property
 */
qx.Mixin.define("cv.mixin.Address",
{

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {

    addresses : {
      check : "qx.data.Array",
      init : null
    },

    /**
     * Incoming value from a readable address
     */
    value : {
      init : "-",
      apply : "_applyValue",
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
    _bid : null,
    _readAddress : null,
    _formatValueCache : null,

    /**
     * Parse address from xml node
     * @param node {Element}
     */
    _parseAddress : function(node) {
      var item = cv.Model.getInstance().getItemByAddress(node.textContent);

      var address = new cv.model.Address(item);
      if (node.getAttribute("transform")) {
        address.setTransform(node.getAttribute("transform"));
      }
      if (node.getAttribute("mode")) {
        address.setMode(node.getAttribute("mode"));
      }
      if (node.getAttribute("variant")) {
        address.setVariant(node.getAttribute("variant"));
      }
      
      // listen to value changes @todo: Handle multiple read addresses (e.g. variants for r,g,b color)
      if (address.getMode() !== "write") {
        if (this._bid !== null) {
          this.error("only one read address allowed, cannot bind to "+address.getItem().getAddress());
        } else {
          this._bid = address.bind("value", this, "value");
          this._readAddress = address;
        }
      }

      this._formatValueCache = {};
    },
    
    _applyValue : function(value) {
      // #1 incoming value is already transformed (done in Address mixin)
      if (value) {
        this.debug("new transformed value received '" + value + "'");
      }

      if (qx.Class.hasMixin(this.constructor, cv.mixin.MBaseWidget)) {
        // #2: map it to a value the user wants to see
        value = this.getMapping() ? this.getMapping().map(value) : value;

        // #3: format it in a way the user understands the value
        if( this.getPrecision() ) {
          value = Number(value).toPrecision(this.getPrecision());
        }
        if( this.getFormat() ) {
          //this._formatValueCache[this._readAddress.getAddress()] = value;

          //argList = this.getAddresses().map(function(address) {
          //  return address.getValue();
          //}, this);
          //var argList.push(value);

          value = cv.util.StringFormat.getInstance().sprintf(this.getFormat(), [value]);
        }


        // apply value to actor-label
        var actor = this.getChildControl("actor");
        actor.setLabel(value !== undefined && value !== "" ? value : "-");

        // #4 style the value to be pretty
        var sty = this.getStyling();
        if (sty) {
          var widget = actor.getChildControl("label");

          // remove only styling classes
          sty.getClassnames().forEach(function(classname) {
            widget.removeState(classname);
          });

          var findValue = function(v, findExact) {
            if (undefined === v) {
              return false;
            }
            if (sty[v]) { // fixed value
              widget.addState(sty[v]);
              return true;
            }
            else {
              var range = sty.getRange();
              if (findExact && range[v]) {
                widget.addState(range[v][1]);
                return true;
              }
              var valueFloat = parseFloat(v);
              for (var min in range) {
                if (min > valueFloat) continue;
                //noinspection JSUnfilteredForInLoop
                if (range[min][0] < valueFloat) continue; // check max
                //noinspection JSUnfilteredForInLoop
                widget.addState(range[min][1]);
                return true;
              }
            }
            return false;
          };

          if (!findValue(value, false) && sty.getDefaultValue() !== undefined) {
            findValue(sty.getDefaultValue(), true);
          }

        }
      }
    }
  },
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
    if (this._readAddress) {
      this._readAddress.removeBinding(this._bid);
      this._disposeObjects("_readAddress");
      this._readAddress = null;
      this._bid = null;
      this._formatValueCache = null;
    }
  }
});

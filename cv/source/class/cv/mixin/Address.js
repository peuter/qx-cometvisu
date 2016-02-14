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
      incomingValue : {
        init : null,
        apply : "_applyIncomingValue",
        event : "changeIncomingValue"
      },


      /**
       * When there is no write address we are in readonly mode
       */
      readOnly : {
        check : "Boolean",
        init : true,
        event : "changeReadOnly"
      }
    },

    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */
    members :
    {
      _bids : null,
      _formatValueCache : null,

      /**
       * Parse address from xml node
       * @param node {Element}
       */
      _parseAddress : function(node) {
        var item = cv.Model.getInstance().getItemByAddress(node.textContent);

        var address = new cv.model.Address();
        if (node.getAttribute("transform")) {
          address.setTransform(node.getAttribute("transform"));
        }
        if (node.getAttribute("mode")) {
          address.setMode(node.getAttribute("mode"));
        }
        if (node.getAttribute("variant")) {
          var variant = node.getAttribute("variant");
          address.setVariant(variant);
          if (self.variantBitMapping) {
            address.setVariantBitmask(self.variantBitMapping[variant]);
          }
        } else if (self.variantBitMapping && self.variantBitMapping.unset) {
          address.setVariantBitmask(self.variantBitMapping.unset);
        }

        // always set item after everythin is read especially the transform
        address.setItem(item);

        // listen to value changes @todo: Handle multiple read addresses (e.g. variants for r,g,b color)
        if (address.isReadable()) {
          if (!this._bids) {
            this._bids = [];
          }
          this._bids.push([address.bind("value", this, "incomingValue"), address]);
        }
        if (address.isWriteable()) {
          // writable address
          this.setReadOnly(false);
        }
        this._formatValueCache = {};
        if (!this.getAddresses()) {
          this.setAddresses(new qx.data.Array());
        }
        this.getAddresses().push(address);
      },

      /**
       * Apply mapping, precision and format settings to the value
       *
       * @param value {String} incoming value
       * @returns {var}
       */

      _processValue : function(value) {
        // #2: map it to a value the user wants to see
        value = this.getMapping && this.getMapping() ? this.getMapping().map(value) : value;

        // #3: format it in a way the user understands the value
        if (this.getPrecision && this.getPrecision()) {
          value = Number(value).toPrecision(this.getPrecision());
        }
        if (this.getFormat && this.getFormat()) {
          //this._formatValueCache[this._readAddress.getAddress()] = value;

          //argList = this.getAddresses().map(function(address) {
          //  return address.getValue();
          //}, this);
          //var argList.push(value);

          value = cv.util.StringFormat.getInstance().sprintf(this.getFormat(), [value]);
        }
        return value;
      },

      _applyIncomingValue : function(value) {
        // #1 incoming value is already transformed (done in Address mixin)
        if (value) {
          console.trace();
          this.debug("new transformed value received '" + value + "'");
        }
        var mappedValue = this._processValue(value);

        // send value to the
        this._setAndStyleProcessedValue(mappedValue);
      },

      /**
       * Send the processed value to the value widget and apply the styling to it
       * @param value {var}
       */
      _setAndStyleProcessedValue :function(value) {

        // apply value to actor-label
        var actor = this.getValueWidget();
        this.setDisplayValue(value);

        // #4 style the value to be pretty
        var sty = this.getStyling();
        if (sty) {
          var widget = actor instanceof qx.ui.basic.Atom ? actor.getChildControl("label") : actor;

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
                if (min > valueFloat) {
                  continue;
                }
                //noinspection JSUnfilteredForInLoop
                if (range[min][0] < valueFloat) {
                  continue; // check max
                }
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
    },

    /*
     *****************************************************************************
     DESTRUCTOR
     *****************************************************************************
     */
    destruct : function() {
      for(var i=0; i < this._bids.length; i++) {
        this._bids[i][1].removeBinding(this._bids[0]);
      }
      this._disposeArray("_bids");
      this._formatValueCache = null;
    }
  });

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
    item : {
      check : "cv.model.item.Item",
      init : null
    },
    
    transform : {
      check : "String",
      init : ""
    },
    
    mode : {
      check : [ "read", "write", "readwrite" ],
      nullable : true,
      init : null
    },
    
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
    /**
     * Parse address from xml node
     * @param node {Element}
     */
    _parseAddress : function(node) {
      if (node.getAttribute("transform")) {
        this.setTransform(node.getAttribute("transform"));
      }
      if (node.getAttribute("mode")) {
        this.setMode(node.getAttribute("mode"));
      }
      var item = cv.Model.getInstance().getItemByAddress(node.textContent);
      this.setItem(item);
      
      // listen to value changes
      if (this.getMode() !== "write") {
        item.addValueListener(this, this.setValue);
      }
    },
    
    _applyValue : function(value) {
      this.debug("new transformed value received "+ value);
      
      // TODO apply mapping, set styling
      
      if (qx.Class.hasMixin(this.constructor, cv.mixin.MBaseWidget)) {
        // apply value to actor-label
        this.getChildControl("actor").setLabel(value);
      }
    }
  },
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
    this.getItem().removeValueListener(this);
  }
});

/* QX-CometVisu - version master - 13-02-2016
 * This is a port of the CometVisu based on the qooxdoo framework
 * copyright (c) 2016 Tobias Bräutigam (Peuter) [tbraeutigam at gmail dot com]
 * 
 * based on the original cometvisu.js (c) 2010 by Christian Mayer (ChristianMayer) [CometVisu at ChristianMayer dot de]
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
 * Mixin for all widgets that can have pages as children
 */
qx.Mixin.define("cv.mixin.MPages",
{

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    childPages : {
      check : "qx.data.Array",
      init : null
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
     * Find the page with the given name amongst the {childPages}
     * 
     * @param name {String}
     */
    getPageByName : function(name) {
      return this._getPageBy(name, "name");
    },
    
    /**
     * Find the page with the given name amongst the {childPages}
     * 
     * @param name {String}
     */
    getPageById : function(name) {
      return this._getPageBy(name, "id");
    },
    
    /**
     * Find page by given property
     * 
     * @param key {String} Property value to look for
     * @param property {String} name of the pages property that should be used for comparison
     * @protected
     */
    _getPageBy : function(key, property) {
      var found = null;
      this.getChildPages().some(function(page) {
        if (page.get(property) === key) {
          found = page;
          return true;
        }
      }, this);
      return found;
    },
    
    /**
     * Add a page
     * 
     * @param page {Page}
     */
    addChildPage : function(page) {
      if (!this.getChildPages()) {
        this.setChildPages(new qx.data.Array());
      }
      this.getChildPages().push(page);
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

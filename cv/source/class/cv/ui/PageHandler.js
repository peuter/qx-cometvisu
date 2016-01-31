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

/**
 * The {PageHandler} is responsible for all navigation purposes amongst pages
 * it represents a {qx.ui.container.Stack} for all pages of a CometVisu config file
 */
qx.Class.define("cv.ui.PageHandler",
{
  extend : qx.ui.container.Stack,

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    /**
     * Find by by path
     * 
     * @param path {String} Path of the page e.g id_0_3
     */
    getPageByPath : function(path) {
      var children = this.getChildren();
      for (var i=children.length-1; i >= 0; i--) {
        if (children[i].getPath() === path) {
          return children[i];
        }
      }
      return null;
    },
    
    setCurrentPage : function(selector) {
      var page = null;
      if (qx.lang.Type.isString(selector)) {
        var children = this.getChildren();
        var property = qx.lang.String.startsWith(selector, "id_") || selector === "id" ? "path" : "name";
        for (var i=children.length-1; i >= 0; i--) {
          if (children[i].get(property) === selector) {
            page = children[i];
            break;
          }
        }
      } else {
        // page object
        page = selector;
      }
      if (page) {
        if (this.getSelection().length === 1) {
          // leave old selection page
          this.getSelection()[0].leavePage();
        }
        page.enterPage();
        this.setSelection([page]);
        if (cv.Config.rememberLastPage) {
          qx.module.Storage.setLocalItem('lastpage', page.getPath());
        }
        // add to history for browser back button
        qx.bom.History.getInstance().addToHistory(page.getPath());
      }
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

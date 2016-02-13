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


/**
 * Breadcrumb navigation on top 
 */
qx.Class.define("cv.ui.parts.Breadcrumbs",
{
  extend : qx.ui.core.Widget,

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  construct : function() {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.HBox());
    
    // listen to page changes (deferred because page-handler childcontrol is not ready yet)
    new qx.util.DeferredCall(function() {
      cv.Utils.engine.getChildControl("page-handler").addListener("changeSelection", this._onPageChanged, this);
    }, this).schedule();
    
    
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    /**
     * Handle page changes and update the breadcrumb navigation
     */
    _onPageChanged : function(e) {
      // clear old data
      this._removeAll();
      var page = e instanceof qx.event.type.Data ? e.getData()[0] : e;
      if (page) {
        var path = new qx.data.Array();
        while (page !== null) {
          if (path.length > 0) {
            path.unshift(new qx.ui.basic.Label(">").set({
              padding : [0, 5]
            }));
          }
          var label = new qx.ui.basic.Label();
          page.bind("name", label, "value");
          label.setUserData("path", page.getPath());
          label.addListener("tap", function() {
            cv.Utils.engine.scrollToPage(this.getUserData("path"));
          }, label);
          page = page.getParentPage();
          path.unshift(label);
        }
        
        path.forEach(function(label) {
          this._add(label, {flex:1});
        }, this);
      }
    }
  },
  
  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */
  destruct : function() {
    // remove listener
    cv.Utils.engine.getChildControl("page-handler").removeListener("changeSelection", this._onPageChanged, this);
  }
});

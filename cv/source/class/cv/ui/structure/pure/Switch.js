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
 * 
 *
 */
qx.Class.define("cv.ui.structure.pure.Switch",
{
  extend : cv.ui.structure.pure.BaseWidget,

  /*
   *****************************************************************************
   CONSTRUCTOR
   *****************************************************************************
   */
  construct: function (node, path) {
    this.base(arguments, node, path);
    // initialize woth emtpy value
    this.setValue("-");
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    //overridden
    _draw : function() {
      this.getActionChildControl().addListener("tap", this._action, this);
    },

    /**
     * Handle tap event
     * @protected
     */
    _action : function() {
      // toggle switch state
      var writeValue = this.getValue() === this.getOnValue() ? this.getOffValue() : this.getOnValue();
      this.getAddresses().forEach(function(address) {
        if (address.isWriteable()) {
          cv.Utils.client.write(address.getItem().getAddress(), writeValue);
        }
      }, this);
    },

    /*
     *****************************************************************************
     DESTRUCTOR
     *****************************************************************************
     */
    destruct: function () {
      this.getActionChildControl().removeListener("tap", this._action, this);
    }
  }
});

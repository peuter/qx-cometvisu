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
 * Mixin for class attribute to add Custom CSS classes to the content element
 */
qx.Mixin.define("cv.mixin.CssClass",
{
  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {

    /**
     * Add this value to the CSS class so that it can be formated by a user provided style sheet.
     */
    "class" : {
      check : "String",
      nullable : true,
      apply : "_applyClass"
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    //property apply
    _applyClass : function(value, old) {
      if (old) {
        this.getContentElement().removeClass(old);
      }
      if (value) {
        this.getContentElement().addClass(value);
      }
    }
  }
});

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
qx.Class.define("cv.ui.structure.pure.Designtoggle",
{
  extend : cv.ui.structure.pure.Base,
  
  include : [
    cv.mixin.Label,
    cv.mixin.Layout,
    cv.mixin.MBaseWidget
  ],
  
   /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
   
    // overridden
    _draw : function() {
      cv.Utils.configurator.bind("design", this.getChildControl("actor"), "label");
    },
    
    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;
      if (this._hasMixinChildControl(id)) {
        control = this._getMixinChildControl(id);
      }
      return control || this.base(arguments, id);
    }
  }
});

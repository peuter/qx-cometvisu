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
 * BaseWidget is the superclass for all common widgets e.g. switch, trigger, ...
 * 
 * @abstract
 */
qx.Class.define("cv.ui.structure.pure.BaseWidget",
{
  extend : cv.ui.structure.pure.Base,
  type : "abstract",
  
  include : [
    cv.mixin.Label,
    cv.mixin.Address,
    cv.mixin.Align,
    cv.mixin.Flavour,
    cv.mixin.MBaseWidget
  ],

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    styling : {},
    mapping : {},
    on_value : {},
    off_value : {},
    bind_click_to_widget : {
      check : "Boolean",
      transform : "stringToBool",
      init : false
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {    
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

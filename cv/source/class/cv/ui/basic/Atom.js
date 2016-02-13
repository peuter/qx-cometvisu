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
 * 
 *
 */
qx.Class.define("cv.ui.basic.Atom",
{
  extend : qx.ui.basic.Atom,

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  construct : function(label, icon) {
    this.base(arguments, label, null);
    this.addListener("pointerdown", this._onPointerDown, this);
    this.addListener("pointerup", this._onPointerUp, this);
  },

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    wrap : {
      check : "Boolean",
      init : false,
      apply : "_applyWrap"
    },

    iconSize : {
      check : "Number",
      apply : "_applyIconSize",
      themeable : true
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
    _applyWrap : function(value) {
      var label = this.getChildControl("label");
      if (label) {
        label.setWrap(value);
      }
    },

    //property apply
    _applyIconSize : function(value) {
      this.getChildControl("icon").setSize(value);
    },
    
   // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "icon":
          control = new cv.ui.core.Icon(this.getIcon());
          control.setAnonymous(true);
          control.set({
            allowGrowX : false,
            allowGrowY : false
          })
          this._addAt(control, 0);
          if (this.getIcon() === null || this.getShow() === "label") {
            control.exclude();
          }
          break;
          
        case "label":
          control = this.base(arguments, id);
          control.setWrap(this.getWrap());
          break;
      }

      return control || this.base(arguments, id);
    },
    
    // Event handling
    _onPointerDown : function() {
      this.addState("pressed");
    },
    _onPointerUp : function() {
      this.removeState("pressed");
    }
  },
  
  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */
  destruct : function() {
    this.removeListener("pointerdown", this._onPointerDown, this);
    this.removeListener("pointerup", this._onPointerUp, this);
  }
});

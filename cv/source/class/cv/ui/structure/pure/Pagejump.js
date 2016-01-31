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
 * Pagejump trigger an scrollToPage event and represent shortcuts to pages
 */
qx.Class.define("cv.ui.structure.pure.Pagejump",
{
  extend : cv.ui.structure.pure.BaseWidget,
  
  properties : {
    appearance : {
      init : "pagejump",
      refine : true
    },
    
    target : {
      check : "String",
      init : null,
      event : "changeTarget"
    },
    
    name : {
      check : "String",
      nullable : true
    }
  },
  
  members : {
    
    //overridden
    _applyNavbar : function(value, old) {
      this.base(arguments, value, old);
      
      if (value) {
        switch (value.getPosition()) {
          case "left":
          case "right":
            this.getChildControl("label").exclude();
            break;
        }
        
      }
    },
    
    //overridden
    getLayoutOptions : function() {
      if (!this.getLayout()) {
        var pos = this.getParentNavbar() ? this.getParentNavbar().getPosition() : "";
        switch(pos) {
          case "left":
          case "right":
            return this.base(arguments, { colspan : 12 });
            break;
          case "top":
          case "bottom":
            return this.base(arguments, { colpspan : 0 }); 
            break;
        } 
      }
      return this.base(arguments);
    },
        
    _draw : function() {
      var actor = this.getChildControl("actor");
      this.bind("target", actor, "label");
      
      // add listener for pagejumps
      actor.addListener("tap", function() {
        cv.Utils.engine.scrollToPage(this.getTarget());
      }, this);
    }
  }
});

/* 
 * QometVisu - version 0.0.1-SNAPSHOT - 13-02-2016
 *  @see(https://github.com/peuter/qx-cometvisu)
 * 
 * This is a port of the CometVisu smart home visualization, based on the qooxdoo framework
 *  @see(https://github.com/cometvisu/cometvisu)
 *  @see(https://github.com/qooxdoo/qooxdoo)
 * 
 * copyright (c) 2016 Tobias Bräutigam (Peuter) [tbraeutigam at gmail dot com]
 * 
 * based on: 
 * cometvisu.js (c) 2010 by Christian Mayer (ChristianMayer) [CometVisu at ChristianMayer dot de]
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

  include : [
    cv.mixin.Widgetinfo
  ],
  
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

    _forwardStates : {
      top : true,
      bottom : true,
      left : true,
      right : true
    },
    
    //overridden
    _applyNavbar : function(value, old) {
      this.base(arguments, value, old);

      if (old) {
        this.removeState(old.getPosition());
      }
      // tell the appearance the on which navbar this pagejump is placed
      if (value) {
        this.addState(value.getPosition());
        this.getChildControl("right-container").exclude();
        this.getChildControl("label-container").setLayoutProperties({edge: 0});
        this.getChildControl("widget").getChildren().forEach(function(child) {
          if (child.getAppearance() === "widgetinfo") {
            child.addState(value.getPosition());
          }
        })
      }
    },
    
    //overridden
    getLayoutOptions : function() {
      if (!this.getLayout()) {
        var pos = this.getParentNavbar() ? this.getParentNavbar().getPosition() : "";
        switch(pos) {
          case "left":
          case "right":
            return this.base(arguments, { flex : 1 });
            break;
          case "top":
          case "bottom":
            return this.base(arguments);
            break;
        } 
      }
      return this.base(arguments);
    },
        
    _draw : function() {

      var actor = this.getChildControl("actor");
      this.bind("target", actor, "label");
      
      // add listener for pagejumps
      this.addListener("tap", function() {
        cv.Utils.engine.scrollToPage(this.getTarget());
      }, this);
    }
  }
});

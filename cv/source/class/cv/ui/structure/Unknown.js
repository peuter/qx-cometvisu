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
 * Fallback widget for all unknown widgets
 *
 */
qx.Class.define("cv.ui.structure.Unknown",
{
  extend : qx.ui.core.Widget,
  implement : cv.ui.structure.IWidget,
  include : [
    cv.mixin.Layout
  ],
  
  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  construct : function(node, path) {
    this.base(arguments);
    this._path = path;
  },

  
  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    name : { 
      check : "String", 
      init : ""
    },
     /**
     * The parent page this page belongs to
     */
    parentPage : {
      check : "cv.ui.structure.pure.Page",
      init : null,
      nullable : true
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    _path : null,
    
    getPath : function() {
      return this._path;
    },
    
    getDataType : function() {
      return "unknown";
    },
    
    getLayoutOptions : function(map) {
      if (this.getAlign) {
        if (map && !map.alignX) {
          map.alignX = this.getAlign();
        }
      }
      return map; 
    },
    
    //overridden
    _draw : function() {
      var label = new qx.ui.basic.Label(this.tr("Unknown widget: $1", this.getName()));
      this._add(label);
    }
  }
});

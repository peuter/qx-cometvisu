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
qx.Class.define("cv.ui.parts.Navbar",
{
  extend : qx.ui.core.Widget,

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  
  /**
   * @param position {String} top,bottom,left,right
   */
  construct : function(position) {
    this.base(arguments);
    this._position = position;
    this.setAppearance("navbar-"+position);
    switch (position) {
      case "top":
      case "bottom":
        this._setLayout(new qx.ui.layout.HBox());
        break;
      case "left":
      case "right":
       this._setLayout(new qx.ui.layout.VBox());
        break;
    }
  },

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
    _position : null,
    
    /**
     * 
     * @param widget {cv.structure.IWidget}
     */
    addWidget : function(widget) {
      // as the navbar has content now we can show it
      if (!this.isVisible()) {
        this.show();
      }
      this._add(widget);
      
      // bind navbar visibility to its parent pages visibility
      //widget.getParentPage().bind("visibility", widget, "visibility", {
      //  converter : function(data, model, source, target) {
      //    if (data === false) {
      //      // we also have to check all parent pages as this value is inheritable
      //    }
      //  }
      //});
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

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
 * Mixin for layout property
 */
qx.Mixin.define("cv.mixin.Layout",
{

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    layout : {
      check : "cv.config.items.Layout",
      init : null
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    /**
     * Map xml attributes to properties
     * 
     * @param node {Element}
     */
    _parseLayout : function(node) {
      var layout = new cv.config.items.Layout();
      var props = {};
      if (node.getAttribute("colspan")) {
        props.colspan = parseInt(node.getAttribute("colspan"));
      }
      if (node.getAttribute("rowspan")) {
        props.rowspan = parseInt(node.getAttribute("rowspan"));
      }
      if (node.getAttribute("x")) {
        props.x = node.getAttribute("x").replace("px", "");
      }
      if (node.getAttribute("y")) {
        props.y = node.getAttribute("y").replace("px", "");
      }
      if (node.getAttribute("z")) {
        props.z = node.getAttribute("z");
      }
      if (node.getAttribute("width")) {
        props.width = this.cssSizeToNumber(node.getAttribute("width"));
      }
      layout.set(props);
      this.setLayout(layout);
    }
  }
});

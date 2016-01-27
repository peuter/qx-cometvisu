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
 * Mixin for label property
 * 
 * Note: all classes that include this mixin must have a childcontrol named 'label'
 */
qx.Mixin.define("cv.mixin.Label",
{
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    /**
     * Parse the label node
     * @param node {Element} label xml node
     * @param childControl {String} name of the childcontrol to work with 
     */
    _parseLabel : function(node) {
      if (qx.core.Environment.get("qx.debug")) {
        qx.core.Assert.assertEquals(node.nodeName, "label", "node name must be label but is "+node.nodeName);
      }
      if (node.nodeName === "label") {
        var label = this.getChildControl("label");
        if (label) {
          label.setLabel(node.textContent);
          if (node.children.length === 1) {
            // icon set
            label.setIcon(node.children[0].getAttribute("name"));
          }
        }
      } 
    }
  }
});

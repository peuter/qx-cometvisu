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


//noinspection JSUnusedGlobalSymbols
/**
 * Mixin for label property
 * 
 * Note: all classes that include this mixin must have childcontrols named 'label' and optional 'icon' 
 */
qx.Mixin.define("cv.mixin.Label",
{
  construct : function() {
    if (qx.core.Environment.get("qx.debug")) {
      // check for widget
      qx.core.Assert.assertQxWidget(this, "the label mixin can only by included in subclasses of qx.ui.core.Widget");
      
      // check childcontrols
      // qx.core.Assert.assertTrue(this.hasChildControl("label"), "no childcontrol 'label' available");
      // qx.core.Assert.assertTrue(this.hasChildControl("icon"), "no childcontrol 'icon' available");
    }
  },
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members : {
    /**
     * Parse the label node
     *
     * @param node {Element} label xml node
     */
    _parseLabel: function (node) {
      if (qx.core.Environment.get("qx.debug")) {
        qx.core.Assert.assertEquals(node.nodeName, "label", "node name must be label but is " + node.nodeName);
      }
      if (node.nodeName === "label" && node.textContent.trim()!="") {
        var label = this.getChildControl("label");
        if (label) {
          label.show();
          var icon;
          var iconNodeSet = node.getElementsByTagName("icon");
          if (label instanceof qx.ui.basic.Label) {
            label.setValue(node.textContent.trim());
            // no icons supported
          } else if (label instanceof qx.ui.basic.Atom) {
            label.setLabel(node.textContent.trim());
            if (iconNodeSet.length === 1) {
              icon = label.getChildControl("icon");
            }
          }
          if (icon) {
            icon.fromNode(iconNodeSet[0]);
          }
        }
      }
    }
  }
});

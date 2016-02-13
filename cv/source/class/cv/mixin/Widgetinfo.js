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


//noinspection JSUnusedGlobalSymbols
/**
 * Mixin for widgetinfo widget
 *
 */
qx.Mixin.define("cv.mixin.Widgetinfo",
{
  construct : function() {
    if (qx.core.Environment.get("qx.debug")) {
      // check for widget
      qx.core.Assert.assertQxWidget(this, "the label mixin can only by included in subclasses of qx.ui.core.Widget");
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
     * Parse the widgetinfo node and add the info-child to the 'widget' childcontrol
     * 
     * @param node {Element} label xml node 
     */
    _parseWidgetinfo : function(node) {
      if (qx.core.Environment.get("qx.debug")) {
        qx.core.Assert.assertEquals(node.nodeName, "widgetinfo", "node name must be label but is "+node.nodeName);
      }
      if (node.nodeName === "widgetinfo") {
        var infoNode = node.getElementsByTagName("info")[0];
        var infoWidget = cv.ui.structure.Factory.createWidget(infoNode, this.getPath()+"_0");
        infoWidget.setAppearance("widgetinfo");
        this.getChildControl("widget").add(infoWidget, { top: 0, right: 0});
      } 
    }
  }
});

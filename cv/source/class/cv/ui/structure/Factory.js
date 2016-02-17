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
 * 
 */
qx.Class.define("cv.ui.structure.Factory",
{
  type : "static",
  
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics :
  {
    createWidget : function(node, path, root, parent) {
      if (node.nodeName === "page") {
        // check if there is a page in the pagehandler for this path 
        var page = cv.Utils.engine.getChildControl("page-handler").getPageByPath(path);
        if (page) {
          return page;
        }
      }
      var clazz = qx.Class.getByName("cv.ui.structure."+cv.Config.structure+"."+qx.lang.String.firstUp(node.nodeName));
      if (!clazz) {
        // try plugin
        if (cv.PluginHandler.hasWidgetPlugin(node.nodeName)) {
          clazz = cv.PluginHandler.getWidgetPlugin(node.nodeName);
        }
      }
      if (clazz) {
        return new clazz(node, path, root, parent);
      } else {
        qx.log.Logger.error("no class found: cv.ui.structure."+cv.Config.structure+"."+qx.lang.String.firstUp(node.nodeName));
        return new cv.ui.structure.Unknown(node, path);
      }
    }
  }
});

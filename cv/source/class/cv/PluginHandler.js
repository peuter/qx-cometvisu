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
 * @use(cv.plugin.infoaction.Main)
 */
qx.Class.define("cv.PluginHandler", {

  type : "static",

  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics : {
    _widgetPlugins : {},

    /**
     * Registers a plugin that implements a widget
     *
     * @param widgetname {String} name of the widget (usually the tag name in the xml config)
     * @param plugin {Class} the implementing class
     */
    registerWidgetPlugin : function(widgetname, plugin) {
      cv.PluginHandler._widgetPlugins[widgetname] = plugin;
    },

    /**
     * Check if a plugin for that widget is registered
     * @param widgetname {String}
     * @returns {Boolean}
     */
    hasWidgetPlugin : function(widgetname) {
      return cv.PluginHandler._widgetPlugins.hasOwnProperty(widgetname);
    },

    /**
     * Returns the registere widget plugin class path for the given name
     * @param widgetname {String}
     * @returns {Class} widget plugin class
     */
    getWidgetPlugin : function(widgetname) {
      return cv.PluginHandler._widgetPlugins[widgetname];
    },

    /**
     * Load the given plugins
     *
     * @param plugins {qx.data.Array} part names ot the plugins to load
     * @param callback {Function} callback function which is called after the loading has been done
     */
    loadPlugins : function(plugins, callback) {
      var loader = qx.io.PartLoader.getInstance();
      plugins = plugins.filter(function(plugin) {
        if (loader.hasPart(plugin)) {
          return true;
        } else {
          qx.log.Logger.error("plugin part "+plugin+" does not exists");
          return false;
        }
      });
      loader.require(plugins.toArray(), callback);
    }
  }
});

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
 * Some basic configuration settings which do not change during runtime
 *
 */
qx.Class.define("cv.Config",
{
  type : "static",
  

  /*
   *****************************************************************************
      STATICS
   *****************************************************************************
   */
  statics : {
    
    structure : "pure", // structure to use (currently only 'pure' available)
    configSuffix : "", // config file suffix
    clientDesign : undefined, // which design should be loaded, overrides the design setting in config file
    forceReload : false, // force client to reload all data (do not load anything from cache)
    startPage : undefined, // load this page on start
    
    enableAddressQueue : false, // load addresses from first page first
    
    rememberLastPage : false,

    iconFont : null,
   
    /**
     * Parse query string and initalize global config settings
     */
    init : function() {
      var req = qx.util.Uri.parseUri(window.location.href);
      if (req.queryKey.design) {
        cv.Config.clientDesign = req.queryKey.design;
      }
      if (req.queryKey.config) {
        cv.Config.configSuffix = req.queryKey.config;
      }
      if (req.queryKey.forceReload) {
        cv.Config.forceReload = true;
      }
      if (req.queryKey.startPage) {
        cv.Config.startPage = req.queryKey.startPage;
      }
      cv.Config.enableAddressQueue = req.queryKey.enableQueue ? true : false;
    }
  }
});

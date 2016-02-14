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
qx.Class.define("cv.Utils",
{
  type : "static",

  /*
   *****************************************************************************
      statics
   *****************************************************************************
   */
  statics : {
    // all singletons
    
    // the template engine
    engine : null,
    
    // the configurator
    configurator : null,
    
    // client to backend
    client : null,
    
    // model
    model : null,
    
    init : function() {
      cv.Utils.engine = cv.ui.Templateengine.getInstance();
    
      // the configurator
      cv.Utils.configurator = cv.util.Configurator.getInstance();
      
      // client to backend
      cv.Utils.client = cv.client.Cometvisu.getInstance();
      
      // model
      cv.Utils.model = cv.Model.getInstance();
    },

    copyProperties : function(from, to) {
      var props = {};
      var sourceProps = qx.Class.getProperties(from.constructor);
      for(var i=0; i<sourceProps; i++) {
        props[sourceProps[i]] = from.get(sourceProps[i]);
      }
      to.set(props);
    }
  }
});

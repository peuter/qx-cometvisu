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
 * Main Configuration utilities to setup the visu
 */
qx.Class.define("cv.util.Configurator",
{
  extend : qx.core.Object,
  type : "singleton",
  
  
  /*
   *****************************************************************************
      STATICS
   *****************************************************************************
   */
  construct : function() {
    this.base(arguments);
    this._cssParts = {
      basic : null,
      mobile : null,
      custom : null
    };
  },
  
   /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
   properties : {
     design : {
       check : ["alaska", "alaska_slim", "discreet", "discreet_slim", "discreet_sand", "metal", "pitchblack", "planet", "pure"],
       init : null,
       apply : "_applyDesign"
     }
   },
  
  /*
   *****************************************************************************
      MEMBERS
   *****************************************************************************
   */
  members : {
    /**
     * @Map stores the generated css-link script elements or later removal
     */
    _cssParts : null,
    
    
    /**
     * Load a design by name
     * 
     * @param {String} name
     */
    _applyDesign : function(value, old) {
      if (value && value !== old) {
        // load css files
         for (var partName in this._cssParts) {
           var part = this._cssParts[partName];
           if (part !== null) {
             // unload old css
             part.remove();
           }
           // load new css
           part = document.createElement("link");
           part.setAttribute("rel", "stylesheet");
           part.setAttribute("type", "text/css");
           part.setAttribute("href", "resource/cv/designs/"+value+"/"+partName+".css");
           if (partName === "mobile") {
             part.setAttribute("media", "only screen and (max-width: 480px)");
           }
           var head = document.getElementsByTagName("head")[0];
           head.appendChild(part);
         }
      }
      
    }
  }
});
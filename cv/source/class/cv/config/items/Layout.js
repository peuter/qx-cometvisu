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
 * 
 *
 */
qx.Class.define("cv.config.items.Layout",
{
  extend : qx.core.Object,

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    colspan : {
      check : "Number",
      init : 6
    },
    rowspan : {
      check : "Number",
      init : 1
    },
    x : {
      check : "String",
      init : null
    },
    y : {
      check : "String",
      init : null
    },
    z : {
      check : "String",
      init : null
    },
    width : {
      check : "Number",
      init : null
    }
  }
});
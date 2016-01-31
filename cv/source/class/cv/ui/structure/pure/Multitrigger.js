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
 * Multitrigger widget
 */
qx.Class.define("cv.ui.structure.pure.Multitrigger",
{
  extend : cv.ui.structure.pure.BaseWidget,

  /*
   *****************************************************************************
   PROPERTIES
   *****************************************************************************
   */
  properties: {
    button1value : {
      check : "String",
      nullable : true
    },
    button1label : {
      check : "String",
      nullable : true
    },
    button2value : {
      check : "String",
      nullable : true
    },
    button2label : {
      check : "String",
      nullable : true
    },
    button3value : {
      check : "String",
      nullable : true
    },
    button3label : {
      check : "String",
      nullable : true
    },
    button4value : {
      check : "String",
      nullable : true
    },
    button4label : {
      check : "String",
      nullable : true
    },
    showstatus : {
      check : "Boolean",
      transform : "stringToBool"
    }
  }
});

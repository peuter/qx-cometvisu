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
 * Line widget
 */
qx.Class.define("cv.ui.structure.pure.Line",
{
  extend : cv.ui.structure.pure.Base,
  
  properties :{
    appearance : {
      init : "line",
      refine : true
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    //overridden
    getLayoutOptions : function() {
      return { lineBreak: true, stretch: true }; 
    },
    
    //overridden
    _draw : function() {
      this.setHeight(5);
      this.getContentElement().setStyle("width", Math.round(12 / this.getLayout().getColspan() * 100)+"%");
      // add hr element
      var hr = new qx.ui.core.Widget();
      hr.getContentElement().setNodeName("hr");
      this._add(hr, {flex:1});
    }
  },
  
  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */
  destruct : function() {
  }
});

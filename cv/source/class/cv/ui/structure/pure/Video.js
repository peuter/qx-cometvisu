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
 * Video widget @todo not supported by qooxdoo
 */
qx.Class.define("cv.ui.structure.pure.Video",
{
  extend : cv.ui.structure.pure.Base,

  include : [
    cv.mixin.Label,
    cv.mixin.Flavour
  ],

  /*
   *****************************************************************************
   PROPERTIES
   *****************************************************************************
   */
  properties: {
    src : {
      check : "String",
      nullable : true,
      apply : "_applySrc"
    },
    autoplay : {
      check : "String",
      nullable : true
    }
  },

  /*
   *****************************************************************************
   MEMBERS
   *****************************************************************************
   */
  members: {

    //property apply
    _applySrc : function(value) {
      if (value) {
        this.getChildControl("video").setSource(value);
        this.getChildControl("video").show();
      } else if (this.hasChildControl("video")) {
        this.getChildControl("video").exclude();
      }
    },

    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch (id) {
        case "video":
          control = new qx.bom.media.Video();

          this._add(control, {flex:1});
          break;

      }
      return control || this.base(arguments, id);
    }
  }
});

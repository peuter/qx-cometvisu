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
 * Web widget
 */
qx.Class.define("cv.ui.structure.pure.Web",
{
  extend : cv.ui.structure.pure.Base,

  include : [
    cv.mixin.Label,
    cv.mixin.Flavour,
    cv.mixin.MRefreshable
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
    frameborder : {
      check: "String",
      nullable: true
    },
    background : {
      check: "String",
      nullable: true,
      event : "changeBackground"
    },

    scrolling : {
      check : ["yes", "no", "auto"],
      nullable : true,
      event : "changeScrolling"
    }
  },

  /*
   *****************************************************************************
   MEMBERS
   *****************************************************************************
   */
  members : {

    //property apply
    _applySrc : function(value) {
      if (value) {
        this.getChildControl("iframe").setSource(value);
        this.getChildControl("iframe").show();
      } else if (this.hasChildControl("iframe")) {
        this.getChildControl("iframe").exclude();
      }
    },

    /**
     * Handle timer interval and reload the website
     */
    _onInterval : function() {
      this.getChildControl("iframe").resetSource();
      this.getChildControl("iframe").setSource(this.getSrc());
    },

    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch (id) {
        case "iframe":
          control = new qx.ui.embed.Iframe();

          this.bind("background", control, "backgroundColor");
          this.bind("scrolling", control, "scrollbar");

          this._add(control, {flex:1});
          break;

      }
      return control || this.base(arguments, id);
    }
  }
});

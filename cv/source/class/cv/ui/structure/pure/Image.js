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
 * Image widget
 */
qx.Class.define("cv.ui.structure.pure.Image",
{
  extend : cv.ui.structure.pure.BaseWidget,

  /*
   *****************************************************************************
   PROPERTIES
   *****************************************************************************
   */
  properties: {
    /**
     * The source URL of the image to show
     */
    src : {
      check : "String",
      nullable : true,
      apply : "_applySrc"
    },

    /**
     * Refresh interval of the image
     */
    refresh : {
      check : "Number",
      nullable : true,
      transform : "stringToNumber",
      apply : "_applyRefresh"
    }
  },

  /*
   *****************************************************************************
   MEMBERS
   *****************************************************************************
   */
  members: {
    _refreshTimer : null,

    //property apply
    _applySrc : function(value) {
      if (value) {
        this.getChildControl("image").setSource(value);
        this.getChildControl("image").show();
      } else {
        this.getChildControl("image").exclude();
      }
    },

    //property apply
    _applyRefresh : function(value) {
      if (!this._refreshTimer) {
        this._refreshTimer = new qx.event.Timer(value * 1000);
        this._refreshTimer.addListener("interval", this._onInterval, this);
      } else {
        this._refreshTimer.restartWith(value * 1000);
      }
    },

    /**
     * Handle timer interval and reload the image
     */
    _onInterval : function() {
      this.getChildControl("image").resetSource();
      this.getChildControl("image").setSource(this.getSrc());
    },

    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;
      if (this._hasMixinChildControl(id)) {
        control = this._getMixinChildControl(id);
      }
      switch (id) {
        case "image":
          control = new qx.ui.basic.Image(this.getSrc());
          control.setScale(true);
          this.getChildControl("widget").add(control, {flex:1});
          break;
      }
      return control || this.base(arguments, id);
    },

    //overridden
    _draw : function() {
      this.addListener("appear", this._onAppear, this);
      this.addListener("disappear", this._onDisappear, this);
    },

    /**
     * Start the refresh timer if the image gets visible
     */
    _onAppear : function() {
      if (this._refreshTimer) {
        // refresh immediately
        this._onInterval();

        // start timer
        this._refreshTimer.start();
      }
    },

    /**
     * Stop the refresh timer if the image gets visible
     */
    _onDisappear : function() {
      if (this._refreshTimer) {
        this._refreshTimer.stop();
      }
    }
  },

  /*
   *****************************************************************************
   DESTRUCTOR
   *****************************************************************************
   */
  destruct: function () {
    if (this._refreshTimer) {
      this._restartTimer.stop();
      this._restartTimer.dispose();
      this._restartTimer = null;
    }

    this.removeListener("appear", this._onAppear, this);
    this.removeListener("disappear", this._onDisappear, this);
  }
});

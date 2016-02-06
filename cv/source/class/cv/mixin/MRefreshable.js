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

//noinspection JSUnusedGlobalSymbols
/**
 * Mixin for refreshable widgets, calls their _onInterval method
 */
qx.Mixin.define("cv.mixin.MRefreshable",
{

  /*
   *****************************************************************************
   CONSTRUCTOR
   *****************************************************************************
   */
  construct: function () {
    this.addListener("appear", this._onAppear, this);
    this.addListener("disappear", this._onDisappear, this);
  },

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {

    /**
     * Refresh value in seconds
     */
    refresh: {
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
  members :
  {
    _refreshTimer : null,

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
  destruct : function() {
    if (this._refreshTimer) {
      this._restartTimer.stop();
      this._restartTimer.dispose();
      this._restartTimer = null;
    }

    this.removeListener("appear", this._onAppear, this);
    this.removeListener("disappear", this._onDisappear, this);
  }
});

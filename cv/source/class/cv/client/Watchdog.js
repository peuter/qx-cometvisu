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
 * 
 */
qx.Class.define("cv.client.Watchdog",
{ 
  extend : qx.core.Object,
  
  properties : {
    watchdogTimer : {
      check : "Number",
      init : 5,
      apply : "_applyWatchdogTimer"
    },
    
    maxConnectionAge : {
      check : "Number",
      init : 60 * 1000 // in milliseconds - restart if last read is older
    },
    
    maxDataAge : {
      check : "Number",
      init : 3200 * 1000 // in milliseconds - reload all data when last successful read is older (should be faster than the index overflow at max data rate, i.e. 2^16 @ 20 tps for KNX TP)
    }
  },
  
  
  members : {
    _client : null,
    _timer : null,
    _last : null,
    
    
    //property apply
    _applyWatchdogTimer : function(value) {
      if (this._timer) {
        this._timer.restartWith(value * 1000);
      }
    },
    
    aliveCheckFunction : function() {
      if (!this._client) {
        this._client = cv.client.Cometvisu.getInstance();
      }
      var now = new Date();
      if( now - this._last < this.getMaxConnectionAge() && this._client.getCurrentTransport().isRunning() ) {
        return;
      }
      this._client.getCurrentTransport().restart( now - this._hardLast > this.getMaxDataAge() );
      this._last = now;
    },
    
    start : function() {
      if (!this._timer) {
        this._timer = new qx.event.Timer(this.getWatchdogTimer() * 1000);
        this._timer.addListener("interval", this.aliveCheckFunction, this);
        this._timer.start();
      } else {
        this._timer.restartWith(this.getWatchdogTimer() * 1000);
      }
    },
    
    ping : function( fullReload ) {
      this._last = new Date();
      if( fullReload ) {
        this._hardLast = this._last;
      }
    }
  },
  
  
  destruct : function() {
    this._client = null;
    if (this._timer) {
      this._timer.stop();
      this._disposeObjects("_timer");
    }
  }
});
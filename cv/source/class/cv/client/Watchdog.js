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
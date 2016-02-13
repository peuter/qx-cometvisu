/* 
 * QometVisu - version 0.0.1-SNAPSHOT - 13-02-2016
 *  @see(https://github.com/peuter/qx-cometvisu)
 * 
 * This is a port of the CometVisu smart home visualization, based on the qooxdoo framework
 *  @see(https://github.com/cometvisu/cometvisu)
 *  @see(https://github.com/qooxdoo/qooxdoo)
 * 
 * copyright (c) 2016 Tobias Bräutigam (Peuter) [tbraeutigam at gmail dot com]
 * 
 * based on: 
 * cometvisu.js (c) 2010 by Christian Mayer (ChristianMayer) [CometVisu at ChristianMayer dot de]
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
 * Implements the long-polling transport protocol 
 *
 */
qx.Class.define("cv.client.transport.LongPolling",
{
  extend : cv.client.transport.Base,
  
  members : {
    _lastIndex : null,
    _retryCounter : null,
    
    
    //overridden
    handleSession : function(json) {
      this.base(arguments, json);
      
      var client = this._client;
      
      var handleRead = undefined;
      var requestData = undefined; 
     
      if (client.getInitialAddresses().length) {
        handleRead = this.handleReadStart;
        requestData = client.buildRequest(client.getInitialAddresses(), { t : 0 });
      } else {
        // old behaviour -> start full query
        handleRead = this.handleRead;
        requestData = client.buildRequest(null, { t : 0 });
      }
      this.__createRequest("read",handleRead,requestData);
    },
    
    /**
     * Create the XHR request
     * 
     * @param path {String} read,write,login
     * @param successListener {Callback} Handles success events
     * @param requestData {Object} Any data that should be send with the request
     */
    __createRequest : function(path, successListener, requestData) {
      if (!path) {
        path = "read";
      }
      this._con = new qx.io.request.Xhr();
      this._con.setUrl(this._client.getResourcePath(path));
      this._con.addListener("fail", this.handleError, this);
      this._con.addListener("success", successListener, this);
      if (requestData) {
        this._con.setRequestData(requestData);
      }
      this.beforeSend(this._con);
      this._con.send();
    },
    
    /**
     * This function gets called once the communication is established
     * and session information is available
     * 
     * @method handleRead
     * @param e {Event} 
     */
   handleRead : function(e) {
     
     if (!e && (-1 == this._lastIndex)) {
       if (this.isRunning()) { // retry initial request
         this._retryCounter++;
         this.__createRequest("read", this.handleRead, this._client.buildRequest(null, { t : 0 }));
         this._client.getWatchdog().ping( true );
       }
       return;
     }
     var json = e && e.getTarget() ? e.getTarget().getResponse() : null;
     
     console.trace(json);

     if (json && !this.isRestarting()) {
       var req = e.getTarget();
       var json = req.getResponse();
       
       this._lastIndex = json.i;
       this.readResendHeaderValues(req);
       this._client.update(json.d);
       this._retryCounter = 0;
     }

     if (this.isRunning()) { // keep the requests going
       this._retryCounter++;
       this.__createRequest("read", this.handleRead, this._client.buildRequest(null, { i : this._lastIndex }));
       this._client.getWatchdog().ping();
     }
   },

   handleReadStart : function(e) {
     var req = e.getTarget();
     var json = req.getResponse();
     
     if (!json && (-1 == this._lastIndex)) {
       if (this.isRunning()) { // retry initial request
         this._retryCounter++;
         this.__createRequest("read", this.handleReadStart, this._client.buildRequest(this._client.getInitialAddresses(), { t : 0 }));
         this._client.getWatchdog().ping( true );
       }
       return;
     }
     var req = e.getTarget();
     var json = req.getResponse();
     if (this && !this.isRestarting()) {
       this.readResendHeaderValues(req);
       this._client.update(json.d);
     }
     if (this.isRunning()) { 
       // keep the requests going, but only request addresses-startPageAddresses
       var diffAddresses = new qx.data.Array();
       var initialAddresses = this._client.getInitialAddresses();
       this._client.getAddresses().forEach(function(address) {
         if (!initialAddresses.contains(address)) {
           diffAddresses.push(address);
         }
       }, this);
       
       this.__createRequest("read", this.handleRead, this._client.buildRequest(diffAddresses, { t : 0 }));
       this._client.getWatchdog().ping( true );
     }
   },
    
    /**
     * This function gets called on an error FIXME: this should be a
     * prototype, so that the application developer can override it
     * 
     * @method handleError
     * @param e {Event} The error event
     */
    handleError : function(e) { 
      if (this.isRunning() && this._con.getReadyState() != 4
        && !this.isRestarting() && this._con.getStatus() !== 0) // ignore error when connection is irrelevant
      {
        var readyState = 'UNKNOWN';
        switch (this._con.getReadyState()) {
          case 0:
            readyState = 'UNINITIALIZED';
            break;
          case 1:
            readyState = 'LOADING';
            break;
          case 2:
            readyState = 'LOADED';
            break;
          case 3:
            readyState = 'INTERACTIVE';
            break;
          case 4:
            readyState = 'COMPLETED';
            break;
        }
        this.error('Error! Type: ' + readyState);
      }
    },
    
    /**
     * Restart the read request, e.g. when the watchdog kicks in
     * 
     * @method restart
     * @param doFullReload {bool} reload all data and not only restart connection
     */
     restart : function( doFullReload ) {
       if( doFullReload ) {
         this._lastIndex = -1; // reload all data
       }
       this.setRestarting(true);
       this.abort();
       this.handleRead(); // restart
       this.setRestarting(false);
     }
  },
  
  destruct :  function() {
    this.disposeObjects("_xhr");
  }

});
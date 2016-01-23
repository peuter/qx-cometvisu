/**
 * Base class for all transport protocol 
 *
 * @asset(cv/*)
 */
qx.Class.define("cv.client.transport.Base",
{
  extend : qx.core.Object,
  implement : cv.client.ITransport,
  
  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  /**
   * Constructor
   * 
   * @param session {cv.client.Cometvisu}
   */
  construct : function() {
    this._client = cv.client.Cometvisu.getInstance();
  },
  
  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    
    /**
     * are we currently in a restart, e.g. due to the watchdog
     */
    restarting : {
      check : "Boolean",
      init : false
    },
    
    /**
     * true while connection is active
     */
    running : {
      check : "Boolean",
      init : false,
      event : "changeRunning"
    },
    
    client : {
      check : "cv.client.Cometvisu"
    },
    
    addresses : {
      check : "qx.data.Array",
      init : []
    }
  },
  
  /*
   *****************************************************************************
      MEMBERS
   *****************************************************************************
   */
  members : {
    _client : null,
    _con : null,
    _headers : null,
    _resendHeaders : null,
    _sessionId : null,
    _version : null,
    
    /**
     * This function gets called once the communication is established
     * and session information is available.
     * 
     * @param e {Event}
     * @method handleSession
     */
   handleSession : function(e) {
     var req = e.getTarget();
     var json = req.getResponse();
     
     this._sessionId = json.s;
     this._version = json.v.split('.', 3);

     if (0 < parseInt(this._version[0])
         || 1 < parseInt(this._version[1])) {
       this.error('ERROR CometVisu Client: too new protocol version ('
           + json.v + ') used!');
     }

     this.setRunning(true);
   },
   
   /**
    * Restart the read request, e.g. when the watchdog kicks in
    * 
    * @method restart
    * @param doFullReload {bool} reload all data and not only restart connection
    */
    restart : function( doFullReload ) {
    },
    
    /**
     * read the header values of a response and stores them to the
     * resendHeaders array
     * 
     * @method readResendHeaderValues
     */
     readResendHeaderValues : function() {
       for ( var headerName in this._resendHeaders) {
         this._resendHeaders[headerName] = this._con.getResponseHeader(headerName);
       }
     },
   
   /**
    * Abort the read request properly
    * 
    * @method restart
    */
    abort : function() {
      if (this._con && this._con.abort) {
        this._con.abort();
  
        if (this._client.backend && this._client.backend.hooks.onClose) {
          this._client.backend.hooks.onClose.bind(this);
        }
      }
    },
    
    /**
     * manipulates the header of the current ajax query before it is
     * been send to the server
     * 
     * @param con {Object} The connection object
     * @method beforeSend
     */
    beforeSend : function(con) {
      for ( var headerName in this._resendHeaders) {
        if (this._resendHeaders[headerName] != undefined) {
          con.setRequestHeader(headerName,
              this._resendHeaders[headerName]);
        }
      }
      for ( var headerName in this._headers) {
        if (this._headers[headerName] != undefined) {
          con.setRequestHeader(headerName, this.headers[headerName]);
        }
      }
    }
  }
});
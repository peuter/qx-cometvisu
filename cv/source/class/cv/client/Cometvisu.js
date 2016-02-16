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
 * The cometvisu client is responsible for all communication with the backend
 *
 */
qx.Class.define("cv.client.Cometvisu",
{
  type : "singleton",
  extend : qx.core.Object,

  /*
   *****************************************************************************
   CONSTRUCTOR
   *****************************************************************************
   */
  construct: function () {
    this.base(arguments);

    this._backendNameAliases = {
      'cgi-bin' : 'default',
        'oh'      : 'openhab',
        'oh2'     : 'openhab2'
    };
  },
  
  properties : {
    watchdog : {
      check : "cv.client.Watchdog",
      init : null
    },
    
    // the subscribed addresses
    addresses : {
      check : "qx.data.Array",
      nullable : false,
      init : []
    },
    
    // the addresses which should be loaded before the subscribed addresses
    initialAddresses : {
      check : "qx.data.Array",
      init : []
    },
    
    // the subscribed filters
    filters : {
      check : "qx.data.Array",
      init : []
    },
    
    // the current user
    user : {
      check : "String",
      init : ""
    },
    
    // the current password
    pass : {
      check : "String",
      init : ""
    },
    
 // the current device ID
    device : {
      check : "String",
      init : ""
    },
    
    // is the communication running at the moment?
    running : {
      check : "Boolean",
      init : false
    },
    
    // the currently used transport layer
    currentTransport : {
      check : "cv.client.ITransport",
      init : null
    },
    
    backend : {
      check : "Object",
      init : null,
      transform : "_transformBackend"
    },
    
    sessionId : {
      check : "String",
      init : ""
    }
  },
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    _backends : null, // the hardcoded backend configs (including default config)
    
    // used for backwards compability
    _backendNameAliases : null,

    _initPath : null,
    
    /**
     * Propagate the updated states to the event bus, to inform the listening model items
     */
    update : function(data) {
      var bus = qx.event.message.Bus.getInstance();
      for (var address in data) {
        //noinspection JSUnfilteredForInLoop
        bus.dispatchByName("model.item.update."+address, data[address]);
      }
    },
    
    /**
     * Initialize this instance
     */
    init : function(backendName) {
      this.__initBackendConfigTemplate();
      
      this.setWatchdog(new cv.client.Watchdog());
      
      
      // init default settings
      if (this._backendNameAliases[backendName]) {
        backendName = this._backendNameAliases[backendName];
      }
  
      if (backendName && backendName !== 'default') {
        if (qx.lang.Type.isObject(backendName)) {
          // override default settings
          this.setBackend(backendName);
        } else if (this._backends[backendName]) {
          // merge backend settings into default backend
          this.setBackend(this._backends[backendName]);
        }
      } else {
        this.setBackend(this._backends['default']);
      }
    },
    
    __initBackendConfigTemplate : function() {
            
      this._backends = {
        'default' : {
          name      : 'default',
          baseURL   : '/cgi-bin/',
          transport : 'long-polling',
          resources : {
            login     : 'l',
            read      : 'r',
            write     : 'w',
            rrd       : 'rrdfetch'
          },
          maxConnectionAge: 60 * 1000, // in milliseconds - restart if last read is older
          maxDataAge: 3200 * 1000, // in milliseconds - reload all data when last successful read is older (should be faster than the index overflow at max data rate, i.e. 2^16 @ 20 tps for KNX TP)
          hooks     : {}
        },
        'openhab' : {
          name          : 'openHAB',
          baseURL       : '/services/cv/',
          // keep the e.g. atmosphere tracking-id if there is one
          resendHeaders : {
            'X-Atmosphere-tracking-id' : undefined
          },
          // fixed headers that are send everytime
          headers       : {
            'X-Atmosphere-Transport' : 'long-polling'
          },
          hooks         : {
            onClose : function(e) {
              var req = e.getTarget();
              // send an close request to the openHAB server
              var oldValue = req.getResponseHeader("X-Atmosphere-Transport");
              var con = new qx.io.request.Xhr();
              con.setUrl(this._client.getResourcePath("read"));
              con.setRequestHeader("X-Atmosphere-Transport","close");
              this.beforeSend(con);
              
              con.send();
              
              if (oldValue != undefined) {
                this._headers["X-Atmosphere-Transport"] = oldValue;
              } else {
                delete this._headers["X-Atmosphere-Transport"];
              }
            }
          }
        }
      };
    },
    
    /**
     * Make sure that the new backend settings always override the default settings
     */
    _transformBackend : function(value) {
      // override default settings (or current settings if already set)
      var base = this.getBackend() ? this.getBackend() : this._backends['default'];
      var backend = value ? qx.lang.Object.mergeWith(base, value) : base;
      
      if (backend.transport === 'sse' && backend.transportFallback) {
        if (window.EventSource === undefined) {
          // browser does not support EventSource object => use fallback
          // transport + settings
          qx.lang.Object.mergeWith(backend, backend.transportFallback);
        }
      }
      // add trailing slash to baseURL if not set
      if (backend.baseURL && backend.baseURL.substr(-1) !== "/") {
        backend.baseURL += "/";
      }
      return backend;
    },
   
    /**
     * Connect to backend
     */
    __initTransport : function() {
      var transport;
      switch (this.getBackend().transport) {
        case "sse":
          transport = new cv.client.transport.Sse(this.getBackend());
          break;
        default:
          transport = new cv.client.transport.LongPolling(this.getBackend());
          break;
      }
      this.setCurrentTransport(transport);
    },
    
    /**
     * Subscribe to the addresses in the parameter. The second parameter
     * (filter) is optional
     * 
     * @param addresses {qx.data.Array} Addresses to subscribe to
     * @param filters {qx.data.Array} Filter
     * @method subscribe
     */
    subscribe : function(addresses, filters) {
      this.__initTransport();
      
      if (qx.core.Environment.get("qx.debug")) {
        qx.core.Assert.assertInstance(addresses, qx.data.Array, "addresses must by of type qx.data.Array");
        if (filters) {
          qx.core.Assert.assertInstance(filters, qx.data.Array, "addresses must by of type qx.data.Array");
        }
      }
      var startCommunication = !this.getAddresses().length; // start when addresses were empty
      if (addresses) {
        this.setAddresses(addresses);
      }
      if (filters) {
        this.setFilters(filters);
      }
      
      if (!addresses.length) {
        this.stop(); // stop when new addresses are empty
      }
      else if (startCommunication) {
        this.login();
      }
    },

    /**
     * This function starts the communication by a login and then runs the
     * ongoing communication task
     * 
     * @method login
     */
    login : function() {
      var request = {};
      if ('' !== this.getUser()) {
        request.u = this.getUser();
      }
      if ('' !== this.getPass()) {
        request.p = this.getPass();
      }
      if ('' !== this.getDevice()) {
        request.d = this.getDevice();
      }
      
      var con = new qx.io.request.Xhr();
      con.setUrl(this._initPath ? this._initPath : this.getResourcePath("login"));
      con.setRequestData(request);
      con.addListener("success", this.handleLogin, this);
      con.send();
    },

    /**
     * Handles login response, applies backend configuration if send by
     * backend and forwards to the configurated transport handleSession
     * function
     * 
     * @param e {Event}
     */
    handleLogin : function(e) {
      var req = e.getTarget();
      var json = req.getResponse();
      
      // read backend configuration if send by backend
      if (json.c) {
        this.setBackend(json.c);
      }
      if (json.s) {
        this.setSessionId(json.s);
      }
      this.getCurrentTransport().handleSession( e );
      
      // once the connection is set up, start the watchdog
      this.getWatchdog().start(5);
    },

    /**
     * This function stops an ongoing connection
     * 
     * @method stop
     */
    stop : function() {
      this.setRunning(false);
      this.getCurrentTransport().abort();
    },


    /**
     * This function sends a value
     * @param address {String}
     * @param value {String}
     * @method write
     */
    write : function(address, value) {
      /**
       * ts is a quirk to fix wrong caching on some Android-tablets/Webkit;
       * could maybe selective based on UserAgent but isn't that costly on writes
       */
      var now = new Date().getTime();
      var con = new qx.io.request.Xhr();
      con.setUrl(this._initPath ? this._initPath : this.getResourcePath("write"));
      con.setRequestData({
        s : this.getSessionId(),
        a : address,
        v : value,
        ts : now
      });
      con.send();
    },
    
    
    /**
     * Build the URL part that contains the addresses and filters
     * @method buildRequest
     * @param addresses {qx.data.Array} Addresses to use
     * @param data {Object} additional data
     * @return {String} 
     */
    buildRequest : function(addresses, data) {
      if (!addresses) {
        addresses = this.getAddresses();
      }
      var d = {
        s : this.getSessionId(),
        a : addresses.toArray()
      };
      if (this.getFilters().length > 0) {
        d.f = this.getFilters().toArray();
      }
      return qx.lang.Object.mergeWith(d, data);
    },
    
    /**
     *  return the relative path to a resource on the currently used backend
     * 
     * @method getResourcePath
     *  
     * @param name {String} Name of the resource (e.g. login, read, write, rrd)
     * @returns {String} relative path to the resource
     */
    getResourcePath : function(name) {
      return this.getBackend().baseURL + this.getBackend().resources[name];
    }
  }
});
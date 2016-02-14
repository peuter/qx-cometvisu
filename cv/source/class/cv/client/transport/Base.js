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
 * Base class for all transport protocol
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
    construct : function(config) {
      this._client = cv.client.Cometvisu.getInstance();

      if (config.headers) {
        this._headers = config.headers;
      }
      if (config.resendHeaders) {
        this._resendHeaders = config.resendHeaders;
      }
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

        if (qx.lang.Type.isString(json)) {
          json = qx.lang.Json.parse(json);
        }

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
          //noinspection JSUnfilteredForInLoop
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
        var headerName;
        for ( headerName in this._resendHeaders) {
          //noinspection JSUnfilteredForInLoop
          if (this._resendHeaders[headerName] != undefined) {
            //noinspection JSUnfilteredForInLoop
            con.setRequestHeader(headerName, this._resendHeaders[headerName]);
          }
        }
        for ( headerName in this._headers) {
          //noinspection JSUnfilteredForInLoop
          if (this._headers[headerName] != undefined) {
            //noinspection JSUnfilteredForInLoop
            con.setRequestHeader(headerName, this._headers[headerName]);
          }
        }
      }
    }
  });
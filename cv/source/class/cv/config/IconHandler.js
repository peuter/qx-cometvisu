/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * The object "icon" contains the whole API necessary to handle the icons.
 * 
 */
qx.Class.define("cv.config.IconHandler",
{
  extend : qx.core.Object,

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  construct : function() {
    this.base(arguments);
    this._db = {};
    this.setReady(true);
    
    // var url = qx.util.ResourceManager.getInstance().toUri("cv/icons.json");
    // var store = new qx.data.store.Json(url);
//     
    // store.addListenerOnce("loaded", function(e) {
      // this._db = e.getData();
      // this.setReady(true);
      // console.log(this._db);
    // }, this);
  },

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    ready : {
      check : "Boolean",
      init : false,
      event : "changeReady"
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
 // //////////////////////////////////////////////////////////////////////////
    // Definition of the private variables

    /**
     * Internal database of the known icons.
     * Initially filled with the default icons.
     * 
     * @property db
     * @private
     */
    _db : null,

    // //////////////////////////////////////////////////////////////////////////
    // Definition of the public variables

    /* ... */

    // //////////////////////////////////////////////////////////////////////////
    // Definition of the private methods
    /* ... */

    // //////////////////////////////////////////////////////////////////////////
    // Definition of the public methods
    /**
     * Insert or overwrite one or many icons into the database. The parameter
     * might be a full hash of icon definitions or a single one consisting out of
     * a name and a URI path. Optional further parameters are a "type" and a
     * flavour.
     */
    insert : function() {
    	var name    = arguments[0];
    	var uri     = arguments[1];
    	var type    = arguments[2] || '*';
    	var flavour = arguments[3] || '*';
    	var color   = arguments[4] || '*';
    	var styling = arguments[5];
      var dynamic = arguments[6];
      
      if (!this._db[name]) {
        this._db[name] = {};
      }
      if (!this._db[name][type]) {
        this._db[name][type] = {};
      }
      if (!this._db[name][type][flavour]) {
        this._db[name][type][flavour] = {};
      }
      if( dynamic && window[ dynamic ] ) {
        this._db[name][type][flavour][color] = window[ dynamic ]( uri );
      }
      else {
        this._db[name][type][flavour][color] = {
          uri    : uri,
          styling: styling
        };
      }
    },

    /**
     * Get the icon information for a name.
     * 
     * @method get
     * @param {String}
     *          name Name
     * @param {String}
     *          type Type (optional)
     * @param {String}
     *          flavour Flavour (optional)
     * @param {String}
     *          color Color (optional, only relevant for monochrome icons)
     * @return {URI} The URI for the icon - or "undefined" if not known
     */
    get : function() {
      var name    = arguments[0];
      var type    = arguments[1];
      var flavour = arguments[2];
      var color   = arguments[3];
      if (!this._db[name]) {
        return undefined;
      }
      if (!this._db[name][type]) {
        type = '*'; // undefined -> use default
      }
      if (typeof this._db[name][type] === 'string')
      {
        type = this._db[name][type]; // redirect link
        if( type.split('/').length > 1 )
        {
          var all = type.split('/');
          type = all.shift();
          if( flavour === undefined ) { 
            flavour = all.shift();
          }
        }
      }
      if (!this._db[name][type][flavour]) {
        flavour = '*'; // undefined -> use default
      }
      if (typeof this._db[name][type][flavour] === 'string')
      {
        flavour = this._db[name][type][flavour]; // redirect link
        if( flavour.split('/').length > 1 )
        {
          var all = flavour.split('/');
          flavour = all.shift();
          if( color === undefined ) {
            color = all.shift();
          }
        }
      }
      if (!this._db[name][type][flavour][color]) {
        color = '*'; // undefined -> use default
      }
      // handle a generic mapping function
      if (typeof this._db[name][type][flavour]['*'] === 'function') {
        return this._db[name][type][flavour]['*'];
      }
      if (typeof this._db[name][type][flavour][color] === 'string') {
        color = this._db[name][type][flavour][color]; // redirect link
      }
      return this._db[name][type][flavour][color];
    },

    getURI : function() {
      var i = this.get.apply(this, arguments);
      if (i) {
        return i.uri;
      }
    },

    /**
     * Return an icon DOM element.
     */
    getIconElement : function(icon) {
      var i = this.get.apply(this, arguments);
      if (i) {
        var styling = arguments[4];
        if( i.icon && styling === undefined && typeof i !== 'function' ) {
          return i.icon;
        }
        // fetch and cache image
        if( styling === undefined ) {
          styling = i.styling === undefined ? '' : ' style="' + i.styling + '"';
        }
        else {
          styling = ' style="' + styling + '"';
        }
        var classes = 'icon'
        var iconclass = arguments[5];
        if( iconclass !== undefined) {
          classes = classes + ' custom_' + iconclass;
        }
        
        if( typeof i === 'function' )
        {
          i.icon = i( arguments[3], styling, classes, false );
        } else {
          i.icon = '<img class="' + classes + '" src="' + i.uri + '"' + styling + '/>';
        }
        return i.icon;
      }
    },
    
    /**
     * Return a String for the icon, e.g. build a DOM tree in a string before
     * passing it to ParseHTML. After the content was added to the DOM the
     * fillIcons method must be called to fill missing content (e.g. the <canvas>
     * icons.
     * @param {String}
     *          name Name
     * @param {String}
     *          type Type (optional)
     * @param {String}
     *          flavour Flavour (optional)
     * @param {String}
     *          color Color (optional, only relevant for monochrome icons)
     * @param {String}
     *          styling
     * @param {String}
     *          iconclass
     */
    getIconText : function() {
      var i = this.get.apply(this, arguments);
      if (i) {
        var styling = arguments[4];

        if( styling === undefined ) {
          styling = i.styling === undefined ? '' : ' style="' + i.styling + '"';
        }
        else {
          styling = ' style="' + styling + '"';
        }
        var classes = 'icon'
        var iconclass = arguments[5];
        if( iconclass !== undefined) {
          classes = classes + ' custom_' + iconclass;
        }
        
        if( typeof i === 'function' )
        {
          return i( arguments[3], styling, classes, true );
        } else {
          return '<img class="' + classes + '" src="' + i.uri + '"' + styling + '/>';
        }
      }
    },
    
    /**
     * Fill the icons in the array.
     */
    fillIcons : function( array ) {
      array.each( function( thisIcon ){
        window.fillRecoloredIcon( thisIcon );
      });
    },

    /**
     * List all known icons
     * 
     * @method list
     * @return {Array} List of all known icon names
     */
    list : function() {
      return Object.keys(this.db);
    },

    /**
     * Return icon database for debuging purposes - use ONLY for debugging as it's
     * circumventing the data hiding and exposes a writeable reference to the
     * database object!
     * 
     * @method debug
     * @return {Object} The icon database
     */
    debug : function() {
      return this.db;
    }
  },
  
  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */
  destruct : function() {
    
  }
});

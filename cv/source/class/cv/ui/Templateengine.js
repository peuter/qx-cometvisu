/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * 
 *
 */
qx.Class.define("cv.ui.Templateengine",
{
  extend : qx.ui.core.Widget,
  type : "singleton",

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  construct : function() {
    this.base(arguments);
    
    this._setLayout(new qx.ui.layout.VBox());
    
    this.setConfigSuffix(cv.Config.configSuffix);
    this.setForceReload(cv.Config.forceReload);
    
    
    var iconHandler = new cv.config.IconHandler();
    this.setIconHandler(iconHandler);
    
    this.setMappings(new qx.data.Array());
    this.setStylings(new qx.data.Array());
    
    this._createChildControl("page-handler");
    this._createChildControl("footer");
    
    this.setReady(true);
  },

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    appearance : {
      init : "main-template",
      refine : true
    },
    
    ready : {
      check : "Boolean",
      init : false,
      event : "changeReady"
    },
    
    configSuffix : {
      check : "String",
      init : ""
    },
    
    forceReload : {
      check : "Boolean",
      init : false
    },
    
    backendName : {
      check : ["default", "openhab", "openhab2"],
      init : "default"
    },
    
    backendUrl : {
      check : "String",
      init : ""
    },
    
    scrollSpeed : {
      check : "Number",
      init : 400,
      transform : "_transform"
    },
    
    enableColumnAdjustment : {
      check : "Boolean",
      init : false
    },
    
    design : {
      check : "String",
      init : "pure"
    },
    
    defaultColumns : {
      check : "Number",
      init : 12,
      transform : "_transform"
    },
    
    minColumnWidth : {
      check : "Number",
      init : 120,
      transform : "_transform"
    },
    
    maxMobileScreenWidth : {
      check : "Number",
      init : 480,
      transform : "_transform"
    },
    
    screensave_time : {
      check : "Number",
      apply : "_applyScreenSaveTime"
    },
    screensave_page : {
      check : "String"
    },
    
    libVersion : {
      check : "Number",
      init : 7,
      transform : "_transform"
    },
    
    iconHandler : {
      check : "cv.config.IconHandler",
      init : null
    },
    
    mappings : {
      check : "qx.data.Array",
      init : null
    },
    
    stylings : {
      check : "qx.data.Array",
      init : null
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    _libraryCheck : true,
    _pageHandler : null,
    _screensaveTimer : null,
    
    //property apply
    _applyScreenSaveTime : function(value) {
      if (value > 0) {
        if (!this._screensaveTimer) {
          this._screensaveTimer = new qx.event.Timer(value * 1000);
          this._screensaveTimer.addListener("interval", function() {
            this.scrollToPage();
          }, this);
          
          // add global click listener to reset screensave timer
          qx.core.Init.getApplication().getRoot().addListener("pointerdown", this._resetScreensaveTimer, this);
        } else {
          this._screensaveTimer.restartWith(value * 1000);
        }
      } else if (this._screensaveTimer) {
        this._screensaveTimer.stop();
        this._screensaveTimer = null;
      }
    },
    
    _resetScreensaveTimer : function() {
      if (this._screensaveTimer) {
        this._screensaveTimer.restart();
      }
    },
    
    _transform : function(value) {
      if ( qx.lang.Type.isString(value) ) {
          value = parseInt(value, 10);
      }
      return value;
    },
    
    _createChildControlImpl : function(id) {
      var control = null;
      switch(id) {
        case "footer":
          control = new cv.ui.parts.Footer();
          this._add(control);
          break;
        case "page-handler":
          control = new cv.ui.PageHandler();
          this._add(control, { flex: 1});
          break;
      }
      if (!control) {
        return this.base(arguments, id);
      } else {
        return control;
      }
    },
    
    /**
     * Show config error
     */
    configError : function(textStatus, additionalErrorInfo) {
        var configSuffix = (this.getConfigSuffix() ? this.getConfigSuffix() : '');
        var message = 'Config-File Error!<br/>';
        switch (textStatus) {
          case 'parsererror':
            message += 'Invalid config file!<br/><a href="check_config.php?config=' + configSuffix + '">Please check!</a>';
            break;
          case 'libraryerror':
            var link = window.location.href;
            if (link.indexOf('?') <= 0) {
              link = link + '?';
            }
            link = link + '&libraryCheck=false';
            message += 'Config file has wrong library version!<br/>' +
              'This can cause problems with your configuration</br>' + 
              '<p>You can run the <a href="./upgrade/index.php?config=' + configSuffix + '">Configuration Upgrader</a>.</br>' +
              'Or you can start without upgrading <a href="' + link + '">with possible configuration problems</a>.</p>';
            break;
          case 'filenotfound':
            message += '404: Config file not found. Neither as normal config ('
              + additionalErrorInfo[0] + ') nor as demo config ('
              + additionalErrorInfo[1] + ').';
            break;
          default:
            message += 'Unhandled error of type "' + textStatus + '"';
            if( additionalErrorInfo ) {
              message += ': ' + additionalErrorInfo;
            }
            else {
              message += '.';
            }
        }
        document.getElementById('loading').html(message);
    },
    
    /**
     * Load a config xml file
     */
    loadConfig : function() {
      var con = new qx.io.request.Xhr();
      con.set( {
        cache : !this.isForceReload(),
        accept : "xml"
      });
      con.setUrl('config/visu_config'+ (this.getConfigSuffix() ? '_' + this.getConfigSuffix() : '') + '.xml');
      con.setUserData("noDemo", true);
      
      con.addListener("success", function(e) {
        var req = e.getTarget();
        var xml = req.getResponse();
        if (!xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length) {
          this.configError("parsererror");
        }
        else {
          // check the library version
          var xmlLibVersion = qx.xml.Element.getSingleNodeText(xml, 'pages[@lib_version]');
          if (xmlLibVersion == undefined) {
            xmlLibVersion = -1;
          }
          if (this._libraryCheck && xmlLibVersion < this.getLibVersion()) {
            this.configError("libraryerror");
          }
          else {
            var loading = document.getElementById('loading');
            loading.textContent = loading.textContent + '.';
            // load backend header
            if (req.getResponseHeader("X-CometVisu-Backend-LoginUrl")) {
              this.setBackendUrl(req.getResponseHeader("X-CometVisu-Backend-LoginUrl"));
            }
            if (req.getResponseHeader("X-CometVisu-Backend-Name")) {
              this.setBackendName(req.getResponseHeader("X-CometVisu-Backend-Name"));
            }
            if (!this._parser) {
              this._parser = new cv.config.Parser();
            }
            this._parser.parseMeta(xml);
            this._parser.parsePages(xml);
          }
        }
      }, this);
      
      con.addListener("fail", function(e) {
        var req = e.getTarget();
        
        if( 404 === req.getStatus() && req.getUserData("noDemo") )
        {
          var loading = document.getElementById('loading');
          loading.textContent = loading.textContent + '!';
          req.setUserData("noDemo", false);
          req.setUserData("origUrl", req.getUrl());
          req.setUrl(req.getUrl().replace('config/','config/demo/'));
          req.send();
          return;
        }
        else if( 404 === req.getStatus() ) {
          this.configError( "filenotfound", [req.getUserData("origUrl"), req.getUrl()] );
        }
        else {
          this.configError( req.getStatusText() );
        }
      }, this);
      
      
      con.send();
      
    },
    
    initBackendClient : function() {
      
    },
    
    /**
     * @param item {cv.config.meta.Mapping} Mapping to add
     */
    addMapping : function(item) {
      this.getMappings().push(item); 
    },
    
    /**
     * @param item {cv.config.meta.Styling} Styling to add
     */
    addStyling : function(item) {
      this.getStylings().push(item); 
    },
    
    setupPage : function() {
      
    },
    
    selectDesign : function() {
      
    },
    
    // wrapper function for backwards compabilität  
    scrollToPage : function(pageId, scrollTime, skipHistory) {
      this.getChildControl("page-handler").setCurrentPage(pageId);
    }
  },
  
  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */
  destruct : function() {
    if (this._screensaveTimer) {
      this._screensaveTimer.stop();
      this._disposeObjects("_screensaveTimer");
    }
    qx.core.Init.getApplication().getRoot().removeListener("pointerdown", this._resetScreensaveTimer, this);
   }
});

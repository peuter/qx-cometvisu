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


//noinspection JSUnusedLocalSymbols
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
    
    this._setLayout(new qx.ui.layout.Dock());
        
    this.setConfigSuffix(cv.Config.configSuffix);
    this.setForceReload(cv.Config.forceReload);
        
    var iconHandler = new cv.config.IconHandler();
    this.setIconHandler(iconHandler);
    
    this.setMappings(new qx.data.Array());
    this.setStylings(new qx.data.Array());
    
    // make sure that the child controls are added in the right order
    // header
    this._createChildControl("breadcrumb");
    this._createChildControl("navbar-top");
    
    // content
    this._createChildControl("navbar-left");
    this._createChildControl("page-handler");
    this._createChildControl("navbar-right");
    
    // footer
    this._createChildControl("navbar-bottom");
    this._createChildControl("status-bar");
    
    this.setReady(true);

    // listen to browser back button
    qx.bom.History.getInstance().addListener("request", function(e) {
      console.log(e.getData());
      if (e.getData()) {
        this.scrollToPage(e.getData());
      }
    }, this);
  },

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    appearance : {
      init : "template-engine",
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
      apply : "_applyDesign"
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

    /**
     * Find styling by name
     *
     * @param name {String} name of the styling
     * @returns {cv.config.meta.Styling|null}
     */
    getStylingByName : function(name) {
      var found = null;
      this.getStylings().some(function(styling) {
        if (styling.getName() === name) {
          found = styling;
          return true;
        }
      });
      return found;
    },

    /**
     * Find mapping by name
     *
     * @param name {String} name of the mapping
     * @returns {cv.config.meta.Mapping|null}
     */
    getMappingByName : function(name) {
      var found = null;
      this.getMappings().some(function(mapping) {
        if (mapping.getName() === name) {
          found = mapping;
          return true;
        }
      });
      return found;
    },
    
    //property apply
    _applyDesign : function(value) {
      cv.Utils.configurator.setDesign(value);
    },
    
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
    
    
    // overridden
    _createChildControlImpl : function(id) {
      var control = null;
      switch(id) {
        // main page parts
        case "header":
          control = new qx.ui.container.Composite();
          control.getContentElement().setAttribute("id", "top");
          control.setLayout(new qx.ui.layout.VBox());        
          control.addAt(new qx.ui.core.Widget().set({
            appearance : "line"
          }), 2);
          this._add(control, {edge:"north", width: "100%"});
          break;
          
        case "navbar-left":
          control = new cv.ui.parts.Navbar("left");
          control.getContentElement().setAttribute("id", "navbarLeft");
          control.exclude();
          this._add(control, {edge:"west"});
          break;
        
        case "main": 
          control = new qx.ui.container.Scroll(control);
          control.getContentElement().setAttribute("id", "centerContainer"); 
          this._add(control, {edge: "center", width: "100%", height: "100%"});
          break;
        
        case "navbar-right":
          control = new cv.ui.parts.Navbar("right");
          control.getContentElement().setAttribute("id", "navbarRight");
          control.exclude();
          this._add(control, {edge:"east"});
          break;
          
        case "footer":
          control = new qx.ui.container.Composite();
          control.getContentElement().setAttribute("id", "bottom");
          control.setLayout(new qx.ui.layout.VBox());
          control.add(new qx.ui.core.Widget().set({
            appearance : "line"
          }));
          this._add(control,{edge:"south", width: "100%"});
          break;
        
        
        // header content
        case "breadcrumb":
          control = new cv.ui.parts.Breadcrumbs();
          control.getContentElement().addClass("nav_path");
          this.getChildControl("header").addAt(control, 0);
          break;
          
        case "navbar-top":
          control = new cv.ui.parts.Navbar("top");
          control.getContentElement().setAttribute("id", "navbarTop");
          control.exclude();
          this.getChildControl("header").addAt(control, 1);
          break;
        
        //footer content
        case "status-bar": 
          control = new cv.ui.parts.Statusbar();
          control.getContentElement().addClass("footer");
          control.exclude();
          this.getChildControl("footer").add(control);
          break;
          
        case "navbar-bottom":
          control = new cv.ui.parts.Navbar("bottom");
          control.getContentElement().setAttribute("id", "navbarBottom");
          control.exclude();
          this.getChildControl("footer").add(control);
          break;
       
        // main content 
        case "page-handler":
          control = new cv.ui.PageHandler();
          control.getContentElement().setAttribute("id", "pages");
          this.getChildControl("main").add(control);

          //reset scroll position when page changes
          control.addListener("changeSelection", function() {
            this.getChildControl("main").scrollToY(0);
          }, this);
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

            if (qx.core.Environment.get("qx.aspects") === true) {
              qx.dev.Profile.stop();
              qx.dev.Profile.start();
            }
            this._parser.parseMeta(xml);
            this._parser.parsePages(xml);
            if (qx.core.Environment.get("qx.aspects") === true) {
              qx.dev.Profile.stop();
              qx.dev.Profile.showResults(50);
            }
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
      var client = cv.client.Cometvisu.getInstance();
      client.init(this.getBackendName());
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

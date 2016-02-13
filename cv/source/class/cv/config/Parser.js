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
 *
 */
qx.Class.define("cv.config.Parser",
{
  extend : qx.core.Object,

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  construct : function() {
    this.base(arguments);
    this._engine = cv.ui.Templateengine.getInstance();
  },
  
    /*
   *****************************************************************************
      EVENTS
   *****************************************************************************
   */
  events : {
    domloaded : "qx.event.type.Event",
    loaded : "qx.event.type.Event"
  },

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    _engine : null,
    
    /**
     * Parse meta part of the config (plugins, mappings, stylings, statusbar, ...)
     */
    parseMeta : function(xml) {
      var pagesNode = qx.xml.Element.selectSingleNode(xml, "pages");
      
      var propertyNameMapping = {
          max_mobile_screen_width : "maxMobileScreenWidth",
          lib_version : "libVersion"
      };
      
      var pageAttributes = {};
      var attr = pagesNode.attributes;
      for (var i=attr.length-1; i >= 0; i--) {
        if (attr[i].name === "xmlns:xsi" || attr[i].name === "xsi:noNamespaceSchemaLocation") {
          continue;
        }
        var name = qx.lang.String.camelCase(attr[i].name.replace(/_/g, "-"));
        if (propertyNameMapping.hasOwnProperty(name)) {
          name = propertyNameMapping[name];
        }
        pageAttributes[name] = attr[i].value === "true" ? true : attr[i].value === "false" ? false : attr[i].value;
      }
      
      if (!pageAttributes.enableColumnAdjustment && /(android|blackberry|iphone|ipod|series60|symbian|windows ce|palm)/i.test(navigator.userAgent.toLowerCase())) {
        pageAttributes.enableColumnAdjustment = true;
      }
      
      // design by url
      if (cv.Config.clientDesign) {
        pageAttributes.design = cv.Config.clientDesign;
      }
      // selection dialog
      else if (!pageAttributes.design) {
        var dialog = new cv.ui.dialog.DesignSelector(qx.locale.Manager.tr("Please select a design"));
        dialog.addListener("designSelected", function(e) {
          pageAttributes.design = e.getData();
        }, this);
        dialog.open();
      }
      
      // apply all pages-settings to the templateengine properties
      this._engine.set(pageAttributes);
      
      // init backend
      this._engine.initBackendClient();

//      var getCSSlist = [ 'css!designs/designglobals.css'];
//      if (this._engine.clientDesign) {
//        getCSSlist.push( 'css!designs/' + this._engine.clientDesign + '/basic.css' );
//        if (!this._engine.forceNonMobile) {
//          getCSSlist.push( 'css!designs/' + this._engine.clientDesign + '/mobile.css' );
//        }
//        getCSSlist.push( 'css!designs/' + this._engine.clientDesign + '/custom.css' );
//        getCSSlist.push( 'designs/' + this._engine.clientDesign + '/design_setup' );
//      }
      
      
      //require( getCSSlist, delaySetup('design') );

      // start with the plugins
      var pluginsToLoad = new qx.data.Array();
      qx.xml.Element.selectNodes(xml, '//meta/plugins/plugin').forEach(function(node) {
        var name = node.getAttribute('name');
        if (name) {
          if (!pluginsToLoad.contains("plugin-"+name)) {
            pluginsToLoad.push( "plugin-"+name );
          }
        }
      });
      /*
      if (0 == pluginsToLoadCount) {
        delete loadReady.plugins;
      }
      */
      cv.PluginHandler.loadPlugins(pluginsToLoad);
      
      // then the icons
      qx.xml.Element.selectNodes(xml, '//meta/icons/icon-definition').forEach(function(node) {
        this._engine.getIconHandler().insert(
          node.hasAttribute('name')    ? node.getAttribute('name')    : undefined,
			    node.hasAttribute('type')    ? node.getAttribute('type')    : undefined,
			    node.hasAttribute('flavour') ? node.getAttribute('flavour') : undefined,
			    node.hasAttribute('color')   ? node.getAttribute('color')   : undefined,
			    node.hasAttribute('styling') ? node.getAttribute('styling') : undefined,
			    node.hasAttribute('class')   ? node.getAttribute('class')   : undefined,
			    node.hasAttribute('dynamic') ? node.getAttribute('dynamic') : undefined
        );
      }, this);

      // then the mappings
      qx.xml.Element.selectNodes(xml, '//meta/mappings/mapping').forEach(function(node) {
        this._engine.addMapping(new cv.config.meta.Mapping(node));
      }, this);

      // then the stylings
      qx.xml.Element.selectNodes(xml, '//meta/stylings/styling').forEach(function(node) {
        this._engine.addStyling(new cv.config.meta.Styling(node));
      }, this);

      // then the status bar
      qx.xml.Element.selectNodes(xml, '//meta/statusbar/status').forEach(function(node) {
        //var type = node.getAttribute('type');
        var condition = node.getAttribute('condition');
        var extend = node.getAttribute('hrefextend');
        var sPath = window.location.pathname;
        var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

        // @TODO: make this match once the new editor is finished-ish.
        var editMode = 'edit_config.html' == sPage;

        // skip this element if it's edit-only and we are non-edit, or the other
        // way
        // round
        if (editMode && '!edit' == condition) {
          return;
        }
        if (!editMode && 'edit' == condition) {
          return;
        }
        var text = node.textContent;
        var search;
        switch (extend) {
        case 'all': // append all parameters
          search = window.location.search.replace(/\$/g, '$$$$');
          text = text.replace(/(href="[^"]*)(")/g, '$1' + search + '$2');
          break;
        case 'config': // append config file info
          search = window.location.search.replace(/\$/g, '$$$$');
          search = search.replace(/.*(config=[^&]*).*|.*/, '$1');

          var middle = text.replace(/.*href="([^"]*)".*/g, '{$1}');
          if( 0 < middle.indexOf('?') ) {
            search = '&' + search;
          }
          else {
            search = '?' + search;
          }
          text = text.replace(/(href="[^"]*)(")/g, '$1' + search + '$2');
          break;
        }
        this._engine.getChildControl("status-bar").appendContent(text);
      }, this);

      //delete loadReady.page;
      //this._engine.setupPage();
    },
    
    
    /**
     * Parse pages part of the config
     */
    parsePages : function(xml) {
      var page = qx.xml.Element.selectSingleNode(xml, "//pages/page"); // only one page element allowed...
      
      this.createPages(page, 'id');
      //this._engine.design.getCreator('page').createFinal();
      
      this.fireEvent("domloaded");
      
      var startpage = 'id_';
      if (cv.Config.startPage) {
        startpage = cv.Config.startPage;
        
        if ('remember' === startpage) {
          startpage = qx.module.Storage.getLocalItem('lastpage');
          cv.Config.rememberLastPage = true;
          if ('string' !== typeof (startpage ) || 'id_' !== startpage.substr(0, 3)) {
            startpage = 'id_'; // fix obvious wrong data
          }
        } else if ('noremember' === startpage) {
          qx.module.Storage.removeLocalItem('lastpage');
          startpage = 'id_';
          cv.Config.rememberLastPage = false;
        }
      }

      this._engine.getChildControl("page-handler").setCurrentPage(startpage);
      
      // this._engine.adjustColumns();
      // this._engine.applyColumnWidths();
      
      // setup the scrollable
      // this._engine.main_scroll = $('#main').scrollable({
        // keyboard : false,
        // touch : false
      // }).data('scrollable');
      // this._engine.main_scroll.onSeek( function(){
        // this._engine.pagePartsHandler.updateTopNavigation( this );
        // $('.activePage', '#pages').removeClass('activePage');
        // $('.pageActive', '#pages').removeClass('pageActive');
        // this._engine.currentPage.addClass('pageActive activePage');// show new page
        // $('#pages').css('left', 0 );
      // });
      // if (this._engine.scrollSpeed != undefined) {
        // this._engine.main_scroll.getConf().speed = this._engine.scrollSpeed;
      // }
  
      // $('.fast').bind('click', function() {
        // this._engine.main_scroll.seekTo($(this).text());
      // });
  
      // run the Trick-O-Matic scripts for great SVG backdrops
      //$('embed').each(function() { this.onload =  Trick_O_Matic });
      
      // if (cv.Config.enableAddressQueue) {
        // // identify addresses on startpage
        // var startPageAddresses = {};
        // $('.actor','#'+startpage).each(function() {
          // var $this = $(this),
            // data  = $this.data();
          // if( undefined === data.address ) data = $this.parent().data();
            // for( var addr in data.address )
            // {
              // startPageAddresses[addr.substring(1)]=1;
            // }
        // });
        // this._engine.visu.setInitialAddresses(Object.keys(startPageAddresses));
      // }
      var addressesToSubscribe = cv.Model.getInstance().getAddresses();
      if( 0 !== addressesToSubscribe.length ) {
        cv.client.Cometvisu.getInstance().subscribe(addressesToSubscribe);
      }
      xml = null; // not needed anymore - free the space
            
      this.fireEvent("loaded");
    },
    
    /**
     * Create a page from DOM page element
     * 
     * @param page {Element} page element in config DOM
     * @param path {String} internal path to this page
     * @param flavour {String} Flavour of the page
     * @param type {String} type of the page
     */
    createPages : function(page, path, flavour, type) {
      // create root page
      cv.ui.structure.Factory.createWidget(page, path, true);
    }
  },
  
  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */
  destruct : function() {
    this._engine = null;
  }
});

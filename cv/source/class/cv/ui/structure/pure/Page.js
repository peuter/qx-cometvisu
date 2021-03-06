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


//noinspection JSUnusedGlobalSymbols
/**
 * Page widget
 */
qx.Class.define("cv.ui.structure.pure.Page",
{
  extend : cv.ui.structure.pure.BaseWidgetContainer,
  
  include : [
    cv.mixin.Align,
    cv.mixin.Flavour
  ],

  /*
   *****************************************************************************
   CONSTRUCTOR
   *****************************************************************************
   */
  construct : function(node, path, root, parent) {
    this._visibilityProperties = new qx.data.Array();
    this._visibilityProperties.append(["showtopnavigation", "showfooter", "shownavbarLeft", "shownavbarRight", "shownavbarTop", "shownavbarBottom"]);

    this.base(arguments,node, path, root, parent);
  },
   
  /*
   *****************************************************************************
      STATICS
   *****************************************************************************
   */
  statics : {
     /**
      * Map config attributes to properties in case of name conflicts
      */
     propertyMapping : {
       visible : "showPagejump"
     } 
  },
  
  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {

    appearance : {
      init : "page",
      refine : true
    },
    
    /**
     * The page name
     */
    name : {
      check : "String",
      init : null,
      apply : "_applyName",
      event : "changeName"
    },
    ga : {},
    
    /**
     * @var {Boolean} If true the page should be 'visible' in the parent page by showing a pagejump button
     */
    showPagejump : {
      check : "Boolean",
      init : true,
      transform : "stringToBool"
    },
    type : {
      check : ["text", "2d", "3d"],
      init : "text"
    },
    size : {
      check : ["fixed", "scaled"],
      init : "fixed",
      event : "changeSize"
    },

    /**
     * Background image for page
     */
    backdrop : {
      check : "String",
      nullable : true,
      apply : "_applyBackdrop",
      event : "changeBackdrop"
    },

    showtopnavigation : {
      check : "Boolean",
      transform : "stringToBool",
      init : true,
      event : "changeShowtopnavigation"
    },
    showfooter : {
      check : "Boolean",
      transform : "stringToBool",
      init : true,
      event : "changeShowfooter"
    },
    shownavbarTop : {
      check : "Boolean",
      transform : "stringToBool",
      init : true,
      event : "changeShownavbarTop"
    },
    shownavbarBottom : {
      check : "Boolean",
      transform : "stringToBool",
      init : true,
      event : "changeShownavbarBottom"
    },
    shownavbarLeft : {
      check : "Boolean",
      transform : "stringToBool",
      init : true,
      event : "changeShownavbarLeft"
    },
    shownavbarRight : {
      check : "Boolean",
      transform : "stringToBool",
      init : true,
      event : "changeShownavbarRight"
    },
    shownavbar : {
      group : ["shownavbarTop", "shownavbarRight", "shownavbarBottom", "shownavbarLeft"],
      mode : "shorthand"
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    _queuedNode : null,
    /**
     * Array of properties that define the visibility of elements outside this page (e.g. header, footer, navbars)
     */
    _visibilityProperties : null,

    /**
     * Publig getter for the protected variable _visibilityProperties
     * @returns {qx.data.Array}
     */
    getVisibilityProperties : function() {
      return this._visibilityProperties;
    },

    //overridden
    _initLayout : function() {
      if (this.getType() === "text") {
        this.base(arguments);
      } else {
        this._setLayout(new qx.ui.layout.Canvas());
      }
    },

    _applyBackdrop : function(value) {
      if (this.getParsingState() === "done") {
        if (value) {
          this.getChildControl("backdrop").show();
        } else {
          this.getChildControl("backdrop").exclude();
        }
      }
    },
    
    /**
     * Parse only the page children of this page, queue the rest until this page gets visible
     */
    _mapChildPages : function(node) {
      if (node.nodeName !== "page") {
        return;
      }
      var i;
      var children = node.children;
      for(i=0; i < children.length; i++) {
        var childNode = children[i];
        if (childNode.nodeName !== "page") {
          continue;
        }
        // create instance
        var childPage = cv.ui.structure.Factory.createWidget(childNode, this.getPath()+"_"+i, false, this);
        
        // add to childPages if available
        if (qx.Class.hasMixin(this.constructor, cv.mixin.MPages)) {
          this.addChildPage(childPage);
        }
      }
      // parse address elements and generate the items
      var addresses = node.querySelectorAll("address");
      for (i=0; i < addresses.length; i++) {
        cv.Model.getInstance().getItemByAddress(addresses[i].textContent);
      }
    },
    
    //overridden
    map : function(node) {
      if (qx.core.Environment.get("qx.debug")) {
        qx.core.Assert.assertNotNull(node, "node must not be null");
      }
      
      // always set the data-type
      this.setDataType(node.nodeName);  
      cv.ui.Templateengine.getInstance().getChildControl("page-handler").add(this);
      this._currentPage = this;
            
      var props = this._mapProperties(node);
      this._mapChildPages(node);

      // inherit some property values from parent page if not set
      if (this.getParentPage()) {
        this._visibilityProperties.forEach(function(prop) {
          if (!props.hasOwnProperty(prop)) {
            this.getParentPage().bind(prop, this, prop);
          }
        }, this);
      }

      var bounds = this.getBounds();
      if (this.isRoot() || bounds) {
        // page is visible or root page -> proceed with parsing
        this.debug("proceeding with parsing");
        this._mapChildren(node);
        this.setParsingState("done");
         this._queuedNode = null;
      } else {
        this.setParsingState("queued");
        this._queuedNode = node;
        this.debug("parsing has been delayed");
      }
    },
    
    /**
     * Called when page is entered
     */
    enterPage : function() {
      if (this.getParsingState() === "queued") {
        this.debug("parsing queued page "+this._queuedNode.getAttribute("name"));
        this._mapChildren(this._queuedNode);
        this.setParsingState("done");

        if (this.getBackdrop()) {
          this.getChildControl("backdrop").show();
        } else if (this.hasChildControl("backdrop")) {
          this.getChildControl("backdrop").exclude();
        }
      }
    },
    
    /**
     * Called when page is left
     */
    leavePage : function() {
      
    },

    //overridden
    getAlignWidget : function() {
      return this.getChildControl("title");
    },
    
    //property apply
    _applyName : function(value) {
      var control = this.getChildControl("title");
      if (value.length > 0){
        control.setLabel(value);
        control.show();
      } else {
        control.exclude();
      }
    },
    
    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "title":
          control = new cv.ui.basic.Atom().set({
            rich : true, // allow HTML content
            wrap : true // allow line wrapping
          });
          control.setAppearance("page-title");
          control.getChildControl("label").getContentElement().setNodeName("h1");
          this._add(control, {colSpan:12});
          break;

        case "backdrop":
          control = new qx.ui.basic.Image();
          this.bind("backdrop", control, "source");
          this.bind("size", control, "scale", {
            converter : function(data, source, target) {
              if (data === "scaled") {
                target.set({
                  allowGrowX : true,
                  allowGrowY : true
                });
                return true;
              } else {
                target.set({
                  allowGrowX : false,
                  allowGrowY : false
                });
                return false;
              }
            }
          });
          switch (this.getAlign()) {

            case "center":
              this._add(control, {edge: 0});
              break;

            case "right":
              this._add(control, {top: 0, right: 0});
              break;

           default: // default is left
              this._add(control, {top: 0, left: 0});
              break;
          }
          break;
      }

      return control || this.base(arguments, id);
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

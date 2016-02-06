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

/**
 * 
 *
 */
qx.Class.define("cv.ui.structure.pure.Base",
{
  extend : qx.ui.core.Widget,
  implement : cv.ui.structure.IWidget,
  include : [
    cv.util.MTransform,
    cv.mixin.Layout
  ],
  type : "abstract",

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  construct : function(node, path, root) {
    this.base(arguments);
    this.setRoot(!!root);
    this._initLayout();
    
    this.setPath(path);
    
    // add default CSS class
    this.getContentElement().addClass("widget_container");
    
    this.map(node);
    
    this._draw();
  },

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    appearance : {
      init : "cv-widget",
      refine : true
    },

    /**
     * Parsing state of this page
     */
    parsingState : {
      check : ["new","queued","done"],
      init : "new",
      event : "changeParsingState"
    },
    
    /**
     * Flag for the root page (note: only one page can be root)
     */
    root : {
      check : "Boolean",
      init : false
    },
    
    path : {
      check : "String",
      init : "id_"
    },
    
    rowspanClass : { 
      check : "String", 
      init : "",
      apply : "_applyClass"
    },
    colspanClass : { 
      check : "String", 
      init : "",
      apply : "_applyClass"
    },
    containerClass : { 
      check : "String", 
      init : "",
      apply : "_applyClass"
    },
    dataType : { 
      check : "String", 
      init : "",
      apply : "_applyDataType"
    },
    id : { check : "String", init : ""},
    
    /**
     * Text content of this item
     */
    text : {
      check : "String",
      init : null,
      apply : "_applyText"
    },
    
     /**
     * The parent page this page belongs to
     */
    parentPage : {
      check : "cv.ui.structure.pure.Page",
      nullable : true
    },
    
    parentNavbar : {
      check : "cv.ui.structure.pure.Navbar",
      nullable : true,
      apply : "_applyNavbar"
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    _currentPage : null, // used during parsing of xml structure to remember the current page
    
    _forwardStates : {
      navbarLeft : true,
      navbarRight : true,
      navbarTop : true,
      navbarBottom : true
    },
    
    _initLayout : function() {
      this._setLayout(new qx.ui.layout.HBox());
    },
    
    //property apply
    _applyText : function(value) {
      this.getChildControl("main").setValue(value);
    },
    
    //property apply
    _applyNavbar : function(value, old) {
      if (value) {
        this.addState("navbar"+qx.lang.String.firstUp(value.getPosition()));
      } else if (old) {
        this.removeState("navbar"+qx.lang.String.firstUp(old.getPosition()));        
      }
    },
    
    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "main":
          control = new qx.ui.basic.Label();
          this._add(control);
          break;
          
        case "label":
          control = new cv.ui.basic.Atom().set({
            rich : true, // allow HTML conten
            wrap : true // allow line wrapping
          });
          control.getContentElement().addClass("label");
          this._add(control);
          break;
      }

      return control || this.base(arguments, id);
    },
    
    /**
     * Returns the container where children should be added to
     */
    getChildrenContainer : function() {
      return this;
    },
    
    /**
     * returns the layout options which should be applied when this item gets added to its parent
     * 
     * @returns {Object|null}
     */
    getLayoutOptions : function(map) {
      if (this.getAlign) {
        if (map && !map.alignX) {
          map.alignX = this.getAlign();
        }
      }
      return map; 
     },
    
    /**
     * Sometimes we have to transform the property values before applying them
     * e.g. width/heights in CometVisu's config are defined including px or pt like 200px
     * but the Qooxdoo widgets width property only accepts numbers
     */
    _transformIncomingValue : function(name,value) {
      switch (name) {
        case "width":
        case "height":
          return this.cssSizeToNumber(value);
        break;
      }
      return value;
    },
    
    /**
     * Map node attributes to available properties
     * 
     * @param node {Element} node to parse
     */
    _mapProperties : function(node) {
      // map attributes to properties
      var props = {};
      for (var i=0; i < node.attributes.length; i++) {
          var attr = node.attributes[i];
          var name = qx.lang.String.camelCase(attr.name.replace(/_/g, "-"));
          if (self.hasOwnProperty("propertyMapping") && self.propertyMapping.hasOwnProperty("name")) {
            name = self.propertyMapping[name];
            // this.debug("map "+attr.name+" to "+name+" for "+node.nodeName);
          }
          if (qx.Class.hasProperty(this.constructor, name)) {
            props[name] = this._transformIncomingValue(name, attr.value);
          } else {
            this.error("class "+this.classname+" has no property named "+name);
          }
      }
      this.set(props);
    },
    
    /**
     * Parse children of this node
     * 
     * @param node {Element} node to parse
     */
    _mapChildren : function(node) {
      // match children
      var children = node.children;
      for(var i=0; i < children.length; i++) {
        var childNode = children[i];
        
        // check if this classe has a mixin that can parse the childNode
        var mixin = qx.Mixin.getByName("cv.mixin."+qx.lang.String.firstUp(childNode.nodeName));
        if (mixin && qx.Class.hasMixin(this.constructor, mixin)) {
          // parse this node with the appropiate method
          // this.debug("calling "+node.nodeName+"._parse"+qx.lang.String.firstUp(childNode.nodeName));
          this["_parse"+qx.lang.String.firstUp(childNode.nodeName)](childNode, childNode.nodeName);
          // this.debug(this);
          // childNode has been parsed by mixin -> we can jump to the next chilt
          continue;
        } else if (mixin) {
          this.debug(this.constructor+ " has no mixin "+mixin);
        }
        
        // create instance
        var childWidget = cv.ui.structure.Factory.createWidget(childNode, this.getPath()+"_"+i);
        
        
        if (childWidget instanceof qx.ui.core.Widget) {
          //this.getChildren().push(childWidget);
                      
          // parse layout child if available as it is needed before the widget is added
          if (childNode.getElementsByTagName("layout").length === 1) {
            childWidget._parseLayout(childNode.getElementsByTagName("layout")[0]);
          }
          
          // tell the widget on which page it is set
          childWidget.setParentPage(this._currentPage);
          
          // special handling for some data-types
          if (childWidget.getDataType() === "navbar") {
            // add navbar widgets to according navbars
            var bar = cv.ui.Templateengine.getInstance().getChildControl("navbar-"+childWidget.getPosition());
            if (bar) {
              bar.addWidget(childWidget);
            }
          } else if (childWidget.getDataType() !== "page") {
            // all widgets that are no pages or navbars
            
            if (this.getDataType() === "navbar") {
              // adding child to navbar -> tell the child to which navbar it has been added
              childWidget.setParentNavbar(this);
            }
            try {
              this._add(childWidget, childWidget.getLayoutOptions());
            } catch (ex) {
              // omit layout properties
              this._add(childWidget);
            }
          } else {
            // handle pages
            
            // add to childPages if available
            if (qx.Class.hasMixin(this.constructor, cv.mixin.MPages)) {
              this.addChildPage(childWidget);
            }
            
            if (childWidget.isShowPageJump()) {
              // only add a button that links to this page
              var button = new qx.ui.basic.Label(childWidget.getName());
              button.setAppearance("link");
              button.getContentElement().addClass("link");
              this._add(button);
              button.addListener("tap", function() {
                cv.ui.Templateengine.getInstance().getChildControl("page-handler").setCurrentPage(this);
              }, childWidget);
            }
          }
        }
        
        // bind flavour property to children
        if (qx.Class.hasMixin(this.constructor, cv.mixin.Flavour) && qx.Class.hasMixin(childWidget.constructor, cv.mixin.Flavour)) { 
          this.bind("flavour", childWidget, "flavour");
        }
      }
    },
    
    /**
     * Parse the configuration setting for this element
     * 
     * @param node {Element} node to parse
     */
    map : function(node) {
      this.setDataType(node.nodeName);  
      if (this.getDataType() === "page") {
        cv.ui.Templateengine.getInstance().getChildControl("page-handler").add(this);
        this._currentPage = this;
      }
      if (qx.core.Environment.get("qx.debug")) {
        qx.core.Assert.assertNotNull(node, "node must not be null");
      }
      
      this._mapProperties(node);
      this._mapChildren(node);

      this.setParsingState("done");
    },
    
    
    /**
     * Main function to generate the DOM structure, must be overridden by subclasses
     * 
     * @abstract
     */
    _draw : function() {},
    
    /**
     * Basic creation function must be overriden by subclasses
     */
    create: function( page, path, flavour, type ) {
      
    },
    
    //property apply
    _applyDataType : function(value, old) {
      // special case for break widget
      if (old === "break") {
        this.getContentElement().removeClass("break_container");
      }
      if (value === "break") {
        this.getContentElement().addClass("break_container");
      }
    },
    
    //property apply
    _applyClass : function(value, old) {
      if (old) {
        this.getContentElement().removeClass(old);
      }
      if (value) {
        this.getContentElement().addClass(value);
      }
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

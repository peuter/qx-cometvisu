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
  construct : function(node, path) {
    this.base(arguments);
    
    this._initLayout();
    
    // init properties
    this.setChildren(new qx.data.Array());
    
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
    
    children : {
      check : "qx.data.Array",
      init : null
    },
    
    /**
     * Text content of this item
     */
    text : {
      check : "String",
      init : null,
      apply : "_applyText"
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    _initLayout : function() {
      this._setLayout(new qx.ui.layout.HBox());
    },
    
    _applyText : function(value) {
      this.getChildControl("main").setValue(value);
    },
    
    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "main":
          control = qx.ui.basic.Label();
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
    getLayoutOptions : function() { 
       return null; 
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
          return parseInt(value);
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
          if (qx.Class.hasProperty(this.constructor, attr.name)) {
            props[attr.name] = this._transformIncomingValue(attr.name, attr.value);
          } else {
            this.error("class "+this.classname+" has no property named "+attr.name);
          }
      }
      this.set(props);
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
      }
      if (qx.core.Environment.get("qx.debug")) {
        qx.core.Assert.assertNotNull(node, "node must not be null");
      }
      
      this._mapProperties(node);
      
      // match children
      var children = node.children;
      for(var i=0; i < children.length; i++) {
        var childNode = children[i];
        
        if (childNode.nodeName !== "layout" || this.getLayout() === null) {
          var mixin = qx.Mixin.getByName("cv.mixin."+qx.lang.String.firstUp(childNode.nodeName));
          
          if (mixin && qx.Class.hasMixin(this.constructor, mixin)) {
            // parse this node with the appropiate method
            console.log("calling "+node.nodeName+"._parse"+qx.lang.String.firstUp(childNode.nodeName));
            this["_parse"+qx.lang.String.firstUp(childNode.nodeName)](childNode, childNode.nodeName);
            console.log(this);
            continue;
          } else if (mixin) {
            console.log(this.constructor+ " has no mixin "+mixin);
          }
        }
        
        // create instance
        var childWidget = cv.ui.structure.Factory.createWidget(childNode, this.getPath()+"_"+i);
        this.getChildren().push(childWidget);
        
        if (childWidget instanceof qx.ui.core.Widget) {
          if (childWidget.getDataType() === "navbar") {
            // add navbar widgets to according navbars
            var bar = cv.ui.Templateengine.getInstance().getChildControl("navbar-"+childWidget.getPosition());
            if (bar) {
              bar.addWidget(childWidget);
            }
          }
          console.log(node);
          console.log(childNode);
          console.log(childNode.getElementsByTagName("layout"));
          // parse layout child if available as it is needed before the widget is added
          if (childNode.getElementsByTagName("layout").length === 1) {
            childWidget._parseLayout(childNode.getElementsByTagName("layout")[0]);
          }
          if (childWidget.getDataType() !== "page") {
            this._add(childWidget, childWidget.getLayoutOptions());
          } else if (childWidget.isVisible()) {
            // only add a button that links to this page
            var button = new qx.ui.form.Button(childWidget.getName());
            this._add(button);
            button.addListener("execute", function() {
              cv.ui.Templateengine.getInstance().getChildControl("page-handler").setCurrentPage(childWidget);
            }, this);
          }
        }
        
        // bind flavour property to children
        if (qx.Class.hasMixin(this.constructor, cv.mixin.Flavour) && qx.Class.hasMixin(childWidget.constructor, cv.mixin.Flavour)) { 
          this.bind("flavour", childWidget, "flavour");
        }
      }
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

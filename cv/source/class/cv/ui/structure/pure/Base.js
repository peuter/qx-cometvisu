/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * 
 *
 */
qx.Class.define("cv.ui.structure.pure.Base",
{
  extend : qx.ui.core.Widget,
  implement : cv.ui.structure.IWidget,
  include : [
    cv.util.MTransform
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
      this._setLayout(new qx.ui.layout.HBox);
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
     * Parse the configuration setting for this element
     * 
     */
    map : function(node) {
      this.setDataType(node.nodeName);  
      if (this.getDataType() === "page") {
        cv.ui.Templateengine.getInstance().getChildControl("page-handler").add(this);
      }
      if (qx.core.Environment.get("qx.debug")) {
        qx.core.Assert.assertNotNull(node, "node must not be null");
      }
      
      var i=0;
      // map attributes to properties
      var props = {};
      for (i=0; i < node.attributes.length; i++) {
          var attr = node.attributes[i];
          if (qx.Class.hasProperty(this.constructor, attr.name)) {
            props[attr.name] = this._transformIncomingValue(attr.name, attr.value);
          } else {
            this.error("class "+this.classname+" has no property named "+attr.name);
          }
      }
      this.set(props);
      
      // match children
      var children = node.children;
      for(i=0; i < children.length; i++) {
        var childNode = children[i];
        
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
          if (childWidget.getDataType() !== "page") {
            this._add(childWidget, childWidget.getLayoutOptions());
          } else if (childWidget.isVisible()) {
            // only add a button that links to this page
            var button = new qx.ui.basic.Atom(childWidget.getName());
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

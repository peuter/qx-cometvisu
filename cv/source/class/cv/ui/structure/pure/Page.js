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


//noinspection JSUnusedGlobalSymbols
/**
 * Page widget
 */
qx.Class.define("cv.ui.structure.pure.Page",
{
  extend : cv.ui.structure.pure.Base,
  
  include : [
    cv.mixin.Layout,
    cv.mixin.Align,
    cv.mixin.Flavour,
    cv.mixin.MPages
  ],
   
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
    
    /**
     * Parsing state of this page
     */
    parsingState : {
      check : ["new","queued","done"],
      init : "new",
      event : "changeParsingState"
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
    showPageJump : {
      check : "Boolean",
      init : true,
      transform : "cv.util.Transform.stringToBool"
    },
    type : {
      check : ["text", "2d", "3d"],
      init : "text"
    },
    size : {
      check : ["fixed", "scaled"]
    },
    backdrop : {
      check : "String"
    },
    showtopnavigation : {
      check : "Boolean",
      transform : "cv.util.Transform.stringToBool",
      init : true
    },
    showfooter : {
      check : "Boolean",
      transform : "cv.util.Transform.stringToBool",
      init : true
    },
    shownavbarTop : {
      check : "Boolean",
      transform : "cv.util.Transform.stringToBool",
      init : true
    },
    shownavbarBottom : {
      check : "Boolean",
      transform : "cv.util.Transform.stringToBool",
      init : true
    },
    shownavbarLeft : {
      check : "Boolean",
      transform : "cv.util.Transform.stringToBool",
      init : true
    },
    shownavbarRight : {
      check : "Boolean",
      transform : "cv.util.Transform.stringToBool",
      init : true
    },
    shownavbar : {
      group : ["shownavbarTop", "shownavbarRight", "shownavbarBottom", "shownavbarLeft"],
      mode : "shorthand"
    },
    
    columnSize : {
      check : "Number",
      init : 0,
      apply : "_applyColumnSize"
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    _gridPosition : null,
    _columns : 12,
    _queuedNode : null,
    
    /**
     * Parse only the page children of this page, queue the rest until this page gets visible
     */
    _mapChildPages : function(node) {
      if (node.nodeName !== "page") {
        return;
      }
      var children = node.children;
      for(var i=0; i < children.length; i++) {
        var childNode = children[i];
        if (childNode.nodeName !== "page") {
          continue;
        }
        // create instance
        var childPage = cv.ui.structure.Factory.createWidget(childNode, this.getPath()+"_"+i);
        
        // tell the widget on which page it is set
        childPage.setParentPage(this._currentPage);
        
        // add to childPages if available
        if (qx.Class.hasMixin(this.constructor, cv.mixin.MPages)) {
          this.addChildPage(childPage);
        }
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
            
      this._mapProperties(node);
      this._mapChildPages(node);
      
      var bounds = this.getBounds();
      if (this.isRoot() || bounds) {
        // page is visible or root page -> proceed with parsing
        this.debug("proceeding with parsing");
        this._mapChildren(node);
        this.setParsingState("done");
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
        this._mapChildren(this._queuedNode);
        this.setParsingState("done");     
      }
    },
    
    /**
     * Called when page is left
     */
    leavePage : function() {
      
    },
    
    //overridden
    _draw : function() {
      this._initColumnWidths();
    },
    
    _initColumnWidths : function() {
      this.addListener("resize", function(e) {
        this.setColumnSize(Math.round(e.getData().width/this._columns));
      }, this);
      
      var bounds = this.getBounds();
      if (!bounds) {
        this.addListenerOnce("appear", function() {
          this._initColumnWidths();
        }, this);
        return;
      }
      this.setColumnSize(Math.round(bounds.width/this._columns));
    },
    
    _applyColumnSize : function(value) {
      if (this.getParsingState() === "done") {
        var layout = this._getLayout();
        for (var i = 0; i < this._columns; i++) {
          layout.setColumnMaxWidth(i, value);
        }
      }
    },
        
    /**
     * Calculate layout properties for {qx.ui.layout.Grid} layout
     * 
     * @private
     */
   __getGridLayoutProperties : function(widget, layoutProperties) {
     if (this._gridPosition === null) {
       this._gridPosition = {row : 0, column : 0};
       var layout = this._getLayout();
       var width = this.getColumnSize();

       for(var i=0; i < this._columns; i++) {
         layout.setColumnFlex(i, 1);
         layout.setColumnMaxWidth(i, width);
       }
     } else if (widget instanceof cv.ui.structure.pure.Break || (layoutProperties && layoutProperties.newLine && layoutProperties.newLine === true)) {
       this._gridPosition.row++;
       this._gridPosition.column = 0;

       if (widget instanceof cv.ui.structure.pure.Break) {
         // do not add this widget
         return null;
       }
     }
     
      // calculate rowspan/cospan
     var colspan = 6;
     if (layoutProperties && layoutProperties.colSpan) {
       colspan = layoutProperties.colSpan;
     } else if (qx.Class.hasMixin(widget.constructor, cv.mixin.Layout) && widget.getLayout()) {
       colspan =  widget.getLayout().getColspan();
     }
     var rowspan = 1;
     if (layoutProperties && layoutProperties.rowSpan) {
       rowspan = layoutProperties.rowSpan;
     } else if (qx.Class.hasMixin(widget.constructor, cv.mixin.Layout) && widget.getLayout()) {
       rowspan = widget.getLayout().getRowspan();
     }
     
     // find free column
     var cellWidget = this._getLayout().getCellWidget(this._gridPosition.row, this._gridPosition.column);
     while (cellWidget !== null) {
       this._gridPosition.column++;
       if (this._gridPosition.column+colspan > this._columns) {
         this._gridPosition.row++;
         this._gridPosition.column = 0;
       }
       cellWidget = this._getLayout().getCellWidget(this._gridPosition.row, this._gridPosition.column);
     }
     var layoutProps = {
       row : this._gridPosition.row,
       column : this._gridPosition.column,
       colSpan : colspan,
       rowSpan : rowspan
     };
     
     // console.log(layoutProps);
     
     this._gridPosition.column += colspan;
     // update grid position
     if (this._gridPosition.column >= this._columns-1) {
       // end of row
       this._gridPosition.row++;
       this._gridPosition.column = 0;
     }
     
     return layoutProps;
   },
   
   //overridden
   _add : function(widget, layoutProperties, callSuper) {
     if(callSuper === true) {
       this.base(arguments, widget, layoutProperties);
     }
     else if (this._getLayout() instanceof qx.ui.layout.Grid) {
       layoutProperties = this.__getGridLayoutProperties(widget, layoutProperties);
       if (layoutProperties !== null) {
         this.base(arguments, widget, layoutProperties);
       }
     }
   },


   _initLayout : function() {
     var layout = new qx.ui.layout.Grid();
     this._setLayout(layout);
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

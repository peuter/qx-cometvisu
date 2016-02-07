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
 * BaseWidgetContainer is the superclass for all widgets that can contain other widgets like page, group, etc.
 * 
 * @abstract
 */
qx.Class.define("cv.ui.structure.pure.BaseWidgetContainer",
{
  extend : cv.ui.structure.pure.Base,
  type : "abstract",

  include : [
    cv.mixin.Layout,
    cv.mixin.MPages
  ],

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
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

    //overridden
    _initLayout : function() {
      var layout = new qx.ui.layout.Grid();
      this._setLayout(layout);
    },

    /**
     * Initialize the columns width to windowSize / columns
     */
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

    //property apply
    _applyColumnSize : function(value) {
      //if (this.getParsingState() === "done") {
        var layout = this._getLayout();
        for (var i = 0; i < this._columns; i++) {
          layout.setColumnMaxWidth(i, value);
        }
      //}
    },


    //overridden
    _draw : function() {
      this._initColumnWidths();
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
      var findFree = function() {
        var cellWidget = this._getLayout().getCellWidget(this._gridPosition.row, this._gridPosition.column);
        while (cellWidget !== null) {
          this._gridPosition.column++;
          if (this._gridPosition.column + colspan > this._columns) {
            this._gridPosition.row++;
            this._gridPosition.column = 0;
          }
          cellWidget = this._getLayout().getCellWidget(this._gridPosition.row, this._gridPosition.column);
        }
      }.bind(this);
      findFree();

      if (this._gridPosition.column + colspan > this._columns) {
        // bot enough space in row, start a new one
        this._gridPosition.row++;
        this._gridPosition.column = 0;
      }
      findFree();

      var layoutProps = {
        row : this._gridPosition.row,
        column : this._gridPosition.column,
        colSpan : colspan,
        rowSpan : rowspan
      };
      this._gridPosition.column += colspan;

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
          //console.log(layoutProperties);
          //console.log(widget);
          this.base(arguments, widget, layoutProperties);
        }
      } else if (this._getLayout() instanceof qx.ui.layout.Canvas) {
        // free positioning by x/y coordinates
        var layout = widget.getLayout();
        if (layout) {
          if (layout.getZ()) {
            widget.setZIndex(layout.getZ());
          }
          this.base(arguments, widget, {left: layout.getX(), top: layout.getY()});
        } else {
          this.base(arguments, widget);
        }
      }
    }
  }
});

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
qx.Class.define("cv.ui.parts.Navbar",
{
  extend : qx.ui.core.Widget,

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  
  /**
   * @param position {String} top,bottom,left,right
   */
  construct : function(position) {
    this.base(arguments);
    this._position = position;
    this.setAppearance("navbar-"+position);
    switch (position) {
      case "top":
      case "bottom":
        this._setLayout(new qx.ui.layout.HBox());
        break;
      case "left":
      case "right":
        this._setLayout(new qx.ui.layout.VBox());
        break;
    }

    this._model = new qx.data.Array();

    qx.event.message.Bus.subscribe("parser.finished", this._onParserFinished, this);
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
    _position : null,
    _list : null,
    _controller : null,
    _model : null,

    /**
     * Called when parser has finished parsing, applies model to list
     * @protected
     */
    _onParserFinished : function() {
      if (this._controller) {
        this._controller.setModel(this._model);
      }
    },

    _initList : function() {
      switch (this._position) {
        case "top":
        case "bottom":
          this._list = new qx.ui.form.List(true);
          // bind list height to childrencontainer height to prevent vertical scrolling
          this._list.getChildrenContainer().bind("height", this._list, "height");
          break;
        case "left":
        case "right":
          this._list = new qx.ui.form.List();
          // bind list height to childrencontainer height to prevent horizontal scrolling
          this._list.getChildrenContainer().bind("width", this._list, "width");
          break;
      }

      this._list.setAppearance("navbar-list");

      this._add(this._list, {flex:1});

      this._controller = new qx.data.controller.List(null, this._list);

      this._controller.setDelegate({
        createItem : function() {
          return new cv.ui.basic.WidgetContainer();
        },
        bindItem : function(controller, item, index) {
          controller.bindProperty("", "widget", null, item, index);
        },

        // only show widgets whos page (or their ancestor is visible)
        filter : function(model) {
          var visible = false;
          var page = model.getParentPage();
          if (!page) {
            // root page -> always show list items
            return true;
          }
          while (page && !visible) {
            if (page.isVisible()) {
              visible = true;
            } else {
              page = page.getParentPage();
            }
          }
          return visible;
        }
      });
    },
    
    /**
     * 
     * @param widget {cv.structure.IWidget}
     */
    addWidget : function(widget) {
      // as the navbar has content now we can show it
      if (!this.isVisible()) {
        this.show();
      }
      if (!this._controller) {
        this._initList();
      }
      if (widget.getDataType() === "navbar") {
        this._model.append(widget.getChildren());
      } else {
        this._model.push(widget);
      }
    }
  },
  
  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */
  destruct : function() {
    this._disposeObjects("_listController", "_list");
    qx.event.message.Bus.unsubscribe("parser.finished", this._onParserFinished, this);
  }
});

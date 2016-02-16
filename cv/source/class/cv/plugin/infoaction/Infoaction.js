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


/**
 * Infoaction plugin combines an info widget with an action widget
 */
qx.Class.define("cv.plugin.infoaction.Infoaction", {

  extend: qx.ui.core.Widget,

  implement: cv.ui.structure.IWidget,
  include: [
    cv.mixin.Widgetinfo,
    cv.mixin.Layout,
    cv.mixin.Label,
    qx.ui.core.MRemoteChildrenHandling
  ],

  /*
   *****************************************************************************
   CONSTRUCTOR
   *****************************************************************************
   */
  construct : function(node, path, root, parent) {
    this.base(arguments);

    this._setLayout(new qx.ui.layout.Canvas());

    this.setPath(path);

    if (parent) {
      this.setParentPage(parent);
    }

    // add default CSS class
    this.getContentElement().addClass("widget_container");

    // override padding/margin
    this.set( {
      margin : 0,
      padding: 0
    });

    this.map(node);
  },

  /*
   *****************************************************************************
   PROPERTIES
   *****************************************************************************
   */
  properties : {
    appearance : {
      init : "cv-widget",
      refine: true
    },
    path : {
      check : "String",
      init : "id_"
    },
    dataType : {
      check : "String",
      init : ""
    },
    parentPage : {
      check : "cv.ui.structure.pure.Page",
      nullable : true
    }
  },

  /*
   *****************************************************************************
   MEMBERS
   *****************************************************************************
   */
  members : {
    __actionWidget : null,

    /**
     * Returs the layoutoptions of the action-child-widget if set
     *
     * @param map {Map}
     * @returns {Map}
     */
    getLayoutOptions: function(map) {
      if (this.__actionWidget) {
        return this.__actionWidget.getLayoutOptions(map);
      }
    },

    /**
     * Parse the node and create the child widgets for info and action
     *
     * @param node {Element}
     */
    map : function(node) {
      // parse layout first as it is needed when children are added
      var layoutChild = node.querySelector("layout");
      this._parseLayout(layoutChild);
      this.fireEvent("layoutReady");

      // the info widget
      var widgetinfo = node.querySelector("widgetinfo");
      var infoChild = this._parseWidgetinfo(widgetinfo);
      // stretch content to full width
      infoChild.getChildControl("right-container").setLayoutProperties({ edge: 0 });
      infoChild.getChildControl("actor").setCenter(true);


      var action = node.querySelector("widgetaction > *");
      var actionChild = this.__actionWidget = cv.ui.structure.Factory.createWidget(action, this.getPath()+"_1");
      actionChild.addState("nowidget");
      actionChild.setParentPage(this.getParentPage());

      this._add(actionChild, { edge: 0 });


      var labelChild = node.querySelector("label");
      if (labelChild) {
        this._parseLabel(labelChild);
      }
    },

    //overridden
    getChildControl : function(id) {
      switch (id) {
        case "widget":
          return this;
        default:
          return this.base(arguments, id);
      }
    },

    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "label":
          control = new cv.ui.basic.Atom().set({
            rich : true, // allow HTML conten
            wrap : true // allow line wrapping
          });
          control.getContentElement().addClass("label");
          this.__actionWidget.setLayoutProperties({ left: "50%", top: 0, bottom: 0})
          this._add(control, { left: 0, top: 0, bottom: 0, width: "50%"});
      }

      return control || this.base(arguments, id);
    }
  },

  destruct : function() {
    this._disposeObjects("__actionWidget")
  }
});

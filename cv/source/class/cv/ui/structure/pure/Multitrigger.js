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
 * Multitrigger widget
 */
qx.Class.define("cv.ui.structure.pure.Multitrigger",
{
  extend : cv.ui.structure.pure.BaseWidget,

  /*
   *****************************************************************************
   PROPERTIES
   *****************************************************************************
   */
  properties: {
    button1value : {
      check : "String",
      nullable : true
    },
    button1label : {
      check : "String",
      nullable : true
    },
    button2value : {
      check : "String",
      nullable : true
    },
    button2label : {
      check : "String",
      nullable : true
    },
    button3value : {
      check : "String",
      nullable : true
    },
    button3label : {
      check : "String",
      nullable : true
    },
    button4value : {
      check : "String",
      nullable : true
    },
    button4label : {
      check : "String",
      nullable : true
    },
    showstatus : {
      check : "Boolean",
      transform : "stringToBool"
    }
  },

  members: {

    // overridden
    _draw : function() {
      this.base(arguments);

      // create childcontrols
      for (var i=1; i<=4; i++) {
        if (this.get("button"+i+"value")) {
          this.getChildControl("button"+i);
        }
      }
    },

    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch (id) {

        case "right-container":
          control = new qx.ui.container.Composite(new qx.ui.layout.Grid(0, 2));
          this.getChildControl("widget").addAt(control, 1);
          break;

        case "button1":
          control = this.__createButton(1);
          break;

        case "button2":
          control = this.__createButton(2);
          break;

        case "button3":
          control = this.__createButton(3);
          break;

        case "button4":
          control = this.__createButton(4);
          break;

      }
      return control || this.base(arguments, id);
    },

    //overridden
    _setAndStyleProcessedValue :function(value) {
      for (var i=1; i<=4; i++) {
        if (value == this.get("button"+i+"value")) {
          this.getChildControl("button"+i).addState("pressed");
        } else {
          this.getChildControl("button"+i).removeState("pressed");
        }
      }
    },

    /**
     * Create button for given number
     * @param no {Number} 1-4
     * @private
     */
    __createButton : function(no) {
      var control = new cv.ui.basic.Atom();
      control.setAppearance("cv-button");

      // apply label
      if (this.getMapping()) {
        // replace button label by mapped value
        control.setLabel(this.getMapping().map("button" + no + "value"));
      } else {
        // use default label
        control.setLabel(this.get("button" + no + "label"));
      }

      if (this.getAlign && this.getAlign() === "center") {
        control.setCenter(true);
      }

      control.addListener("tap", this._action.bind(this, no), this);

      var gridPos = {
        row : Math.floor(no/3),
        column : 0
      };
      gridPos.column = (no - gridPos.row*2)-1;

      this.getChildControl("right-container").add(control, gridPos);
      return control;
    },

    /**
     * Handle user interaction, send pressed buttons value to the backend
     *
     * @param no {Number} number of the pressed button
     */
    _action : function(no) {
      var writeValue = this.get("button"+no+"value");

      this.getAddresses().forEach(function(address) {
        if (address.isWriteable()) {
          cv.Utils.client.write(address.getItem().getAddress(), writeValue);
        }
      }, this);
    }
  }
});

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
 * BaseWidget is the superclass for all common widgets e.g. switch, trigger, ...
 * 
 * @abstract
 */
qx.Class.define("cv.ui.structure.pure.BaseWidget",
{
  extend : cv.ui.structure.pure.Base,
  type : "abstract",
  
  include : [
    cv.mixin.Label,
    cv.mixin.Address,
    cv.mixin.Align,
    cv.mixin.Flavour,
    cv.mixin.MBaseWidget
  ],

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    styling : {
      check : "cv.config.meta.Styling",
      nullable : true,
      transform : "__getStylingByName"
    },
    mapping : {
      check : "cv.config.meta.Mapping",
      nullable : true,
      transform : "__getMappingByName"
    },
    onValue : {
      check : "String",
      init : "1"
    },
    offValue : {
      check : "String",
      init : "0"
    },
    bindClickToWidget : {
      check : "Boolean",
      transform : "stringToBool",
      init : false
    },
    format : {
      check : "String",
      nullable : true
    },
    precision : {
      check : "Number",
      nullable : true
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    /**
     * A shortcut to {cv.ui.Templateengine.getInstance().getStylingByName}, to be used as transform
     * @private
     */
    __getStylingByName : function(name) {
      return cv.Utils.engine.getStylingByName(name);
    },

    /**
     * A shortcut to {cv.ui.Templateengine.getInstance().getMappingByName}, to be used as transform
     * @private
     */
    __getMappingByName : function(name) {
      return cv.Utils.engine.getMappingByName(name);
    },

    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;
      if (this._hasMixinChildControl(id)) {
        control = this._getMixinChildControl(id);
      }
      return control || this.base(arguments, id);
    },

    /**
     * Get the childcontrol which is responsible for user events
     * depending on the property {bind_click_to_widget} is is either the 'actor' or the 'widget'
     * childontrol
     */
    getActionChildControl : function() {
      return this.isBindClickToWidget() ? this.getChildControl("widget") : this.getChildControl("actor");
    }
  }
});

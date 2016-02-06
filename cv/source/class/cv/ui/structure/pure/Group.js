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
 * Group widget
 * <xsd:complexType name="group">
 *  <xsd:sequence>
 *   <xsd:element name="layout" type="layout" minOccurs="0" maxOccurs="1"/>
 *   <xsd:choice minOccurs="0" maxOccurs="unbounded">
 *    <xsd:element name="page" type="page" />
 *    <xsd:element name="group" type="group" />
 *    <xsd:group ref="Widgets"/>
 *    <xsd:group ref="AvailablePlugins"/>
 *   </xsd:choice>
 *  </xsd:sequence>
 *  <xsd:attribute name="name" type="xsd:string" use="optional" />
 *  <xsd:attribute name="nowidget" type="xsd:boolean" use="optional" />
 *  <xsd:attribute ref="flavour" use="optional" />
 *  <xsd:attribute ref="target" use="optional" />
 *  <xsd:attribute ref="align" use="optional" />
 *  <xsd:attribute ref="class" use="optional" />
 * </xsd:complexType>
 */
qx.Class.define("cv.ui.structure.pure.Group",
{
  extend : cv.ui.structure.pure.BaseWidgetContainer,

  include :[
    cv.mixin.Align
  ],

  /*
   *****************************************************************************
      STATICS
   *****************************************************************************
   */
  statics : {
  },
  
  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {

    //overridden
    appearance : {
      init : "group",
      refine : true
    },
    
    /**
     * The group name
     */
    name : {
      check : "String",
      init : null,
      apply : "_applyName",
      event : "changeName"
    },

    nowidget :{
      check : "Boolean",
      init : false,
      transform : "stringToBool"
    },

    /**
     * The name of the page, that should be shown.
     */
    target : {
      check : "String"
    },

    /**
     * Add this value to the CSS class so that it can be formated by a user provided style sheet.
     */
    "class" : {
      check : "String",
      nullable : true,
      apply : "_applyClass"
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

    _applyClass : function(value) {

    },
    
    //overridden
    _draw : function() {
      this._initColumnWidths();
    },

    //overridden
    getAlignWidget : function() {
      return this.getChildControl("title");
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
          control.setAppearance("group-title");
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

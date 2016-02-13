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
 * Infotrigger widget defined by
 *
 * <xsd:complexType name="infotrigger">
 *  <xsd:sequence>
 *   <xsd:element name="layout" type="layout" minOccurs="0" maxOccurs="1"/>
 *   <xsd:element name="label" type="label" minOccurs="0" maxOccurs="1"/>
 *   <xsd:element name="address" type="address" minOccurs="1" maxOccurs="unbounded"/>
 *  </xsd:sequence>
 *  <xsd:attribute name="upvalue" type="xsd:string" use="optional" />
 *  <xsd:attribute name="shortupvalue" type="xsd:string" use="optional" />
 *  <xsd:attribute name="downvalue" type="xsd:string" use="optional" />
 *  <xsd:attribute name="shortdownvalue" type="xsd:string" use="optional" />
 *  <xsd:attribute name="uplabel" type="xsd:string" use="optional" />
 *  <xsd:attribute name="downlabel" type="xsd:string" use="optional" />
 *  <xsd:attribute name="shorttime" type="xsd:decimal" use="optional">
 *   <xsd:annotation>
 *    <xsd:documentation xml:lang="en">Time in milliseconds that is accepted as shorttime.</xsd:documentation>
 *    <xsd:documentation xml:lang="de">Zeit in Millisekunden innerhalb der der Tastendruck als Kurzzeit interpretiert wird.</xsd:documentation>
 *   </xsd:annotation>
 *  </xsd:attribute>
 *  <xsd:attribute name="change" use="optional">
 *   <xsd:annotation>
 *    <xsd:documentation xml:lang="en">Might be 'absolute' or 'relative'.</xsd:documentation>
 *   </xsd:annotation>
 *   <xsd:simpleType>
 *    <xsd:restriction base="xsd:string">
 *     <xsd:enumeration value="absolute" />
 *     <xsd:enumeration value="relative" />
 *    </xsd:restriction>
 *   </xsd:simpleType>
 *  </xsd:attribute>
 *  <xsd:attribute ref="min" />
 *  <xsd:attribute ref="max" />
 *  <xsd:attribute ref="mapping" use="optional" />
 *  <xsd:attribute ref="styling" use="optional" />
 *  <xsd:attribute ref="align" use="optional" />
 *  <xsd:attribute ref="format" use="optional" />
 *  <xsd:attribute name="infoposition" use="optional">
 *   <xsd:annotation>
 *    <xsd:appinfo>level:expert</xsd:appinfo>
 *   </xsd:annotation>
 *   <xsd:simpleType>
 *    <xsd:restriction base="xsd:string">
 *     <xsd:enumeration value="left" />
 *     <xsd:enumeration value="middle" />
 *     <xsd:enumeration value="right" />
 *    </xsd:restriction>
 *   </xsd:simpleType>
 *  </xsd:attribute>
 *  <xsd:attribute ref="flavour" use="optional" />
 * </xsd:complexType>
 */
qx.Class.define("cv.ui.structure.pure.Infotrigger",
{
  extend : cv.ui.structure.pure.BaseWidget,

  statics : {
    variantBitMapping : {
      "short" : 1,
      button : 2,
      unset : 1|2
    }
  },

  /*
   *****************************************************************************
   PROPERTIES
   *****************************************************************************
   */
  properties: {
    upvalue : {
      check : "String",
      init : "0"
    },
    shortupvalue : {
      check : "String",
      init : "0"
    },
    downvalue : {
      check : "String",
      init : "0"
    },
    shortdownvalue : {
      check : "String",
      init : "0"
    },
    uplabel : {
      check : "String",
      nullable : true
    },
    downlabel : {
      check : "String",
      nullable : true
    },

    /**
     * Time in milliseconds that is accepted as shorttime
     */
    shorttime : {
      check : "Number",
      init : -1,
      transform : "stringToNumber"
    },

    change : {
      check : ["absolute","relative"],
      init : "relative"
    },

    /**
     * Minimum value of the slider range
     */
    min : {
      check : "Number",
      init : 0,
      transform : "stringToNumber",
      event : "changeMin"
    },

    /**
     * Maximum value of the slider range
     */
    max : {
      check : "Number",
      init : 255,
      transform : "stringToNumber",
      event : "changeMax"
    },

    infoposition : {
      check : ["left", "middle", "right"],
      init : "left"
    }
  },

  members: {
    _pointerDownTime : null,

    //overridden
    getValueWidget : function() {
      return this.getChildControl("info");
    },

    //overridden
    getValueProperty : function() {
      return "value";
    },

    // overridden
    _draw : function() {
      this.base(arguments);

      // create childcontrols
      this.getChildControl("info");
      this.getChildControl("up");
      this.getChildControl("down");
    },

    __getPosition : function(childcontrol) {
      switch (this.getInfoposition()) {
        case "left":
          switch (childcontrol) {
            case "info":
              return 0;
            case "up":
              return 2;
            case "down":
              return 1;
          }
          break;

        case "middle":
          switch (childcontrol) {
            case "info":
              return 1;
            case "up":
              return 2;
            case "down":
              return 0;
          }
          break;

        case "right":
          switch (childcontrol) {
            case "info":
              return 3;
            case "up":
              return 1;
            case "down":
              return 0;
          }
          break;
      }
    },

    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch (id) {

        case "right-container":
          control = new qx.ui.container.Composite(new qx.ui.layout.HBox());
          this.getChildControl("widget").addAt(control, 1);
          break;

        case "info":
          control = new qx.ui.basic.Label();
          this.getChildControl("right-container").addAt(control, this.__getPosition("info"));
          break;

        case "up":
          control = new cv.ui.basic.Atom();
          control.setLabel(this.getUplabel());
          if (this.getAlign && this.getAlign() === "center") {
            control.setCenter(true);
          }
          control.addListener("pointerdown", function() {
            this._pointerDownTime = Date.now();
          }, this);
          control.addListener("tap", this._action.bind(this, true), this);
          this.getChildControl("right-container").addAt(control, this.__getPosition("up"));
          break;

        case "down":
          control = new cv.ui.basic.Atom();
          control.setLabel(this.getDownlabel());
          if (this.getAlign && this.getAlign() === "center") {
            control.setCenter(true);
          }
          control.addListener("pointerdown", function() {
            this._pointerDownTime = Date.now();
          }, this);
          control.addListener("tap", this._action.bind(this, false), this);
          this.getChildControl("right-container").addAt(control, this.__getPosition("down"));
          break;
      }
      return control || this.base(arguments, id);
    },

    _action : function(up) {
      var isShort = (Date.now() - this._pointerDownTime) < this.getShorttime();
      var writeValue = up ? (isShort ? this.getShortupvalue() : this.getUpvalue()) : (isShort ? this.getShortdownvalue() : this.getDownvalue());
      var bitMask = isShort ? 1 : 2;

      if (this.getChange() === "relative") {
        var value = parseFloat(this.getValue());
        if( isNaN( value ) ) {
          value = 0; // anything is better than NaN...
        }
        writeValue = value + parseFloat(writeValue);
        if (writeValue < this.getMin() ) {
          writeValue = this.getMin();
        }
        if( writeValue > this.getMax() ) {
          writeValue = this.getMax();
        }
      }
      this.getAddresses().forEach(function(address) {
        if (address.isWritable() && address.getVariantBitmask() & bitMask) {
          cv.Utils.client.write(address.getItem().getAddress(), writeValue);
        }
      }, this);
      this._pointerDownTime = 0;
    }
  }
});

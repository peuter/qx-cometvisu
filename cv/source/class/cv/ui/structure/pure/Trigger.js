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
 * Trigger widget sends a defined value when clicked
 *
 * specs:
 *   <xsd:complexType name="trigger">
 *    <xsd:sequence>
 *     <xsd:element name="layout" type="layout" minOccurs="0" maxOccurs="1"/>
 *     <xsd:element name="label" type="label" minOccurs="0" maxOccurs="1"/>
 *     <xsd:element name="address" type="address" minOccurs="0" maxOccurs="unbounded"/>
 *    </xsd:sequence>
 *    <xsd:attribute ref="value" use="required" />
 *    <xsd:attribute name="shortvalue" type="xsd:string" use="optional" />
 *    <xsd:attribute name="shorttime" type="xsd:decimal" use="optional">
 *     <xsd:annotation>
 *      <xsd:documentation xml:lang="en">Time in milliseconds that is accepted as shorttime.</xsd:documentation>
 *      <xsd:documentation xml:lang="de">Zeit in Millisekunden innerhalb der der Tastendruck als Kurzzeit interpretiert wird.</xsd:documentation>
 *     </xsd:annotation>
 *    </xsd:attribute>
 *    <xsd:attribute ref="mapping" use="optional" />
 *    <xsd:attribute ref="styling" use="optional" />
 *    <xsd:attribute ref="align" use="optional" />
 *    <xsd:attribute ref="flavour" use="optional" />
 *    <xsd:attribute ref="bind_click_to_widget" use="optional"/>
 *   </xsd:complexType>
 */
qx.Class.define("cv.ui.structure.pure.Trigger",
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

    /**
     * Value to send on long press
     */
    value: {
      check: "String",
      init: "0"
    },

    /**
     * Value to send on short press
     */
    shortvalue: {
      check: "String",
      init: "0"
    },

    /**
     * Time in milliseconds that is accepted as shorttime
     */
    shorttime : {
      check : "Number",
      init : -1,
      transform : "stringToNumber"
    }
  },


  members: {
    _pointerDownTime : null,

    // overridden
    _draw : function() {
      this.base(arguments);

      var control = this.getActionChildControl();
      control.addListener("pointerdown", function() {
        this._pointerDownTime = Date.now();
      }, this);
      control.addListener("tap", this._action, this);
    },

    /**
     * Handle user interaction, send pressed buttons value to the backend
     *
     */
    _action : function() {
      var isShort = (Date.now() - this._pointerDownTime) < this.getShorttime();
      var writeValue = isShort ? this.getShortvalue() : this.getValue();
      var bitMask = isShort ? 1 : 2;

      this.getAddresses().forEach(function(address) {
        if (address.isWritable() && address.getVariantBitmask() & bitMask) {
          cv.Utils.client.write(address.getItem().getAddress(), address.encodeValue(writeValue));
        }
      }, this);
      this._pointerDownTime = 0;
    }
  }
});

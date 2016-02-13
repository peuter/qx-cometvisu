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
 * Decorator which uses the CSS3 border image properties with a gradient.
 *
 */
qx.Mixin.define("cv.ui.decoration.MBorderImageGradient",
  {

   /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties :{
    /**
     * Start color of the boder gradient.
     * Note that alpha transparency (rgba) is not supported in IE 8.
     */
    borderStartColor :
    {
      check : "Color",
      nullable : true,
      apply : "_applyBorderImageGradient"
    },

    /**
     * End color of the border gradient.
     * Note that alpha transparency (rgba) is not supported in IE 8.
     */
    borderEndColor :
    {
      check : "Color",
      nullable : true,
      apply : "_applyBorderImageGradient"
    },

    /** The orientation of the gradient. */
    borderGradientOrientation :
    {
      check : ["horizontal", "vertical"],
      init : "vertical",
      apply : "_applyBorderImageGradient"
    },

    /** Position in percent where to start the color. */
    borderStartColorPosition :
    {
      check : "Number",
      init : 0,
      apply : "_applyBorderImageGradient"
    },

    /** Position in percent where to start the color. */
    borderEndColorPosition :
    {
      check : "Number",
      init : 100,
      apply : "_applyBorderImageGradient"
    },

    /** Defines if the given positions are in % or px.*/
    borderColorPositionUnit :
    {
      check : ["px", "%"],
      init : "%",
      apply : "_applyBorderImageGradient"
    },


    /** Property group to set the start color including its start position. */
    borderGradientStart :
    {
      group : ["borderStartColor", "borderStartColorPosition"],
      mode : "shorthand"
    },

    /** Property group to set the end color including its end position. */
    borderGradientEnd :
    {
      group : ["borderEndColor", "borderEndColorPosition"],
      mode : "shorthand"
    },

    borderColorStopPosition : {
      check : "Number",
      init : 0,
      apply : "_applyBorderImageGradient"
    },

    borderColorStopColor : {
      check : "Color",
      nullable : true,
      apply : "_applyBorderImageGradient"
    },

    borderColorStopWidth : {
      check : "Number",
      init : 0,
      apply : "_applyBorderImageGradient"
    },

    borderColorStop : {
      group : ["borderColorStopColor", "borderColorStopPosition", "borderColorStopWidth"],
      mode : "shorthand"
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
     * Adds the border-image styles to the given map
     * @param styles {Map} CSS style map
     */
    _styleBorderImageGradient : function(styles)
    {
      var colors = this.__getGradientColors();
      var startColor = colors.start;
      var endColor = colors.end;
      var colorStopColor = colors.colorStop;

      if (!startColor || !endColor) {
        return;
      }

      var unit = this.getBorderColorPositionUnit();

      // WebKit, Opera and Gecko interpret 0deg as "to right"
      var deg = this.getBorderGradientOrientation() == "horizontal" ? 0 : 270;

      var start = startColor + " " + this.getBorderStartColorPosition() + unit;
      var end = endColor + " " + this.getBorderEndColorPosition() + unit;
      var stops = "";

      if (colorStopColor) {
        stops = ", " + colorStopColor + " " + this.getBorderColorStopPosition() + unit;
        if (this.getBorderColorStopWidth() > 0) {
          stops += ", " + colorStopColor + " " + (this.getBorderColorStopPosition()+this.getBorderColorStopWidth())  + unit;
        }
      }

      var prefixedName = qx.core.Environment.get("css.gradient.linear");
      // Browsers supporting the unprefixed implementation interpret 0deg as
      // "to top" as defined by the spec [BUG #6513]
      if (prefixedName === "linear-gradient") {
        deg = this.getBorderGradientOrientation() == "horizontal" ? deg + 90 : deg - 90;
      }

      var styleName = qx.bom.Style.getPropertyName("borderImage");
      if (styleName) {
        // style bottom widths
        styles["border-top-width"] = this.getWidthTop();
        styles["border-right-width"] = this.getWidthRight();
        styles["border-bottom-width"] = this.getWidthBottom();
        styles["border-left-width"] = this.getWidthLeft();

        var cssName = qx.bom.Style.getCssName(styleName);
        styles[cssName] = prefixedName + "(" + deg + "deg, " + start + stops + "," + end + ") 1 100%";
      }
    },


    /**
     * Helper to get start and end color.
     * @return {Map} A map containing start and end color.
     */
    __getGradientColors : function() {
      var startColor, endColor, colorStopColor;
      if (qx.core.Environment.get("qx.theme"))
      {
        var Color = qx.theme.manager.Color.getInstance();
        startColor = Color.resolve(this.getBorderStartColor());
        endColor = Color.resolve(this.getBorderEndColor());
        colorStopColor = Color.resolve(this.getBorderColorStopColor());
      }
      else
      {
        startColor = this.getBorderStartColor();
        endColor = this.getBorderEndColor();
        colorStopColor = this.getBorderColorStopColor();
      }
      return {start: startColor, end: endColor, colorStop: colorStopColor};
    },


    // property apply
    _applyBorderImageGradient : function()
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (this._isInitialized()) {
          throw new Error("This decorator is already in-use. Modification is not possible anymore!");
        }
      }
    }
  },

  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */
  destruct :function() {
  }
});


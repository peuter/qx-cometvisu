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
 * Extend Qooxdoos Mixin for the linear background gradient CSS property.
 * to add color-stops
 */
qx.Mixin.define("cv.ui.decoration.MLinearBackgroundGradient",
  {
    properties :
    {
      colorStopPosition : {
        check : "Number",
        init : 0,
        apply : "_applyLinearBackgroundGradient"
      },

      colorStopColor : {
        check : "Color",
        nullable : true,
        apply : "_applyLinearBackgroundGradient"
      },

      colorStopWidth : {
        check : "Number",
        init : 0,
        apply : "_applyLinearBackgroundGradient"
      },

      colorStop : {
        group : ["colorStopColor", "colorStopPosition", "colorStopWidth"],
        mode : "shorthand"
      }
    },


    members :
    {
      __canvas : null,

      /**
       * Takes a styles map and adds the linear background styles in place to the
       * given map. This is the needed behavior for
       * {@link qx.ui.decoration.Decorator}.
       *
       * @param styles {Map} A map to add the styles.
       */
      _styleLinearBackgroundGradient : function(styles) {
        var colors = this.__getMyColors();
        var startColor = colors.start;
        var endColor = colors.end;
        var colorStopColor = colors.colorStop;
        var value;

        if (!startColor || !endColor) {
          return;
        }

        var unit = this.getColorPositionUnit();

        // new implementation for webkit is available since chrome 10 --> version
        if (qx.core.Environment.get("css.gradient.legacywebkit")) {
          // webkit uses px values if non are given
          unit = unit === "px" ? "" : unit;

          var startPos, endPos;
          if (this.getOrientation() == "horizontal") {
            startPos = this.getStartColorPosition() + unit +" 0" + unit;
            endPos = this.getEndColorPosition() + unit + " 0" + unit;
          } else {
            startPos = "0" + unit + " " + this.getStartColorPosition() + unit;
            endPos = "0" + unit +" " + this.getEndColorPosition() + unit;
          }

          var color =
            "from(" + startColor +
            "),to(" + endColor + ")";
          if (colorStopColor) {
            color+=", color-stop(" + this.getColorStopPosition() + unit + ", " + colorStopColor + ")";
            if (this.getColorStopWidth() > 0) {
              color+=", color-stop(" + this.getColorStopPosition()+this.getColorStopWidth() + unit + ", " + colorStopColor + ")";
            }
          }

          value = "-webkit-gradient(linear," + startPos + "," + endPos + "," + color + ")";
          styles["background"] = value;

          // IE9 canvas solution
        } else if (qx.core.Environment.get("css.gradient.filter") &&
          !qx.core.Environment.get("css.gradient.linear") && qx.core.Environment.get("css.borderradius")) {

          if (!this.__canvas) {
            this.__canvas = document.createElement("canvas");
          }

          var isVertical = this.getOrientation() == "vertical";

          var height = isVertical ? 200 : 1;
          var width = isVertical ? 1 : 200;
          var range = Math.max(100, this.getEndColorPosition() - this.getStartColorPosition());

          // use the px difference as dimension
          if (unit === "px") {
            if (isVertical) {
              height = Math.max(height, this.getEndColorPosition() - this.getStartColorPosition());
            } else {
              width = Math.max(width, this.getEndColorPosition() - this.getStartColorPosition());
            }
          } else {
            if (isVertical) {
              height = Math.max(height, (this.getEndColorPosition() - this.getStartColorPosition()) * 2);
            } else {
              width = Math.max(width, (this.getEndColorPosition() - this.getStartColorPosition()) * 2);
            }
          }

          this.__canvas.width = width;
          this.__canvas.height = height;
          var ctx = this.__canvas.getContext('2d');

          var lingrad = null;
          if (isVertical) {
            lingrad = ctx.createLinearGradient(0, 0, 0, height);
          } else {
            lingrad = ctx.createLinearGradient(0, 0, width, 0);
          }

          // don't allow negative start values
          if (unit === "%") {
            lingrad.addColorStop(Math.max(0, this.getStartColorPosition()) / range, colors.start);
            if (colorStopColor) {
              lingrad.addColorStop(this.getColorStopPosition() / range, colorStopColor);
              if (this.getColorStopWidth() > 0) {
                lingrad.addColorStop((this.getColorStopPosition()+this.getColorStopWidth()) / range, colorStopColor);
              }
            }
            lingrad.addColorStop(this.getEndColorPosition() / range, colors.end);
          } else {
            var comp = isVertical ? height : width;
            lingrad.addColorStop(Math.max(0, this.getStartColorPosition()) / comp, colors.start);
            if (colorStopColor) {
              lingrad.addColorStop(this.getColorStopPosition() / comp, colorStopColor);
              if (this.getColorStopWidth() > 0) {
                lingrad.addColorStop((this.getColorStopPosition()+this.getColorStopWidth()) / comp, colorStopColor);
              }
            }
            lingrad.addColorStop(this.getEndColorPosition() / comp, colors.end);
          }

          ctx.fillStyle = lingrad;
          ctx.fillRect(0, 0, width, height);

          value = "url(" + this.__canvas.toDataURL() + ")";
          styles["background-image"] = value;
          if (unit === "%") {
            if (isVertical) {
              styles["background-size"] = "100% " + range + "%";
            } else {
              styles["background-size"] = range + "% 100%";
            }
          } else {
            styles["background-size"] = isVertical ? height + "px 100%" : "100% " + width + "px";
          }


          // old IE filter fallback
        } else if (qx.core.Environment.get("css.gradient.filter") &&
          !qx.core.Environment.get("css.gradient.linear"))
        {
          var type = this.getOrientation() == "horizontal" ? 1 : 0;

          // convert rgb, hex3 and named colors to hex6
          if (!qx.util.ColorUtil.isHex6String(startColor)) {
            startColor = qx.util.ColorUtil.stringToRgb(startColor);
            startColor = qx.util.ColorUtil.rgbToHexString(startColor);
          }
          if (!qx.util.ColorUtil.isHex6String(endColor)) {
            endColor = qx.util.ColorUtil.stringToRgb(endColor);
            endColor = qx.util.ColorUtil.rgbToHexString(endColor);
          }

          // get rid of the starting '#'
          startColor = startColor.substring(1, startColor.length);
          endColor = endColor.substring(1, endColor.length);

          value = "progid:DXImageTransform.Microsoft.Gradient" +
            "(GradientType=" + type + ", " +
            "StartColorStr='#FF" + startColor + "', " +
            "EndColorStr='#FF" + endColor + "';)";
          if (styles["filter"]) {
            styles["filter"] += ", " + value;
          } else {
            styles["filter"] = value;
          }

          // Elements with transparent backgrounds will not receive receive pointer

          // events if a Gradient filter is set.
          if (!styles["background-color"] ||
            styles["background-color"] == "transparent")
          {
            // We don't support alpha transparency for the gradient color stops
            // so it doesn't matter which color we set here.
            styles["background-color"] = "white";
          }

          // spec like syntax
        } else {
          // WebKit, Opera and Gecko interpret 0deg as "to right"
          var deg = this.getOrientation() == "horizontal" ? 0 : 270;

          var start = startColor + " " + this.getStartColorPosition() + unit;
          var end = endColor + " " + this.getEndColorPosition() + unit;
          var stops = "";

          if (colorStopColor) {
            stops = ", " + colorStopColor + " " + this.getColorStopPosition() + unit;
            if (this.getColorStopWidth() > 0) {
              stops += ", " + colorStopColor + " " + (this.getColorStopPosition()+this.getColorStopWidth())  + unit;
            }
          }

          var prefixedName = qx.core.Environment.get("css.gradient.linear");
          // Browsers supporting the unprefixed implementation interpret 0deg as
          // "to top" as defined by the spec [BUG #6513]
          if (prefixedName === "linear-gradient") {
            deg = this.getOrientation() == "horizontal" ? deg + 90 : deg - 90;
          }

          value = prefixedName + "(" + deg + "deg, " + start + stops + "," + end + ")";
          if (styles["background-image"]) {
            styles["background-image"] += ", " + value;
          }
          else {
            styles["background-image"] = value;
          }
        }
      },


      /**
       * Helper to get start and end color.
       * @return {Map} A map containing start and end color.
       */
      __getMyColors : function() {
        var startColor, endColor, colorStopColor;
        if (qx.core.Environment.get("qx.theme"))
        {
          var Color = qx.theme.manager.Color.getInstance();
          startColor = Color.resolve(this.getStartColor());
          endColor = Color.resolve(this.getEndColor());
          colorStopColor = Color.resolve(this.getColorStopColor());
        }
        else
        {
          startColor = this.getStartColor();
          endColor = this.getEndColor();
          colorStopColor = this.getColorStopColor();
        }
        return {start: startColor, end: endColor, colorStop: colorStopColor};
      }
    }
  });
/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Theme.define("cv.theme.pure.Decoration",
{
  extend : qx.theme.modern.Decoration,

  decorations :
  {
    // basic page parts
    "footer" : {
      
    },
    
    "cv-widget" : {
      style : {
        width : 1,
        radius : 5,
        color : "border-main"
      }
    },
    "line" : {
      style : {
        orientation : "horizontal",
        gradientStart : ["line-gradient", 0],
        gradientEnd : ["line-gradient", 100],
        colorStop : ["line", 33, 33]
      }
    },
    "vline" : {
      style : {
        orientation : "vertical",
        gradientStart : ["line-gradient", 0],
        gradientEnd : ["line-gradient", 100],
        colorStop : ["line", 33, 33]
      }
    },
    "switch" : {
      style : {
        innerWidth : 1,
        width : 1,
        radius : 5,
        color : [ "actor-border-top",  "actor-border-bottom", "actor-border-bottom", "actor-border-top"],
        innerColor : [ "actor-border-inner", "actor-border-top", "actor-border-top", "actor-border-inner"],
        gradientStart : ["actor-gradient-start", 0],
        gradientEnd : ["actor-gradient-end", 100]
      }
    },
    "switch-pressed" : {
      style : {
        innerWidth : 1,
        width : 1,
        radius : 5,
        color : [ "actor-border-top",  "actor-border-inner", "actor-border-inner", "actor-border-top"],
        innerColor : [ "actor-border-bottom", "actor-border-top", "actor-border-top", "actor-border-bottom"],
        gradientStart : ["actor-gradient-start", 0],
        gradientEnd : ["actor-gradient-start", 100]
      }
    },
    /**
     * The 4 navbars
     */
    "navbar-top": {
      style : {

      }
    },
    "navbar-bottom": {
      style :
      {

      }
    },
    "navbar-left": {
      style :
      {
        width : [ 0, 1, 0, 0],
        colorRight : "line",
        widthLeft : 0,
        borderGradientOrientation : "vertical",
        borderGradientStart : ["line-gradient", 0],
        borderGradientEnd : ["line-gradient", 100],
        borderColorStop : ["line", 33, 33]
      }
    },
    "navbar-right": {
      style :
      {
        width : [ 0, 0, 0, 1],
        borderGradientOrientation : "vertical",
        borderGradientStart : ["line-gradient", 0],
        borderGradientEnd : ["line-gradient", 100],
        borderColorStop : ["line", 33, 33]
      }
    },

    "widgetinfo" : {
      style : {
        radius: [0, 0, 0, 25],
        width : 0,
        backgroundColor : "widget-info-bg"
      }
    },

    "widgetinfo-topbottom" : {
      style : {
        radius: 20,
        width : 0,
        backgroundColor : "widget-info-bg-nav"
      }
    }
  }
});
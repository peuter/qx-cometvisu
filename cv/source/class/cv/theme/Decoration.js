/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Theme.define("cv.theme.Decoration",
{
  extend : qx.theme.modern.Decoration,

  decorations :
  {
    // basic page parts
    "footer" : {
      
    },
    
    "widget" : {
      style : {
        radius : 5
      }
    },
    
    "cv-widget" : {
      style : {
        width : 1,
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
    "switch" : {
      style : {
        innerWidth : 1,
        width : 1,
        radius : 5,
        color : [ "#666666",  "#444444", "#444444", "#666666"],
        innerColor : [ "#FFFFFF", "#666666", "#666666", "#FFFFFF"],
        gradientStart : ["#0F0F0F", 0],
        gradientEnd : ["#000000", 100]
      }
    },
    "switch-pressed" : {
      style : {
        innerWidth : 1,
        width : 1,
        radius : 5,
        color : [ "#666666",  "#FFFFFF", "#FFFFFF", "#666666"],
        innerColor : [ "#444444", "#666666", "#666666", "#444444"],
        gradientStart : ["#000000", 0],
        gradientEnd : ["#0F0F0F", 100]
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
    }
  }
});
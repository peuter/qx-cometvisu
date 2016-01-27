/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Theme.define("cv.theme.Appearance",
{
  //extend : qx.theme.simple.Appearance,

  appearances :
  {
    "main-template" : {
      style : function(states)
      {
        return {
          // backgroundColor : "rgb(100,100,100)",
          // textColor       : "text-label",
          // font            : "default"
        };
      }
    },
    "cv-widget" : {
      include : "widget",
      alias : "widget",
      
      style : function(states)
      {
        return {
          decorator : "cv-widget"
        };
      }
    }
  }
});
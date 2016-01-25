/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Theme.define("cv.theme.Appearance",
{
  extend : qx.theme.modern.Appearance,

  appearances :
  {
    "main-template" : {
      style : function(states)
      {
        return {
          backgroundColor : "rgb(100,100,100)",
          textColor       : "text-label",
          font            : "default"
        };
      }
    }
  }
});
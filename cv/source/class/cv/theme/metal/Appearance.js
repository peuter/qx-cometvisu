/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Theme.define("cv.theme.metal.Appearance",
{
  extend : cv.theme.pure.Appearance,

  appearances :
  {
    "root" :
    {
      style : function()
      {
        return {
          backgroundColor : "background-application",
          decorator       : "main-gradient",
          textColor       : "text-label",
          font            : "default"
        };
      }
    },

    "group": {
      style : function(states) {
        if (states.nowidget) {
          // a nowidget group has no special appearance
          return {};
        } else {
          // normal group appearance
          return {
            decorator: "group",
            margin: [4, 10]
          };
        }
      }
    },

    "group/title": {
      style : function() {
        return {
          decorator : "group-title",
          padding : [0, 10],
          font: "group-title"
        }
      }
    },

    // do not show page titles
    "page-title" : {
      style : function()
      {
        return {
          excluded : true
        };
      }
    }
  }
});
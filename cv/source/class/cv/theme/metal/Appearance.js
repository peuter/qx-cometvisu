

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

    "cv-widget" : {
      style : function(states) {
        console.log(states);
        if (states.nowidget) {
          // a nowidget group has no special appearance
          return {
            padding : [3, 5],
            decorator: null
          };
        } else {
          return {
            padding : [3, 5],
            decorator : "cv-widget"
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
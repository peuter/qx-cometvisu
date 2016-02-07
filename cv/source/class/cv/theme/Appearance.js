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
    "template-engine" : { },
    "template-engine/footer" : {
      style : function()
      {
        return {
          decorator : "footer",
          textColor : "line"
        };
      }
    },
    "group": {

    },

    /**
     * Widget stuff
     */
    "cv-widget" : {
      style : function()
      {
        return {
          padding : [3, 5],
          decorator : "widget"
        };
      }
    },

    "text" : {
      include : "cv-widget",
      alias : "cv-widget"
    },
    "pagejump" : {
      include : "cv-widget",
      alias : "cv-widget"
    },
    "pagejump/label" : {
      include : "cv-widget/label",
      alias : "cv-widget/label",

      style : function()
      {

      }
    },
    "pagejump/actor" : {
      include : "cv-widget/actor",
      alias : "cv-widget/actor"      
    },

    // container for the right side if a widget (e.g. used in infotrigger)
    "cv-widget/right-container" : {},
    
    "cv-widget/actor" : {
      style : function(states)
      {
        return {
          marginLeft : 15,
          padding : 3,
          minWidth : 100,
          maxWidth : 200,
          allowGrowY : false,
          center : true,
          show : "label",
          decorator : states.pressed ? "switch-pressed" : "switch"
        };
      }
    },

    "cv-widget/up" : "cv-widget/actor",
    "cv-widget/down" : "cv-widget/actor",
    "cv-widget/info" :  {
      style : function()
      {
        return {
          marginLeft : 15,
          padding : 3,
          minWidth : 100,
          maxWidth : 200,
          allowGrowY : false,
          alignX : "center"
        };
      }
    },

    "cv-widget/actor/label" : {
      style : function(states)
      {
        // apply stylings to the widget
        var tc = "text-label"; // default color
        if (states.red) {
          tc = "red";
        } else if (states.green) {
          tc = "green";
        } else if (states.blue) {
          tc = "blue";
        } else if (states.purple) {
          tc = "purple";
        }

        return {
          textColor : tc
        };
      }
    },
    "cv-widget/label/label" : {
      style : function()
      {
        return {
          textAlign : "right"
        };
      }
    },
    "cv-widget/image" : {
      style : function() {
        return {
          marginLeft: 15,
          padding: 3
        };
      }
    },

    "cv-widget/slider" : {
      style : function() {
        return {
          marginLeft: 15,
          rangeMargin : 5
        };
      }
    },

    "cv-widget/slider/range" : {
      style : function()
      {
        return {
          decorator : "switch"
        };
      }
    },

    "cv-widget/slider/knob" :
    {
      include : "slider/knob",

      style : function()
      {
        return {
          decorator : "switch",
          minWidth : 30
        };
      }
    },

    "link" : {
      style : function()
      {
        return {
          textColor : "line"
        };
      }
    },
    
    "line" : {
      style : function()
      {
        return {
          height: 1,
          decorator: "line",
          margin : 1,
          allowGrowY : false
        };
      }
    },
    
    "break" : {
      style : function()
      {
        return {
          height: 0
        };
      }
    },
    
    "page-title" : {
       style : function()
      {
        return {
          font : "title",
          marginLeft : 15
        };
      }
    },

    /**
     * The 4 navbars
     */
    "navbar-top": {
      style : function()
      {
        return {
          decorator : "navbar-top"
        };
      }
    },
    "navbar-bottom": {
      style : function()
      {
        return {
          decorator : "navbar-bottom"
        };
      }
    },
    "navbar-left": {
      style : function()
      {
        return {
          decorator : "navbar-left"
        };
      }
    },
    "navbar-right": {
      style : function()
      {
        return {
          decorator : "navbar-right"
        };
      }
    }
  }
});
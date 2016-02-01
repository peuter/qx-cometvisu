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
    /**
     * Widget stuff
     */
    "cv-widget" : {
      style : function()
      {
        return {
          padding : [3, 5] ,
          decorator : "widget"
        };
      }
    },
    "text" : "cv-widget",
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
    "cv-widget/label/label" : {
      style : function()
      {
        return {
          textAlign : "right"
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
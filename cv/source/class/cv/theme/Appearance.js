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
          decorator : "footer"
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
          margin : 5,
          padding : 5,
          decorator : "widget"
        };
      }
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
    
    "line" : {
      style : function()
      {
        return {
          height: 1,
          decorator: "line",
          margin : 1
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
    }
  }
});
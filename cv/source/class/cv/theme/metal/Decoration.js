
qx.Theme.define("cv.theme.metal.Decoration",
{
  extend : cv.theme.pure.Decoration,

  decorations :
  {
    "main-gradient" : {
      style : {
        gradientStart : ["main-gradient-start", 0],
        gradientEnd : ["main-gradient-end", 100]
      }
    },

    "cv-widget" : {
      style : {
        width : 1,
        color : "border-main",
        gradientStart : ["main-gradient-start", 0],
        gradientEnd : ["main-gradient-end", 100]
      }
    },

    "switch" : {
      style : {
        innerWidth : 1,
        width : 1,
        radius : 12,
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
        radius : 12,
        color : [ "actor-border-top",  "actor-border-inner", "actor-border-inner", "actor-border-top"],
        innerColor : [ "actor-border-bottom", "actor-border-top", "actor-border-top", "actor-border-bottom"],
        gradientStart : ["actor-gradient-end", 0],
        gradientEnd : ["actor-gradient-start", 100]
      }
    },

    "group" : {
      style : {
        width : 1,
        color : [ "group-border" ],
        radius : 12
      }
    },
    "group-title": {
      style : {
        gradientStart : ["group-title-start", 0],
        gradientEnd : ["group-title-end", 100]
      }
    },

    "navbar-top": {
      style : {
        gradientStart : ["navbar-top-start", 0],
        gradientEnd : ["navbar-top-end", 100]
      }
    },
    "navbar-bottom": {
      style :
      {
        gradientStart : ["navbar-top-end", 0],
        gradientEnd : ["navbar-top-start", 100]
      }
    }
  }
});
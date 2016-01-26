/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * 
 */
qx.Class.define("cv.util.DesignLoader",
{
  statics : {
    loadedDesign : null,
    cssParts : {
      basic : null,
      mobile : null,
      custom : null
    },
    
    load : function(name) {
      if (cv.util.DesignLoader.loadedDesign !== name) {
        // load css files
         for (var partName in cv.util.DesignLoader.cssParts) {
           var part = cv.util.DesignLoader.cssParts[partName];
           if (part !== null) {
             // unload old css
             part.remove();
           }
           // load new css
           part = document.createElement("link");
           part.setAttribute("rel", "stylesheet");
           part.setAttribute("type", "text/css");
           part.setAttribute("href", "resource/cv/designs/"+name+"/"+partName+".css");
           var head = document.getElementsByTagName("head")[0];
           head.appendChild(part);
         }
      }
      
    }  
  }
});

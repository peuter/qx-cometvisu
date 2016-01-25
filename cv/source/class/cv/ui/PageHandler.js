/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * 
 *
 */
qx.Class.define("cv.ui.PageHandler",
{
  extend : qx.ui.container.Stack,

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    
    setCurrentPage : function(selector) {
      var page = null;
      if (qx.lang.Type.isString(selector)) {
        var children = this.getChildren();
        for (var i=children.length-1; i >= 0; i--) {
          if (children[i].getPath() === selector) {
            page = children[i];
            break;
          }
        }
      } else {
        // page object
        page = selector;
      }
      if (page) {
        this.setSelection([page]);
        if (cv.Config.rememberLastPage) {
          qx.module.Storage.setLocalItem('lastpage', page.getPath());
        }
      }
    },
    
    getCurrentPage : function() {
      return this.getSelection()[0];
    }
  },
  
  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */
  destruct : function() {
  }
});

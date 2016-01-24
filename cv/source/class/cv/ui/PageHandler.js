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
    currentPageId : {
      check : "String",
      init : null,
      apply : "_applyCurrentPageId"
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    
    
    addPage : function(page) {
      this.getPages().push(page);
      // add to stack
      this.add(page);
    },
    
    removePage : function(page) {
      this.getPages().remove(page);
    },
    
    _applyCurrentPageId : function(value, old) {
      if (value !== old) {
        var children = this.getChildren();
        for (var i=children.length-1; i >= 0; i--) {
          if (children[i].getId() === value) {
            this.setSelection([children[i]]);
            if (cv.Config.rememberLastPage) {
              qx.module.Storage.setLocalItem('lastpage', children[i].getId());
            }
            break;
          }
        }
      }
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

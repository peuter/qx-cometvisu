/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * Breadcrumb navigation on top 
 */
qx.Class.define("cv.ui.parts.Breadcrumbs",
{
  extend : qx.ui.core.Widget,

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  construct : function() {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.HBox());
    
    // listen to page changes (deferred because page-handler childcontrol is not ready yet)
    new qx.util.DeferredCall(function() {
      var pageHandler = cv.Utils.engine.getChildControl("page-handler");
      pageHandler.addListener("changeSelection", this._onPageChanged, this);
      
      // initialize with root page
      this._onPageChanged(pageHandler.getSelection()[0]);
    }, this).schedule();
    
    
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    /**
     * Handle page changes and update the breadcrumb navigation
     */
    _onPageChanged : function(e) {
      // clear old data
      this._removeAll();
      var page = e instanceof qx.event.type.Data ? e.getData()[0] : e;
      if (page) {
        var path = new qx.data.Array();
        while (page !== null) {
          if (path.length > 0) {
            path.unshift(new qx.ui.basic.Label(">").set({
              padding : [0, 5]
            }));
          }
          var label = new qx.ui.basic.Label(page.getName());
          label.setUserData("path", page.getPath());
          label.addListener("tap", function() {
            cv.Utils.engine.scrollToPage(this.getUserData("path"));
          }, label);
          page = page.getParentPage();
          path.unshift(label);
        }
        
        path.forEach(function(label) {
          this._add(label, {flex:1});
        }, this);
      }
    }
  },
  
  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */
  destruct : function() {
    // remove listener
    cv.Utils.engine.getChildControl("page-handler").removeListener("changeSelection", this._onPageChanged, this);
  }
});

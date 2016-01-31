/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * 
 *
 */
qx.Class.define("cv.ui.parts.Navbar",
{
  extend : qx.ui.core.Widget,

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  
  /**
   * @param position {String} top,bottom,left,right
   */
  construct : function(position) {
    this.base(arguments);
    this._position = position;
    switch (position) {
      case "top":
      case "bottom":
        this._setLayout(new qx.ui.layout.HBox());
        break;
      case "left":
      case "right":
       this._setLayout(new qx.ui.layout.VBox());
        break;
    }
  },

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
    _position : null,
    
    /**
     * 
     * @param widget {cv.structure.IWidget}
     */
    addWidget : function(widget) {
      // as the navbar has content now we can show it
      if (!this.isVisible()) {
        this.show();
      }
      this._add(widget);
      
      // bind navbar visibility to its parent pages visibility
      widget.getParentPage().bind("visibility", widget, "visibility");
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

/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * 
 *
 */
qx.Class.define("cv.ui.parts.Statusbar",
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
    this._html = new qx.ui.embed.Html();
    this.setHeight(null);
    this._add(this._html, {flex: 1});
    this.bind("content", this._html, "html");
  },

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    content :  {
      check : "String",
      init : "",
      event : "changeContent"
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    appendContent : function(html) {
      if (qx.lang.Type.isString(html) && html.length > 0) {
        this.setContent(this.getContent() + html);
        if (!this.isVisible()) {
          this.show();
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

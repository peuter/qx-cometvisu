/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * 
 *
 */
qx.Class.define("cv.ui.basic.Atom",
{
  extend : qx.ui.basic.Atom,

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
  construct : function(label, icon) {
    this.base(arguments, label, null);
    
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
   // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "icon":
          control = new cv.ui.core.Icon(this.getIcon());
          control.setAnonymous(true);
          this._addAt(control, 0);
          if (this.getIcon() === null || this.getShow() === "label") {
            control.exclude();
          }
          break;
      }

      return control || this.base(arguments, id);
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

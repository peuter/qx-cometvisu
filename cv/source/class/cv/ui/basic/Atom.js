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
    this.addListener("pointerdown", this._onPointerDown, this);
    this.addListener("pointerup", this._onPointerUp, this);
  },

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    wrap : {
      check : "Boolean",
      init : false,
      apply : "_applyWrap"
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {
    _applyWrap : function(value) {
      var label = this.getChildControl("label");
      if (label) {
        label.setWrap(value);
      }
    },
    
   // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "icon":
          control = new cv.ui.core.Icon(this.getIcon());
          control.setAnonymous(true);
          control.set({
            allowGrowX : false,
            allowGrowY : false
          })
          this._addAt(control, 0);
          if (this.getIcon() === null || this.getShow() === "label") {
            control.exclude();
          }
          break;
          
        case "label":
          control = this.base(arguments, id);
          control.setWrap(this.getWrap());
          break;
      }

      return control || this.base(arguments, id);
    },
    
    // Event handling
    _onPointerDown : function() {
      this.addState("pressed");
    },
    _onPointerUp : function() {
      this.removeState("pressed");
    }
  },
  
  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */
  destruct : function() {
    this.removeListener("pointerdown", this._onPointerDown, this);
    this.removeListener("pointerup", this._onPointerUp, this);
  }
});

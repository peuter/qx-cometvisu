/**
 * Interface for all structure widgets
 */
qx.Interface.define("cv.ui.structure.IWidget", {
  /*
   *****************************************************************************
      MEMBERS
   *****************************************************************************
   */

   members :
   {
     
     /**
      * Return the data-type if this widget
      * 
      * @return {String} data-type
      */
     getDataType : function() {},
     
     /**
     * Returns the layout options which should be applied when this item gets added to its parent
     * 
     * @returns {Object|null}
     */
     getLayoutOptions : function() {},
     
     
     /**
      * Returns the internal path of the widget in the structure
      * 
      * @returns {String} id*
      */
     getPath : function() {}
   }
});
/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * Some basic configuration settings which do not change during runtime
 *
 */
qx.Class.define("cv.Config",
{
  type : "static",
  

  /*
   *****************************************************************************
      STATICS
   *****************************************************************************
   */
  statics : {
    
    structure : "pure", // structure to use (currently only 'pure' available)
    configSuffix : "", // config file suffix
    clientDesign : undefined, // which design should be loaded, overrides the design setting in config file
    forceReload : false, // force client to reload all data (do not load anything from cache)
    startPage : undefined, // load this page on start
    
    enableAddressQueue : false, // load addresses from first page first
    
    rememberLastPage : false,
   
    /**
     * Parse query string and initalize global config settings
     */
    init : function() {
      var req = qx.util.Uri.parseUri(window.location.href);
      if (req.queryKey.design) {
        cv.Config.clientDesign = req.queryKey.design;
      }
      if (req.queryKey.config) {
        cv.Config.configSuffix = req.queryKey.config;
      }
      if (req.queryKey.forceReload) {
        cv.Config.forceReload = true;
      }
      if (req.queryKey.startPage) {
        cv.Config.startPage = req.queryKey.startPage;
      }
      cv.Config.enableAddressQueue = req.queryKey.enableQueue ? true : false;
    }
  }
});

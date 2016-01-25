/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This is the main application class of your custom application "cv"
 *
 * @asset(cv/*)
 */
qx.Class.define("cv.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);
      
      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      cv.Config.init();

      var bus = qx.event.message.Bus.getInstance();
      bus.subscribe("*", function(msg) {
        console.log("new bus message %o", msg);
      }, this);
      
      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */
     
      
      // init Model
      var light = new cv.model.item.String("Light_FF_Living");
      var present = new cv.model.item.String("Present");
      var workday = new cv.model.item.String("Workday");
      
      var model = cv.Model.getInstance();
      
      model.addItem(light);
      model.addItem(present);
      model.addItem(workday);
      
      
      var client = cv.client.Cometvisu.getInstance();
      client.init("openhab");
      
      var engine = cv.ui.Templateengine.getInstance();
     
      var doc = this.getRoot();
      doc.add(engine, {edge: 0});
      
      
      if (engine.isReady()) {
        engine.loadConfig();
      } else {
        engine.addListenerOnce("changeReady", function(e) {
          if (e.getData() === true) {
            engine.loadConfig();
          }
        }, this);
      }
    }
  }
});

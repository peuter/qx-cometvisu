/* cometvisu.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

/**
 * This is the main application class of the CometVisu based on Qooxdoo
 *
 * @asset(cv/*)
 *
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
      
      // patch the original decorator class
      qx.Class.patch(qx.ui.decoration.Decorator, cv.ui.decoration.MLinearBackgroundGradient);
      qx.Class.patch(qx.ui.decoration.Decorator, cv.ui.decoration.MBorderImageGradient);

      // patch widget to allow excluding by appearance
      qx.Class.patch(qx.ui.core.Widget, cv.mixin.MExcluded);
      
      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        //noinspection BadExpressionStatementJS
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        //noinspection BadExpressionStatementJS
        qx.log.appender.Console;
      }

      cv.Config.init();
      cv.Utils.init();

      var bus = qx.event.message.Bus.getInstance();
      bus.subscribe("*", function(msg) {
        console.log("new bus message '%s': %o", msg.getName(), msg.getData());
      }, this);
      
      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */


      
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

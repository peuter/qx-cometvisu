/**
 * Interface for transport protocols
 */
qx.Interface.define("cv.client.ITransport", {
  /*
   *****************************************************************************
      MEMBERS
   *****************************************************************************
   */

   members :
   {
     handleSession : function() {},
     
     beforeSend : function() {},
     
     readResendHeaderValues : function() {},
     
     isRunning : function() {},
     
     abort : function() {},
     
     restart : function() {}
   }
});
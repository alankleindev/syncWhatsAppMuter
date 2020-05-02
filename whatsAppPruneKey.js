exports.handler = function(context, event, callback) {
    
    // This Function prunes a Sync Map Key, for testing repeated inbound messages
    // Syntax when running: Function URL/?key=%2b15555551212 (replace 15555551212 with number you want to clear)
    // API Documentation: https://www.twilio.com/docs/sync/api/map-item-resource
	
	const twilioClient = context.getTwilioClient();
	
	let key = event.key || 0;
	
	// ***CONFIG STEPS***
	
      // ** UPDATE THIS VALUE TO YOUR DEFAULT SYNC SERVICE SID **
      // https://www.twilio.com/console/sync/services (when logged into the Twilio Console)
      const syncService = 'IS.....'; 
  
      // ** UPDATE THIS VALUE USING THE SID FROM THE SYNC MAP CREATE FUNCTION - whatsAppCreateSyncMap.js **
      const syncMap = 'MP.....'; 
	    
	// *** END CONFIG STEPS	    
	
	if (key) {
	twilioClient.sync.services(syncService)
           .syncMaps(syncMap)
           .syncMapItems(event.key)
           .remove()
           .then( () => {
               console.log(`*** ${key} - Key Deleted ***`);
               callback(null, {result: `*** ${key} - Key Deleted ***`});
           })
           .catch(err => {
               console.log(`Ann Error Occured - ${err}`);
               callback(err);
           });
	} else {
	    console.log("*** No Key Provided ***");
	    callback();
	}
	
};
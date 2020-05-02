exports.handler = function(context, event, callback) {
    
    // Run this function one time, to create the Sync Map Used by the Muter function
    // Capture the Sync Map SID for use in the Muter Function syncMap constant
    // Documentation: https://www.twilio.com/docs/sync/api/map-resource
    
	const twilioClient = context.getTwilioClient();
	
	// ***CONFIG STEPS***
	
	    // ** UPDATE THIS VALUE TO YOUR DEFAULT SYNC SERVICE SID **
    	// https://www.twilio.com/console/sync/services (when logged into the Twilio Console)
	    const syncService = 'IS.....';
	    
	// *** END CONFIG STEPS	    
	
	twilioClient.sync.services(syncService)
           .syncMaps
           .create({uniqueName: 'WhatsAppMuter'})
            .then(sync_map => {
               let result = (`Your Sync Map SID is ${sync_map.sid}, use it in your muter function.`);
               callback(null, {result: result })})
            .catch(err => {
                console.log({ error: err });
                callback(err);
            });
};
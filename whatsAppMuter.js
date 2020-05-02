exports.handler = function(context, event, callback) {
    
    // NOTE: ** You Must Run the Sync Map Create Function Only The First Time **
    // Point your WhatsApp "WHEN A MESSAGE COMES" URL to this Function
    // If the From user is new, this function will create a Sync Map key for them and redirect to your TwiML source
    // If the From user has previously send an inbound message, this function will prevent further processing
    // API Documentation: https://www.twilio.com/docs/sync/api/map-item-resource
    
    const twilioClient = context.getTwilioClient();
    const twiml = new Twilio.twiml.MessagingResponse();
	
	let whatsAppFrom = event.From.split(":");
	
	// ***CONFIG STEPS***
	
	    // ** UPDATE THIS VALUE USING SID FROM SYNC MAP CREATE FUNCTION **
	    // https://www.twilio.com/console/sync/services (when logged into the Twilio Console)
	    const syncService = 'IS.....'; 
	
	    // ** UPDATE THIS VALUE TO YOUR DEFAULT SYNC SERVICE SID **
	    // https://www.twilio.com/console/sync/services (when logged into the Twilio Console)
	    const syncMap = 'MP.....'; 
	
	    // ** UPDATE THIS VALUE TO A TWIML SOURCE TO REDIRECT NEW INTERACTIONS TO
	    const redirect = 'https://webhooks.twilio.com/v1/Accounts/AC...../Flows/FW.....';
	
	// *** END CONFIG STEPS
	
	twilioClient.sync.services(syncService)
        .syncMaps(syncMap)
        .syncMapItems(whatsAppFrom[1])
        .fetch()
        .then(sync_map_item => {
            console.log(`Sync Map Key Exists for ${sync_map_item.key}`);
            console.log('BAILOUT!!!');
            callback(null, {result: 'BAILOUT!!!'});
        })
        .catch(err => {
            twilioClient.sync.services(syncService)
                .syncMaps(syncMap)
                .syncMapItems
                .create({key: whatsAppFrom[1], data: {}})
                .then(sync_map_item => {
                    console.log(`Sync Map Key Created for ${whatsAppFrom[1]}`);
                    // Return TwiML to Process this New Inbound WhatsApp Interaction (not interacted before)
                    console.log('Redirecting to TwiML Source!');
                    twiml.redirect(redirect);
                    callback(null, twiml);
                })
                .catch(err => {
                    console.log(err);
                    callback(err);
                });
            });
};
## This repo

This repo contains 3 Twilio Functions that will suppress more then one response to an inbound Twilio WhatsApp inbound request.

## Usage

There are three functions is this repo.

1. whatsAppCreateSyncMap.js

This function creates the initial Twilio Sync map which will be used to store the From numbers from WhatsApp interactions, to maintain state. Run this function only once, to create the initial sync map used by whatsAppMuter.js.

2. whatsAppPruneKey.js

This function will delete a From key from the Sync Map, useful when testing and sending multiple inbound requests to elicit responses. You run this Twilio function by passing in a query parameter to this Twilio Function in the form of: YOUR_FUNCTION/PATH?key=%2b15555551212 (replace the 15555551212 with the number you want to clear from the Sync Map).

3. whatsAppMuter.js

This is the main function. When an inbound Twilio WhatsApp request comes in, this Function should execute (you point your WhatsApp phone number "When A Message Comes" to this Function). It will check to see if the WhatsApp From number is already a key in the Sync Map. If so, it will bail out (no action taken). If the From number is not an existing key, it means this is a new interaction from that WhatsApp phone number. The From will be entered in the Sync Map and the WhatsApp message will be redirected to a TwiML source.


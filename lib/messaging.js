let mobileContactsModel = require('../models/mobileContacts');
let sentMessagesModel = require('../models/sentMessages');
let twilioClient = require('twilio')(process.env.twilio_account_sid, process.env.twilio_auth_token);

module.exports = {
    /**
     * 
     * @param {String} message Text message 
     * @param {String} audioMessageFileName Name for the audio file to use for sending voice messages
     */
    triggerBulkMessageSending: async function(message, audioMessageFileName) {
        this.sendBulkMessages(message, audioMessageFileName);
        this.sendBulkMessagesCST(message, audioMessageFileName);
        this.sendBulkMessagesPST(message, audioMessageFileName);
    },
    /**
     * 
     * @param {String} message Text message 
     * @param {String} audioMessageFileName Name for the audio file to use for sending voice messages
     */
    sendBulkMessages: async function(message, audioMessageFileName) {
        // Local/default server time zone is EST
        let records = await mobileContactsModel.getESTContacts();
        let currenTimeStamp = Date.now();
        let date = new Date();
        date.setHours(10);
        let timeoutSeconds = (date.getUTCMilliseconds() - currenTimeStamp);
        setTimeout(() => {
            records.forEach((record) => {
                let messageResponse = await this.sendTextMessage(record.mobile, message);
                sentMessagesModel.addMessage({ contactId: record.id, message: message, messageSid: messageResponse.sid, messageType: 'text', audioFileName: '', status: messageResponse.status });
            });
        }, timeoutSeconds);

        // Timeout to send voice message after 2 hour for successful messages
        setTimeout(() => {
            let records = await sentMessagesModel.getAllDeliveredMessages('text', 'EST');
            records.forEach((record) => {
                let callResponse = await this.sendVoiceMessage(record.mobile, audioMessageFileName);
                sentMessagesModel.addMessage({ contactId: record.id, message: '', messageSid: callResponse.sid, messageType: 'voice', audioFileName: audioMessageFileName, status: callResponse.status });
            });
        }, timeoutSeconds + 7200000);

        // Timeout to send voice message after 1 hour for unsuccessful messages
        setTimeout(() => {
            let records = await sentMessagesModel.getAllFailedMessages('text', 'EST');
            records.forEach((record) => {
                let callResponse = await this.sendVoiceMessage(record.mobile, audioMessageFileName);
                sentMessagesModel.addMessage({ contactId: record.id, message: '', messageSid: callResponse.sid, messageType: 'voice', audioFileName: audioMessageFileName, status: callResponse.status });
            });
        }, timeoutSeconds + 3600000);
    },
    /**
     * 
     * @param {String} message Text message 
     * @param {String} audioMessageFileName Name for the audio file to use for sending voice messages
     */
    sendBulkMessagesCST: async function(message, audioMessageFileName) {
        let records = await mobileContactsModel.getCSTContacts();
        let currenTimeStamp = Date.now();
        let date = new Date();
        date.setHours(10);
        // converting to CST
        date = new Date(date.toLocaleDateString('en-us', { timeZone: 'CST' }));
        let timeoutSeconds = (date.getUTCMilliseconds() - currenTimeStamp);
        setTimeout(() => {
            records.forEach((record) => {
                let messageResponse = await this.sendTextMessage(record.mobile, message);
                sentMessagesModel.addMessage({ contactId: record.id, message: message, messageSid: messageResponse.sid, messageType: 'text', audioFileName: '', status: messageResponse.status });
            });
        }, timeoutSeconds);

        // Timeout to send voice message after 2 hour for successful messages
        setTimeout(() => {
            let records = await sentMessagesModel.getAllDeliveredMessages('text', 'CST');
            records.forEach((record) => {
                let callResponse = await this.sendVoiceMessage(record.mobile, audioMessageFileName);
                sentMessagesModel.addMessage({ contactId: record.id, message: '', messageSid: callResponse.sid, messageType: 'voice', audioFileName: audioMessageFileName, status: callResponse.status });
            });
        }, timeoutSeconds + 7200000);

        // Timeout to send voice message after 1 hour for unsuccessful messages
        setTimeout(() => {
            let records = await sentMessagesModel.getAllFailedMessages('text', 'CST');
            records.forEach((record) => {
                let callResponse = await this.sendVoiceMessage(record.mobile, audioMessageFileName);
                sentMessagesModel.addMessage({ contactId: record.id, message: '', messageSid: callResponse.sid, messageType: 'voice', audioFileName: audioMessageFileName, status: callResponse.status });
            });
        }, timeoutSeconds + 3600000);
    },
    /**
     * 
     * @param {String} message Text message 
     * @param {String} audioMessageFileName Name for the audio file to use for sending voice messages
     */
    sendBulkMessagesPST: async function(message, audioMessageFileName) {
        let records = await mobileContactsModel.getCSTContacts();
        let currenTimeStamp = Date.now();
        let date = new Date();
        date.setHours(10);
        // converting to PST
        date = new Date(date.toLocaleDateString('en-us', { timeZone: 'America/Los_Angeles' }));
        let timeoutSeconds = (date.getUTCMilliseconds() - currenTimeStamp);
        setTimeout(() => {
            records.forEach((record) => {
                let messageResponse = await this.sendTextMessage(record.mobile, message);
                sentMessagesModel.addMessage({ contactId: record.id, message: message, messageSid: messageResponse.sid, messageType: 'text', audioFileName: '', status: messageResponse.status });
            });
        }, timeoutSeconds);

        // Timeout to send voice message after 2 hour for successful messages
        setTimeout(() => {
            let records = await sentMessagesModel.getAllDeliveredMessages('text', 'PST');
            records.forEach((record) => {
                let callResponse = await this.sendVoiceMessage(record.mobile, audioMessageFileName);
                sentMessagesModel.addMessage({ contactId: record.id, message: '', messageSid: callResponse.sid, messageType: 'voice', audioFileName: audioMessageFileName, status: callResponse.status });
            });
        }, timeoutSeconds + 7200000);

        // Timeout to send voice message after 1 hour for unsuccessful messages
        setTimeout(() => {
            let records = await sentMessagesModel.getAllFailedMessages('text', 'PST');
            records.forEach((record) => {
                let callResponse = await this.sendVoiceMessage(record.mobile, audioMessageFileName);
                sentMessagesModel.addMessage({ contactId: record.id, message: '', messageSid: callResponse.sid, messageType: 'voice', audioFileName: audioMessageFileName, status: callResponse.status });
            });
        }, timeoutSeconds + 3600000);
    },
    /**
     * 
     * @param {String} mobile 
     * @param {String} message
     * @returns {Promise<Object|null>} 
     */
    sendTextMessage: async function(mobile, message) {
        try {
            let response = await twilioClient.messages
            .create({
                body: message,
                from: '+15017122661',
                statusCallback: 'http://localhost:8080/messages/webhook',
                to: mobile
            });
            return response;
        }
        catch(err) {
            console.log(err);
            return null;
        }
    },
    /**
     * 
     * @param {String} mobile 
     * @param {String} message
     * @returns {Promise<Object|null>} 
     */
     sendVoiceMessage: async function(mobile, audioMessageFileName) {
        try {
            let response = await twilioClient.calls
            .create({
                url: `http://localhost:8080/messages/audio/${audioMessageFileName}`,
                from: '+15017122661',
                to: mobile
            });
            return response;
        }
        catch(err) {
            console.log(err);
            return null;
        }
    }
}
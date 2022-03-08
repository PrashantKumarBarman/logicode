let sentMessagesModel = require('../models/sentMessages');
let path = require('path');

let audioBasePath = path.join(proces.cwd(), 'audio');

module.exports = {
    updateTextMessageStatus: function(req, res) {
        sentMessagesModel.updateMessageStatusBySid(req.body.MessageStatus, req.body.MessageSid, 'text');
    },
    sendAudio: function(req, res) {
        let audioFilePath = path.join(audioBasePath, req.params.filename);
        res.sendFile(audioFilePath, (err) => {
            if(err) {
                console.log(err);
            }
        })
    }
}
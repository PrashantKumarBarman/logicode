let express = require('express');
let router = express.Router();
let messagingController = require('../controllers/messaging');

router.post('/webhook/message/status', messagingController.updateTextMessageStatus);

module.exports = router;
require('dotenv').config();
let express = require('express');
let messagingLib = require('./lib/messaging');
let messagingRouter = require('./routes/messaging');

let app = express();
let port = process.env.port || 8080;

let message = 'Some text message';
let audioMessageFileName = 'hello.mp3';
messagingLib.triggerBulkMessageSending(message, audioMessageFileName);

app.use(express.json());

app.use('messages', messagingRouter);

app.listen(port, () => {
    console.log(`Server is listening on port:${port}`);
})
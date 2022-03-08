let mysqlConnection = require('../db/mysql');

module.exports = {
    /**
     * @param {Object} messageObject
     * @returns {Promise<Array<Object>>}
     */
    addMessage: async function(messageObject) {
        let sql = `insert into sent_messages(contact_id, message, message_type, message_sid, audio_file_name, status) values(?, ?, ?, ?, ?)`;
        let values = [messageObject.contactId, messageObject.message, messageObject.messageSid, messageObject.messageType, messageObject.audioFileName, messageObject.status];
        let [result] = await mysqlConnection.query(sql, values);
        return result.insertId;
    },
    /**
     * 
     * @param {String} status 
     * @param {String} sid 
     */
    updateMessageStatusBySid: async function(status, sid, messageType) {
        let sql = `update sent_messages set status = ? where message_sid = ? and message_type = ?`;
        let values = [status, sid, messageType];
        let [result] = await mysqlConnection.query(sql, values);
    },
    /**
     * @returns {Promise<Array<Object>>}
     */
    getAllDeliveredMessages: async function(messageType, timeZone) {
        let sql = `select * from sent_messages sm
        inner join mobile_contacts mc on sm.contact_id = mc.id
        where sm.message_type = ? and mc.time_zone = ? and sm.status = 'delivered'`;
        let values = [messageType, timeZone];
        let [rows] = await mysqlConnection.query(sql, values);
        return rows;
    },
    /**
     * @returns {Promise<Array<Object>>}
     */
     getAllFailedMessages: async function(messageType, timeZone) {
        let sql = `select * from sent_messages sm
        inner join mobile_contacts mc on sm.contact_id = mc.id
        where sm.message_type = ? and mc.time_zone = ? and sm.status != 'delivered'`;
        let values = [messageType, timeZone];
        let [rows] = await mysqlConnection.query(sql, values);
        return rows;
    }
};
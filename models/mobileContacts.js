let mysqlConnection = require('../db/mysql');

module.exports = {
    /**
     * 
     * @returns {Promise<Array<Object>>}
     */
    getESTContacts: async function() {
        let [rows] = await mysqlConnection.query(`select * from mobile_contacts where time_zone = 'EST'`);
        return rows;
    },
    /**
     * 
     * @returns {Promise<Array<Object>>}
     */
    getCSTContacts: async function() {
        let [rows] = await mysqlConnection.query(`select * from mobile_contacts where time_zone = 'CST'`);
        return rows;
    },
    /**
     * 
     * @returns {Promise<Array<Object>>}
     */
    getPSTContacts: async function() {
        let [rows] = await mysqlConnection.query(`select * from mobile_contacts where time_zone = 'PST'`);
        return rows;
    }
}
const db = require('../config/db');

const getUsername = async (username) => {
    const [rows] = await db.query('SELECT * FROM users WHERE user_name = ?', [username]);
    return rows [0];
};

const getUserId = async (id) => {
    const [rows] = await db.query(`
        SELECT a.*, b.role_code 
        FROM users a 
        JOIN roles b ON a.role_id = b.role_id
        WHERE a.user_id = ?
        `, [id]);
    return rows [0];
}

module.exports = {
    getUsername,
    getUserId
};
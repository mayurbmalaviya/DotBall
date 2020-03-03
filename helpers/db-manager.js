//DBManager class is used to initialize sequelize connection and fetching models for respective database.

require('./globals');
const mysql = require('mysql2');
class DBManager{

	static async setupDBConnectionPool(hostname) {
		const pool = mysql.createPool({
			host: global.CONFIG.mysql.host,
			port: global.CONFIG.mysql.port,
			user: global.CONFIG.mysql.username,
			password: global.CONFIG.mysql.password,
			waitForConnections: true,
			connectionLimit: global.CONFIG.mysql.poolSize
		});
		const promisePool = pool.promise();
		global.proxyConnectionPool = promisePool;
	}
	static async getNodeConnection(hostname) {
		try {
            hostname='dotball';
			if(!global.proxyConnectionPool) {
				DBManager.setupDBConnectionPool(hostname);
			}
			const connection = await global.proxyConnectionPool.getConnection();
			await connection.changeUser({
				database: hostname.replace(/\./g,'_')
			});
			return connection;
		} catch(err) {
			throw err;
		}
	}
}

module.exports=DBManager;

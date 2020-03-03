const BaseModel = require(`../base-model.js`);
class OmdbMovies extends BaseModel {
    constructor(connection) {
        super(connection);
    }

    static getTableName() {
        return 'movies';
    }

    static async countMovies(connection, condition) {
        let query = `select count(*) as TotalMovies FROM ${this.getTableName()} where ${condition}`;
        let [result] = await connection.query(query);
        return result[0];
    }

    static async getMovies(connection, condition = `1=1`) {
        let query = `select * from ${this.getTableName()} where ${condition}`;
        let [result] =  await connection.query(query);
        return result;
     }
}

module.exports = OmdbMovies;
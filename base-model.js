const _=require('lodash');
class BaseModel{
	constructor(object){
		if(object){
			Object.keys(object).forEach((key)=>{
				this[key]=object[key];
			});
		}
	}
	static getPrimaryKey(){
		return 'id';
	}
	static async create(connection,object){
		const [result]=await connection.query(`INSERT INTO ${this.getTableName()} SET ?`,object);
		const obj=new this(object);
		const pk=this.getPrimaryKey();
		if(typeof pk == 'string') {
			if (!object[pk]) {
				obj[pk] = result.insertId;
			}
		}
		return obj;
	}
	static async update(connection,object,condition){
		const cols=Object.keys(object);
		const values=_.map(cols,(column)=>{
			return object[column];
		});
		let query=`UPDATE ${this.getTableName()} SET ${_.map(cols,column=>column+'=?').join(', ')}`;
		if(condition){
			query +=` WHERE ${condition}`;
		}
		const [result]=await connection.query(query,values);
		return result;
	}
	static async destroy(connection,condition){
		let query=`DELETE FROM ${this.getTableName()}`;
		
		if(condition){
			query +=` WHERE ${condition}`;
		}
		const [result]=await connection.query(query);
		return result;
	}
	static async bulkCreate(connection, arrayOfTuple) {
		let values = [];
		for(let i=0; i<arrayOfTuple.length; i++) {
			let value = Object.values(arrayOfTuple[i]);
			values.push(value);
		}

		let attributes = Object.keys(arrayOfTuple[0]);

		const query = `INSERT INTO ${this.getTableName()} (${attributes}) VALUES ?`;
		const [result] = await connection.query(query,[values]);
		return  result;
	}

}

module.exports=BaseModel;

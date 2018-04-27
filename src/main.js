/*
    auther : zane
    version: 1.0.0
    blog:http://blog.seosiwei.com
    github:https://github.com/wangweianger/node-transform-mysql
    npm:
*/

import * as common from './common'
import * as curd from './curd'


//合并
let sqljson = Object.assign({},common,curd)

//建立sql对象
function mysql(){
    this.sqlObj = {}
}

for(let key in sqljson){
    mysql.prototype[key]=sqljson[key]
}

async function execute (options={},opt1){
	let config = {
		host:options.host||'localhost',
		user:options.user||'root',
		password:options.password||'123456',
		database:options.database||'test',
		port:options.port||'3306',
	}
	Object.assign(config,options)

	let mysql2 = require('mysql2/promise');

	let connection = await mysql2.createConnection(config);
    let [result, fields] = await connection.execute(opt1);
    await connection.end();
    return result
}


module.exports = {
	execute:execute,
	sql:new mysql()
}



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

async function execute(config={},sqlstring){
	return new Promise(function(resolve,reject){
		let mysql      = require('mysql');
		let connection = mysql.createConnection(config);
		connection.connect();
		connection.query(sqlstring, function (error, results, fields) {
		  if (error){
		  	reject(error);
		  }else{
		  	resolve(results);
		  } 
		});
		connection.end();	
	})
}

async function query(connection,sqlstring){
	return new Promise(function(resolve,reject){
		connection.query(sqlstring, function (error, results, fields) {
		  	if (error){
		  		reject(error);
		  	}else{
		  		resolve(results);
		  	} 
		});
	})
}

async function transaction(config={},sqlstringArr=[]){
	if(!sqlstringArr&&!sqlstringArr.length)return;
	return new Promise( async function(resolve,reject){	
		let mysql      = require('mysql');
		let connection = mysql.createConnection(config);
		connection.connect();
		await query(connection,'start transaction;')
		let resuarr = []

		for(let i=0,len=sqlstringArr.length;i<len;i++){
			try{
				let result = await query(connection,sqlstringArr[i])
				resuarr.push(result)
			}catch(err){
				await query(connection,'rollback;')
				connection.end();
				reject(err)
				return
			}
		}
		if(resuarr.length == sqlstringArr.length){
			await query(connection,'commit;')
			connection.end();
			resolve(resuarr)
		}else{
			await query(connection,'rollback;')
			connection.end();
			reject(resuarr)
		}
	})
}

module.exports = {
	execute:execute,
	transaction:transaction,
	sql:new mysql()
}



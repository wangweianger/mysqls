// require('babel-polyfill')
// require('babel-register')

let {execute,sql} = require('./build/main.js')
async function getSqlResult(sqlstring){
	let config={
		host:'localhost',
		user:'root',
		password:'123456',
		database:'web-performance',
		port:'3306',
	}
	return await execute(config,sqlstring)
}


// test
(async function(){





	let sqlstring = sql.table('web_pages').where({id:147}).select()


	let result = await getSqlResult(sqlstring)
	console.log(result)











})()








let { execute,sql,transaction } = require('./build/main.js')



async function run(){

	let config = {
	  host: 'localhost',
	  user: 'root',
	  password:'123456',
	  database: 'web-performance'
	}


	
	let result1 = await execute(config,'select * from web_system')
	console.log(result1)

	try{
		let re2 = await transaction(config,
			['UPDATE web_system SET slowPageTime=slowPageTime-1',
			'UPDATE web_system SET slowJsTime=slowJsTime+1']
		)
		console.log(re2)
	}catch(err){
		console.log('111111111')
		console.log(err)
		
	}

	
}



(async function(){

	await run()

})()









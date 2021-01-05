

let { init, exec, sql, transaction } = require('../build/main.js')
// let { init, exec, sql, transaction } = require('mysqls')

async function run() {

  let config = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'web-performance'
  }
  init(config)



  // 获得生成的sql语句
  const sqlstr = sql.table('web_system').select()
  console.log(sqlstr)

  // 根据生成的sql语句执行
  console.log(await exec(sqlstr))

  // 生成sql语句并立即执行
  console.log(await sql.table('web_system').select(true).exec());

  console.log(sql.table('web_system').data({ slowPageTime: 'slowPageTime-1' }).update())

  // 事务
  try {
    let re2 = await transaction([
      sql.table('web_system').data({ slowPageTime: 'slowPageTime-1' }).update(),
      sql.table('web_system').data({ slowJsTime: 'slowJsTime+1' }).update()
      // 'UPDATE web_system SET slowPageTime=slowPageTime-1',
      // 'UPDATE web_system SET slowJsTime=slowJsTime+1'
    ])
    console.log(re2)
  } catch (err) {
    console.log('111111111')
    console.log(err)
  }
}

run()









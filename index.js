import "babel-polyfill"
require('babel-register')

// let sql = require('./build/main.js')
// import sql from './build/main.js'
// console.log(sql)

import mysql,{sql} from './src/main'

console.log(mysql)


// let sqlstr = sql.table('user')  
//             .field('id,name,class')
//             // .where({type:1,status:{ eq:100,egt:10},sex:2,_type:'and'})
//             .where([
//                 {type:1,status:{ eq:100,egt:10},_type:'or',_nexttype:'and'},
//                 {sex:1,_nexttype:'or'},
//                 {name:'zhangsan',sum:{elt:100,notin:'1,3,8'},_type:'or'}
//             ])
//             // .where({type:{ eq:100,notin:'1,8',_type:'and'}})
//             .data('name=zane&email=752636052@qq.com')
//             .order(['id','number asc'])
//             // .limit(10,20)
//             .page(2,10)
//             .group('id,name')
//             .having('count(number)>3')
//             // .union('SELECT name FROM table1',true)
//             // .union('SELECT name FROM table2',true)
//             .union(['SELECT name FROM table1','SELECT name FROM table2'],true)
//             .comment('查询个人数据')
//             .select();



// let sqlstr = sql.table('fea_company')
//             .where({id:1,companyCode:'hy-ems'})
//             .select();


// let sqlstr = sql.table('fea_company')
//             // .data('name=1&email=752636052@qq.com')
//             .data({age:'age+20'})
//             .update();
let sqlstr =  sql.table('web_system').data({ slowPageTime: 'slowPageTime-1'}).update()

console.log(sqlstr)

// let sqlstr = sql.table('user')
//             .where({id:{ eq:2,egt:10,_type:'or'}})
//             .select();
// let data={
//         id:1
//     }

// let table = sql.field('id,name').table('node_table').group('field').select()


// console.log(sql.table(table).group('field').where('id=1').order('status').select())

// console.log(sql.table('node_table').where('id=1').select()) 

// console.log(sql.table(`(${sql.table('user').where('id=2').select()})`).where('name=`zhangsan`').select()) 

// let data={
//     name:'zane',
//     email:'752636052@qq.com'
// }
// let insertSql = sql.table('user').data(data).insert();
// console.log(insertSql)

// let updateSql = sql
//             .table('user')
//             .data(data)
//             .update()
// console.log(updateSql)

// let sqlstring = sql.table('node_table').group('user_id').where('id=1').having('count(number)>3').select()

// console.log(sqlstring)

// let delSql = sql.table('user').where('name=`zane`').delet();
// console.log(delSql)





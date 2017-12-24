// import "babel-polyfill"
require('babel-register')

import sql from './src/main'


let sqlstr = sql.table('user')  
            .field('id,name,class')
            // .where({type:1,status:{ eq:100,egt:10},sex:2,_type:'and'})
            .where([
                {type:1,status:{ eq:100,egt:10},_type:'or',_nexttype:'and'},
                {sex:1,_nexttype:'or'},
                {name:'zhangsan',sum:{elt:100,notin:'1,3,8'},_type:'or'}
            ])
            // .where({type:{ eq:100,notin:'1,8',_type:'and'}})
            .data('name=zane&email=752636052@qq.com')
            .order(['id','number asc'])
            // .limit(10,20)
            .page(2,10)
            .group('id,name')
            .having('count(number)>3')
            // .union('SELECT name FROM table1',true)
            // .union('SELECT name FROM table2',true)
            .union(['SELECT name FROM table1','SELECT name FROM table2'],true)
            .comment('查询个人数据')
            .select();

// console.log(sqlstr)

let insertSql = sql.table('user').data('name=zane&email=752636052@qq.com').insert();
console.log(insertSql)

let updateSql = sql.table('user').data('name=zane&email=752636052@qq.com','update').update();
console.log(updateSql)

//SELECT * FROM user where type=1 AND status=1

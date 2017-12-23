// import "babel-polyfill"
require('babel-register')

import sql from './src/main'


let sqlstr = sql.table('user')  
            .field('id,name,class')
            .where('type=1 AND status=1')
            .data('name=zane&email=752636052@qq.com')
            .order(['id','number asc'])
            .limit(10,20)
            .page(2,10)
            .select();

console.log(sqlstr)


//SELECT * FROM user where type=1 AND status=1

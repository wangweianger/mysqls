// import "babel-polyfill"
require('babel-register')

import sql from './src/main'


let sqlstr = sql.table('user')  
            .field('id,name,class')
            .where('type=1 AND status=1')
            .select();

console.log(sqlstr)


//SELECT * FROM user where type=1 AND status=1



import * as common from './common'

// import select from './select'

function mysql(){
    this.sqlstr = {}
}

let sql = new mysql();

for(let key in common){
    mysql.prototype[key]=common[key].bind(sql)
}


let sqlstr = sql.table('user')  
            .field('id,name,class')
            .where('type=1 AND status=1')
            .select();

console.log(sqlstr)


//SELECT * FROM user where type=1 AND status=1


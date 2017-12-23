/*
    auther : zane
    version: 1.0.0
    blog:http://blog.seosiwei.com
    github:https://github.com/wangweianger/node-transform-mysql
    npm:
*/

import * as common from './common'
import * as select from './select'

let sqljson = Object.assign({},common,select)

function mysql(){
    this.sqlstr = {}
}

let sql = new mysql();

for(let key in sqljson){
    mysql.prototype[key]=sqljson[key].bind(sql)
}

export default sql

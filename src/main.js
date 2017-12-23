/*
    auther : zane
    version: 1.0.0
    blog:http://blog.seosiwei.com
    github:https://github.com/wangweianger/node-transform-mysql
    npm:
*/

import * as common from './common'
import * as select from './select'

//合并
let sqljson = Object.assign({},common,select)

//建立sql对象
function mysql(){
    this.sqlObj = {}
}

//建立对象
let sql = new mysql();

for(let key in sqljson){
    mysql.prototype[key]=sqljson[key].bind(sql)
}

export default sql

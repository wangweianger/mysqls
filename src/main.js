/*
    auther : zane
    version: 1.0.0
    blog:http://blog.seosiwei.com
    github:https://github.com/wangweianger/node-transform-mysql
    npm:
*/

import * as common from './common'
import * as curd from './curd'

//合并
let sqljson = Object.assign({},common,curd)

//建立sql对象
function mysql(){
    this.sqlObj = {}
}

let newObj = new mysql()

for(let key in sqljson){
    mysql.prototype[key]=sqljson[key].bind(newObj)
}

module.exports = newObj

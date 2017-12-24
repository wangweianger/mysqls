import {
    getOptToString,
    checkOptType,
    checkOptObjType,
    expressionQuery
} from './uitl.js'


//需要查询的table表  参数：String  案例：table('user')
export function table(opt){
    if(opt) this.sqlObj.table = opt
    return this;
} 

/*query输入sql查询
  参数为 String
  案例： query('SELECT * FROM user_name')
*/
export function query(opt){
    if(opt) this.sqlObj.query = opt
    return this;
}

/*where条件
  参数为 String | Array | Object 
  案例： 
*/
export function where(opt){
    let result = ''
    if(typeof(opt)==='string'){
        result = opt
    }else{
        result = getOptToString(opt)
    }
    if(result) this.sqlObj.where = result
    return this;
}

/*查询字段
  参数为 String | Array
  案例： field('id,name,age,sex')  | field(['id','name','age','sex'])
*/
export function field(opt){
    if(typeof(opt)==='object'){
        opt = opt.join(',')
    }
    this.sqlObj.field = opt
    return this;
}

/*设置别名
  参数为 String
  案例： alias('a')
*/
export function alias(opt){
    this.sqlObj.alias=opt
    return this;
}

/*设置data数据
  参数为 json | string
  案例： {name:'zane',email:'752636052@qq.com'}  |  'name=zane&email=752636052@qq.com'
*/
export function data(opt,type='insert'){
    let keys    =''
    let values  =''
    let result  = ''
    let newopt  ={}

    if(typeof(opt)==='string'){
        let arr = opt.split('&')
        arr.forEach(item=>{
            let itemarr = item.split('=')
            newopt[itemarr[0]]=itemarr[1]
        })
    }else{
        newopt=opt
    }
    if(type === 'insert'){
        for(let key in newopt){
            keys    = keys ? `${keys},${key}` : key
            values  = values ? `${values},${checkOptType(newopt[key])}` : checkOptType(newopt[key])
        }
        this.sqlObj.data=`(${keys}) VALUES (${values})`
    }else{
        let keys = Object.keys(newopt)
        keys.forEach((item,index)=>{
            result =  index==newopt.length-1 ?
                      `${result}${item}=${checkOptType(newopt[item])},`:
                      `${result}${item}=${checkOptType(newopt[item])}`
        })
        this.sqlObj.data = result
    }
    return this
}

/*order排序
  参数为 Array | string
  案例： order(['id','number asc'])  | order('id desc')
*/
export function order(opt,type=true){
    let orderby = 'ORDER BY'

    if(typeof(opt) === 'object'){
        opt = opt.join(',')
    }

    this.sqlObj.order = `${orderby} ${opt}`
    return this
}

/*limit 语句
  参数类型 ： Number
  案例 limit(10)  | limit(10,20)
 */
export function limit(){
    this.sqlObj.limit = `LIMIT ${Array.prototype.slice.apply(arguments)}` 
    return this
}

/*page 语句
  参数类型 ： Number
  案例 page(1,10)  | page(2,10)
 */
export function page(){
    let opt     = Array.prototype.slice.apply(arguments)
    let begin   = (opt[0]-1) * opt[1]
    let end     = begin + opt[1] -1

    this.sqlObj.limit = `LIMIT ${begin},${end}` 
    return this
}

/*group 语句
  参数类型 ： String
  案例        group('id,name')
 */
export function group(opt){
    this.sqlObj.group = `GROUP BY ${opt}`
    return this
}

/*having 语句
    参数类型： String
    案例：    having('count(number)>3')
 */
export function having(opt){
    this.sqlObj.having = `HAVING ${opt}`
    return this
}

/*union 语句
    参数类型： String | Array
    案例： union('SELECT name FROM node_user_1') | union(['SELECT name FROM node_user_1','SELECT name FROM node_user_2'])
 */
export function union(opt,type=false){
    if(typeof(opt) === 'string'){
        if(this.sqlObj.union){
            this.sqlObj.union = `${this.sqlObj.union} ${type?'UNION ALL':'UNION'} (${opt})`
        }else{
            this.sqlObj.union = `(${opt})`
        }
    }else if(typeof(opt)==='object'){
        this.sqlObj.union = `(${opt.join( type?') UNION ALL (':') UNION (' )})`
    }
    return this
}

/*distinct 语句
    参数类型： Boolean
    案例： distinct(true)
 */
export function distinct(opt){
    if(opt){
        this.sqlObj.distinct = 'DISTINCT'
    }
    return this
}

/* lock 锁语法
    参数类型： Boolean
    案例：  lock(true)
 */
export function lock(opt){
    if(opt){
        this.sqlObj.lock = 'FOR UPDATE'
    }
    return this
}

/* comment 为sql语句添加注释
    参数类型： String
    案例：  comment('查询用户的姓名')
 */
export function comment(opt){
    if(opt){
        this.sqlObj.comment = `/* ${opt} */`
    }
    return this
}

export function count(opt){
    let optvalue = opt || 1
    this.sqlObj.count = `count(${optvalue})`
    return this
}

export function max(opt){
    if(opt) {
        this.sqlObj.max = `max(${optvalue})`
    }
    return this
}

export function min(opt){
    if(opt) {
        this.sqlObj.min = `min(${optvalue})`
    }
    return this
}

export function avg(opt){
    if(opt) {
        this.sqlObj.avg = `avg(${optvalue})`
    }
    return this
}

export function sum(opt){
    if(opt) {
        this.sqlObj.sum = `sum(${optvalue})`
    }
    return this
}







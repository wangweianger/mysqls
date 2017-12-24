
//table表
export function table(opt){
    this.sqlObj.table = opt
    return this;
} 

/*query输入sql查询
  参数为 String
  案例： query('SELECT * FROM user_name')
*/
export function query(opt){
    this.sqlObj.query = opt
    return this;
}

/*where条件
  参数为 String | Array | Object |
  案例： 
*/
export function where(opt){
    this.sqlObj.where = opt
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
export function data(opt){
    let keys=''
    let values=''
    let newopt={}

    if(typeof(opt)==='string'){
        let arr = opt.split('&')
        arr.forEach(item=>{
            let itemarr = item.split('=')
            newopt[itemarr[0]]=itemarr[1]
        })
    }else{
        newopt=opt
    }

    for(let key in newopt){
        keys    = keys ? `${keys},${key}` : key
        values  = values ? `${values},${newopt[key]}` : newopt[key]
    }

    this.sqlObj.data=`(${keys}) VALUES (${values})`
    return this
}

/*order排序
  参数为 Array | string
  案例： order(['id','number asc'])  | order('id desc')
*/
export function order(opt){
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




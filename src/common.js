
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

//把查询参数转换为strng
function getOptToString(opt){
    let result  = ''
    let optType = Object.prototype.toString.call(opt)
    if(optType==='[object Object]'){
        let _type = opt._type&&opt._type.toUpperCase() || 'AND'
        let number = opt._type&&opt._type.trim()?1:0

        let keys = Object.keys(opt)
        keys.forEach((item,index)=>{
            if(item === '_type') return;
            if(typeof(opt[item])==='object'){
                if(index === keys.length-1-number){
                    result = result +  `${checkOptObjType(item,opt[item])}`
                }else{
                    result = result +  `${checkOptObjType(item,opt[item])} ${_type} `
                }
            }else{
                if(index === keys.length-1-number){
                    result = result + `${item}=${checkOptType(opt[item])}`
                }else{
                    result = result + `${item}=${checkOptType(opt[item])} ${_type} `  
                }
            }
        })
    }else if(optType === '[object Array]'){
        opt.forEach((item,index)=>{
            let result1     =''
            let number      = 0
            let _type       = item._type&&item._type.toUpperCase() || 'AND'
            let _nexttype   = item._nexttype || 'AND' 
            number          = item._type&&item._type.trim()?number+1:number
            number          = item._nexttype&&item._nexttype.trim()?number+1:number

            let keys = Object.keys(item)
            keys.forEach((chi_item,index)=>{
                if(chi_item === '_type'||chi_item === '_nexttype') return;
                if(result1){
                    if(typeof(item[chi_item]) === 'object'){
                        result1 = result1 +  `${_type} ${checkOptObjType(chi_item,item[chi_item])}`
                        // result1 = result1 + `${_type} ${chi_item}=${checkOptType(item[chi_item])} `
                    }else{
                        result1 = result1 + `${_type} ${chi_item}=${checkOptType(item[chi_item])} ` 
                    }
                }else{
                    if(typeof(item[chi_item]) === 'object'){
                        result1 = `${checkOptObjType(chi_item,item[chi_item])}`
                        // result1 = `${chi_item}=${checkOptType(item[chi_item])} `
                    }else{
                        result1 = `${chi_item}=${checkOptType(item[chi_item])} ` 
                    }
                }
            })
            
            index === opt.length-1?
                result1 = `(${result1})` :
                result1 = `(${result1}) ${_nexttype.toUpperCase()}`

            result =`${result} ${result1}`
        })
    }
    return result
}

function checkOptType(opt){
    let result
    switch(Object.prototype.toString.call(opt)){
        case "[object String]":
            result = '`'+opt+'`'
            break;
        case "[object Boolean]": case "[object Number]":
            result = opt
            break; 
        default:
            result = opt      
    }
    return result
}


function checkOptObjType(pre_key,val){
    let result=''
    let type = Object.prototype.toString.call(val)

    if(type === '[object Object]'){
        let keys = Object.keys(val)
        let number = val._type&&val._type.trim()?1:0

        keys.forEach((item,index)=>{
            if(item === '_type') return; 

            let _type = val._type || 'AND'
            result = result + expressionQuery(
                                pre_key,
                                item,
                                val[item],
                                _type.toUpperCase(),
                                index === keys.length-1-number?true:false
                              )
        })
    }else{
        result = `${pre_key}=${val}`
    }
    return `(${result})`
}

function expressionQuery(par_key,chi_key,value,_type,isLastOne){
    console.log(isLastOne)
    let result=''
    switch(chi_key.toUpperCase()){
        case 'EQ':
            result = `(${par_key}=${checkOptType(value)})`
            break;
        case 'NEQ':
            result = `(${par_key}<>${checkOptType(value)})`
            break; 
        case 'GT':
            result = `(${par_key}>${checkOptType(value)})`
            break; 
        case 'EGT':
            result = `(${par_key}>=${checkOptType(value)})`
            break; 
        case 'LT':
            result = `(${par_key}<${checkOptType(value)})`
            break; 
        case 'ELT':
            result = `(${par_key}<=${checkOptType(value)})`
            break;                
        case 'LIKE':
            result = `(${par_key} LIKE ${checkOptType(value)})`
            break; 
        case 'NOTLIKE':
            result = `(${par_key} NOT LIKE ${checkOptType(value)})`
            break; 
        case 'BETWEEN':
            result = `(${par_key} BETWEEN ${value.replace(',',' AND ')})`
            break; 
        case 'IN':
            result = `(${par_key} IN (${value}))`
            break;  
        case 'NOTIN':
            result = `(${par_key} NOT IN (${value}))`
            break;                 
        default:
            result = `(${par_key}=${checkOptType(value)})`    
    }
    return isLastOne ? `${result} ` : `${result} ${_type} `
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
        values  = values ? `${values},${checkOptType(newopt[key])}` : checkOptType(newopt[key])
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

















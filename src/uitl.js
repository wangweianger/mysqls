//把查询参数转换为strng
export function getOptToString(opt){
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
                    }else{
                        result1 = result1 + `${_type} ${chi_item}=${checkOptType(item[chi_item])} ` 
                    }
                }else{
                    if(typeof(item[chi_item]) === 'object'){
                        result1 = `${checkOptObjType(chi_item,item[chi_item])}`
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

//检查值类型返回相应值
export function checkOptType(opt){
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

//检查object值类型 返回相应值
export function checkOptObjType(pre_key,val){
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
    return `(${result}) `
}

// 表达式匹配查询
export function expressionQuery(par_key,chi_key,value,_type,isLastOne){
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
        case 'NOTBETWEEN': 
            result = `(${par_key} NOT BETWEEN ${value.replace(',',' AND ')})`
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

//排序 生成 sql 字符串
export function sortSelectSql(json){
    let result          = json || {}
    if(result.count||result.max||result.min||result.avg||result.sum){
        let concatstr=(result.count?`,${result.count}`:'')
                +(result.max?`,${result.max}`:'')
                +(result.min?`,${result.min}`:'')
                +(result.avg?`,${result.avg}`:'')
                +(result.sum?`,${result.sum}`:'')
        result.count=result.max=result.min=result.avg=result.sum='';
        result.field? result.field = (result.field+concatstr) : result.field = concatstr.substring(1)
    }
    if(!result.field)result.field = '*' 
    if(result.table) result.table = `FROM ${result.table}`
    if(result.where) result.where = `WHERE ${result.where}`     

    let keys = Object.keys(result)
    let keysresult = []
    // 查询默认排序数组
    let searchSort  =  ['union','distinct','field','count','max','min','avg','sum','table',
                        'alias','where','group','having','order','limit','page','comment']
    //排序                    
    keys.forEach((item1,index1)=>{
        searchSort.forEach((item2,index2)=>{
            if(item1 === item2){
                keysresult[index2] = item1
            }
        })
    })
    return {
        sortkeys:keysresult,
        result:result
    };               
}





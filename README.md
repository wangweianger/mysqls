### [EN](/README.md) | [CN](/README-CN.md)

# mysqls
It is written in JavaScript. crud for mysql. You can also use transactions very easily.

mysqls：A plug-in that generates SQL statements for node.js. call chaining .simple to use. support transaction.

* npm address：https://www.npmjs.com/package/mysqls

## install： 
```js 
npm install mysqls --save
or
yarn add mysqls
```

## mysqls parameters
>  * init:          sql Initialization
>  * exec:          Executing SQL statements
>  * sql:           Chain Call Generates SQL Statement
>  * transaction:   transaction API

## Use：
```js 
//import
import { init, exec, sql, transaction } from 'mysqls'

//require
let { init, exec, sql, transaction } = require('mysqls')
```

## Config initialization：
```js
// You can initialize the configuration at project startup
init({
    host: 'localhost',
    user: 'root',
    password:'123456',
    database: 'test',
    port: 3306,
})
```

### init configs
> * ispool:           Is it initialized as a connection pool. (default:true)
> * host:             host address. (default:'127.0.0.1')
> * user:             user. (default:'root')
> * password:         password.  (default:'root')
> * database:         database.  (default:'test')
> * port:             port.  (default:'3306')
> * waitConnection:   wait for connections.  (default:true)   
> * connectionLimit:  connection limit.   (default:10)   
> * queueLimit:       queue limit.   (default:0)   

### Only Generate SQL statements.
```js
sql
    .table('node_table')
    .field('id,name')
    .where({id:1})
    .select()

// result
SELECT id,name FROM node_table WHERE id=1
```

### use exec function
```js
const sqlstr = sql
    .table('node_table')
    .field('id,name')
    .where({id:1})
    .select();

const result = await exec(sqlstr);
```

### use sql.prototype.exec
```js
const result = sql
    .table('node_table')
    .field('id,name')
    .where({id:1})
    .select(true)
    .exec();
```
* .select(true):true
* It same to use at update(true)、insert(true)、delet(true)、query(true) method.

### use Promise
```js
// use exec function
exec(sql.table('web_pages').where({id:147}).select())
    .then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })

// use exec method
sql.table('web_pages').where({id:147}).select(true).exec()
    .then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
```

### 使用async/await
```js
// use exec function
const result = await exec(sql.table('web_pages').where({id:147}).select())

// use exec method
const result = await sql.table('web_pages').where({id:147}).select(true).exec()
```

### transaction
```js
const tranSqlArr = [
    sql.table('table1').data({number:'number-5'}).update(true,true),
    sql.table('table2').data({number:'number+5'}).update(true,true)
]
const result = await transaction(tranSqlArr)
```

### Simple usage of generating SQL statements.

**select**

```js
sql
    .table('node_table')
    .field('id,name')
    .where({id:1})
    .select()

SELECT id,name FROM node_table WHERE id=1
```

**insert**

```js
sql
    .table('node_table')
    .data({name:'zane',email:'752636052@qq.com'})
    .insert()

INSERT INTO node_table (name,email) VALUES (`zane`,`752636052@qq.com`)
```
**batch insert**

```js
let data = [
    {name:'zane',email:'752636052@qq.com'},
    {name:'zane_1',email:'752636052_1@qq.com'},
    {name:'zane_2',email:'752636052_2@qq.com'},
]
sql
    .table('node_table')
    .data(data)
    .insert()

INSERT INTO node_table (name,email) VALUES ('zane','752636052@qq.com'),('zane_1','752636052_1@qq.com'),('zane_2','752636052_2@qq.com')
```

**update**

```js
sql
    .table('node_table')
    .data({name:'zane',email:'752636052@qq.com'})
    .where({id:1})
    .update()

UPDATE node_table SET name=`zane`,email=`752636052@qq.com`
```

**delet**
 
```js
sql .table('node_table')
    .where({name:'zane'})
    .delet();

DELETE FROM node_table WHERE name=`zane`
```

### Advanced Usage.

```js
// parameter json
sql
    .table('node_table')
    .where({id:1,name:'zane'})
    .select()

SELECT  * FROM node_table WHERE id=1 AND name=`zane`

// parameter array
let data=[
    {id:1,name:'zhangsan',_type:'or'},
    {sex:1,number:3}
]
sql.table('node_table').where(data).select()

SELECT * FROM node_table WHERE (id=1 OR name=`zhangsan` ) AND (sex=1 AND number=3 )

// multiple fields
let data=[
    {id:1,name:'zhangsan',_type:'or',_nexttype:'or'},
    {sex:1,number:3,_type:'and'}
]
sql.table('node_table').where(data).select()

SELECT * FROM node_table WHERE (id=1 OR name=`zhangsan`) OR (sex=1 AND number=3)

// Expression Query
let data={
    id:{eq:100,egt:10,_type:'or'},
    name:'zhangshan'
}
sql.table('node_table').where(data).select()

SELECT  * FROM node_table WHERE ((id=100) OR (id>=10)) AND name=`zhangshan`

// Multiple queries
let data=[{
    id:{eq:100,egt:10,_type:'or'},
    name:'zhangshan',
    _nexttype:'or'
},{
    status:1,
    name:{like:'%zane%'}
}]
sql.table('node_table').where(data).select()

SELECT * FROM node_table WHERE (((id=100) OR (id>=10)) AND name=`zhangshan`) OR (status=1 AND ((name LIKE `%zane%`))) 


//UNION ， UNION ALL 
sql
    .union('SELECT * FROM think_user_1',true)
    .union('SELECT * FROM think_user_2',true)
    .union(['SELECT * FROM think_user_3','SELECT name FROM think_user_4'])
    .union('SELECT * FROM think_user_5',true)
    .select()

result
(SELECT * FROM think_user_1) UNION ALL  
(SELECT * FROM think_user_2) UNION ALL 
(SELECT * FROM think_user_3) UNION 
(SELECT name FROM think_user_4)  UNION  
(SELECT * FROM think_user_5)

```

## Directory

* [**1.synopsis**](/README.md)
  * [**1.1.Parameter Description and Transaction**](/docs/main/main.md)
* [**2.Chain operation**](/docs/chain/README.md)
  * [**2.1.WHERE**](/docs/chain/where.md)
  * [**2.2.TABLE**](/docs/chain/table.md)
  * [**2.3.ALIAS**](/docs/chain/alias.md)
  * [**2.4.DATA**](/docs/chain/data.md)
  * [**2.5.FIELD**](/docs/chain/field.md)
  * [**2.6.ORDER**](/docs/chain/order.md)
  * [**2.7.LIMIT**](/docs/chain/limit.md)
  * [**2.8.PAGE**](/docs/chain/page.md)
  * [**2.9.GROUP**](/docs/chain/group.md)
  * [**2.10.HAVING**](/docs/chain/having.md)
  * [**2.11.UNION**](/docs/chain/union.md)
  * [**2.12.DISTINCT**](/docs/chain/distinct.md)
  * [**2.13.COMMENT**](/docs/chain/comment.md)
* [**3.CURD**](/docs/curd/README.md)
  * [**3.1.SELECT**](/docs/curd/select.md)
  * [**3.2.UPDATE**](/docs/curd/update.md)
  * [**3.3.INSERT**](/docs/curd/insert.md)
  * [**3.4.DELETE**](/docs/curd/delete.md)
* [**4.Query mode**](/docs/advanced/README.md)
  * [**4.1.Basic query**](/docs/advanced/basesearch.md)
  * [**4.2.Expression Query**](/docs/advanced/bdssearch.md)
  * [**4.3.Interval query**](/docs/advanced/qjsearch.md)
  * [**4.4.Composite query**](/docs/advanced/zhsearch.md)
  * [**4.5.Statistical query**](/docs/advanced/tjsearch.md)
  * [**4.6.SQL query**](/docs/advanced/sqlsearch.md)
  * [**4.7.Subquery**](/docs/advanced/childsearch.md)





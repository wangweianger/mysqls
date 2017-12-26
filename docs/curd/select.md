select方法是用的最广泛、同时也是最复杂的查询条件

### 使用方法

在所有sql链式调用方法之后 调用 `.select()` 即为查询

> 所有语法采用链式调用方式
> 默认用 * 查询所有字段，可以使用 .field 方法精确字段查询
> union方法优先级最高，如果查询中有次方法，则其他查询字段无效
> 同时存在 limt 和 page 方法时，page方法将优先于limit方法
> sql的查询方式有很多，尽可能按照正确的sql语句语法查询
> 对所有的方法没有固定的顺序，内部会自动排序


### 简单用法

```js 
sql
    .table('node_table')
    .where('id=1')
    .select()

SELECT * FROM node_table WHERE id=1

sql
    .table('node_table')
    .field('id,name')
    .where({id:1})
    .select()

SELECT id,name FROM node_table WHERE id=1
```


### 高级用法
```js
//参数json多字段
sql
    .table('node_table')
    .where({id:1,name:'zane'})
    .select()

SELECT  * FROM node_table WHERE id=1 AND name=`zane`

//参数数组
let data=[
    {id:1,name:'zhangsan',_type:'or'},
    {sex:1,number:3}
]
sql.table('node_table').where(data).select()

SELECT * FROM node_table WHERE (id=1 OR name=`zhangsan` ) AND (sex=1 AND number=3 )

//多字段连接方式
let data=[
    {id:1,name:'zhangsan',_type:'or',_nexttype:'or'},
    {sex:1,number:3,_type:'and'}
]
sql.table('node_table').where(data).select()

SELECT * FROM node_table WHERE (id=1 OR name=`zhangsan`) OR (sex=1 AND number=3)

//表达式查询
let data={
    id:{eq:100,egt:10,_type:'or'},
    name:'zhangshan'
}
sql.table('node_table').where(data).select()

SELECT  * FROM node_table WHERE ((id=100) OR (id>=10)) AND name=`zhangshan`

//混合查询
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


//UNION ， UNION ALL 组合使用
sql
    .union('SELECT * FROM think_user_1',true)
    .union('SELECT * FROM think_user_2',true)
    .union(['SELECT * FROM think_user_3','SELECT name FROM think_user_4'])
    .union('SELECT * FROM think_user_5',true)
    .select()

得到
(SELECT * FROM think_user_1) UNION ALL  
(SELECT * FROM think_user_2) UNION ALL 
(SELECT * FROM think_user_3) UNION 
(SELECT name FROM think_user_4)  UNION  
(SELECT * FROM think_user_5)

```







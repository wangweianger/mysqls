where方法的用法是mysql查询语句的精髓，也是最复杂的部分，任何一个封装的sql库where会是最复杂的一个部分。
where查询支持 字符串：String , JSON对象 ,数组对象查询 , 表达式查询

### 字符串查询

```js 
//这里需要注意的是传入的字符串需要是合格的sql语法，字符串需要有引号
sql.table('node_table').where('id=1 AND name=`张三`').select()
    
```

最后生成的SQL语句是 
```js
SELECT  * FROM node_table WHERE id=1 AND name=`张三`
```


### JSON对象查询

```js
let data={
    id:1,
    name:'zhangshan'
}
sql.table('node_table').where(data).select()
```

最后得出的SQL语句是
```js
SELECT * FROM node_table WHERE id=1 AND name=`zhangshan`
```

字段之间默认用 AND 链接，若要指定连接方法可以传参数 `_type:'or' ||  _type:'and'`

```js
let data={
    id:1,
    name:'zhangshan',
    _type:'or'
}
sql.table('node_table').where(data).select()
```

最后得出的SQL语句是
```js
SELECT * FROM node_table WHERE id=1 OR name=`zhangshan`
```

### JSON对象数组查询
```js
let data=[{
        id:1,
        name:'zhangsan'
    }]
sql.table('node_table').where(data).select()
```

最后得出的SQL语句是
```js
SELECT * FROM node_table WHERE  (id=1 AND name=`zhangsan`) 
```

多条json数组
```js
let data=[
    {id:1,name:'zhangsan',_type:'or'},
    {sex:1,number:3}
]
sql.table('node_table').where(data).select()
```

最后得出的SQL语句是
```js
SELECT * FROM node_table WHERE (id=1 OR name=`zhangsan` ) AND (sex=1 AND number=3 )
```

JSON字段之间默认用 AND 链接，若要指定连接方法可以传参数 `_nexttype:'or' ||  _nexttype:'and'`

```js
let data=[
    {id:1,name:'zhangsan',_type:'or',_nexttype:'or'},
    {sex:1,number:3,_type:'and'}
]
sql.table('node_table').where(data).select()
```

最后得出的SQL语句是
```js
SELECT * FROM node_table WHERE (id=1 OR name=`zhangsan`) OR (sex=1 AND number=3)
```


### 表达式查询 （直接参考的thinkphp的api）不区分大小写
上面的查询条件仅仅是一个简单的相等判断，可以使用查询表达式支持更多的SQL查询语法，查询表达式的使用格式：
表达式不分大小写，支持的查询表达式有下面几种，分别表示的含义是：

|表达式         | 含义            |
| ------------- |:-------------: |
| EQ            | 等于（=）        |
| NEQ           | 不等于（<>）     |
| GT            | 大于（>）        |
| EGT           | 大于等于（>=）    |
| LT            | 小于（<）        |
| ELT           | 小于等于（<=）    |
| LIKE          | 模糊查询         |
| [NOT] BETWEEN | 不在）区间查询    |
| [NOT] IN      | （不在）IN 查询   |

例如：
```js
let data={
    id:{eq:100,egt:10,_type:'or'},
    name:'zhangshan'
}
sql.table('node_table').where(data).select()
```

最后得出的SQL语句是
```js
SELECT  * FROM node_table WHERE ((id=100) OR (id>=10)) AND name=`zhangshan`
```

更多表达式查询请参考：[**4.2.表达式查询**](/docs/advanced/bdssearch.md)




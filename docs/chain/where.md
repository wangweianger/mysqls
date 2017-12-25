where方法的用法是mysql查询语句的精髓，也是最复杂的部分，任何一个封装的sql库where会是最复杂的一个部分。
where查询支持 字符串：String , JSON对象 ,表达式查询,JSON对象数组查询

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

最后胜出的SQL语句是
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

最后胜出的SQL语句是
```js
    SELECT * FROM node_table WHERE id=1 OR name=`zhangshan`
```

### 表达式查询 （直接参考 thinkphp 的api）
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







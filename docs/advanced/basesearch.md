基本查询
基本查询支持 字符串、JSON对象、数组三种查询方式


### 字符串查询

```js 
sql
    .table('node_table')
    .where('id=1&name=`zane`')
    .select()
```

最终得到
```js
SELECT * FROM node_table WHERE id=1&name=`zane`
```

### JSON对象查询

```js 
let data={
    id:1,
    name:'zane',
    sex:1
}
sql
    .table('node_table')
    .where(data)
    .select()
```

最终得到
```js
SELECT * FROM node_table WHERE id=1 AND name=`zane` AND sex=1 
```


### 数组JSON对象查询

```js 
let data=[{
        id:1,
        name:'zane',
        _nexttype:'or'
    },{
        sex:1,
        address:'shenzheng'
    }]
sql
    .table('node_table')
    .where(data)
    .select()
```

最终得到
```js
SELECT * FROM node_table WHERE (id=1 AND name=`zane`) OR (sex=1 AND address=`shenzheng`)
```










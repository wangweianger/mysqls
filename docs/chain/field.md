field方法属于链式调用方法之一，主要目的是标识要返回或者操作的字段，可以用于查询和写入操作。

### 案例

field参数为字符串
```js 
let data={
    id:1
}
sql.table('node_table').field('id,name').where(data).select()
```

最终得到
```js
SELECT id,name FROM node_table WHERE id=1 
```

field参数为数组 
```js 
let data={
    id:1
}
sql.table('node_table').field(['id','name']).where(data).select()
```

最终得到
```js
SELECT id,name FROM node_table WHERE id=1 
```

```js 
sql.table('node_table').field(['id','name', {'user_id': 'userId', 'user_name': 'userName'}, 'age']).where(data).select()
```

最终得到
```js
SELECT id,name, user_id AS userId, user_name AS userName, age FROM node_table WHERE id=1 
```


如果不调用field方法，就默认为`*`号，即调用所有的字段
```js 
sql.table('node_table').where('id=1').select()
```

最终得到
```js
SELECT * FROM node_table WHERE id=1
```




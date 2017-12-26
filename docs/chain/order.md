order方法属于链式调用方法之一，用于对操作的结果排序。

### 案例

单个字段的排序
```js 
sql.table('node_table').order('id desc').where('id=1').select()
```

最终得到
```js
SELECT * FROM node_table WHERE id=1 ORDER BY id desc 
```



多个字段的排序
```js 
sql.table('node_table').order('id desc,status').where('id=1').select()
```

最终得到
```js
SELECT * FROM node_table WHERE id=1 ORDER BY id desc,status 
```






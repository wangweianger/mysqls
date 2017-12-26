limit方法属于链式调用方法之一，主要用于指定查询和操作的数量，特别在分页查询的时候使用较多

### 限制结果数量

例如获取满足要求的10个用户，如下调用即可：

```js 
sql.table('node_table').limit(10).where('id=1').select()
```

最终得到
```js
SELECT * FROM node_table WHERE id=1 LIMIT 10
```

### 分页查询

用于文章分页查询是limit方法比较常用的场合，例如：

```js 
sql.table('node_table').limit(10,20).where('id=1').select()
或者
sql.table('node_table').limit('10,20').where('id=1').select()
```

最终得到
```js
SELECT * FROM node_table WHERE id=1 LIMIT 10,20 
```






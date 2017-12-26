GROUP方法属于链式调用方法之一，通常用于结合合计函数，根据一个或多个列对结果集进行分组 。

### 案例

单个字段的分组
```js 
sql.table('node_table').group('user_id').where('id=1').select()
```

最终得到
```js
SELECT * FROM node_table WHERE id=1 GROUP BY user_id 
```




也支持对多个字段进行分组，例如：
```js 
sql.table('node_table').field('username,max(score)').group('user_id,test_time').select()
```

最终得到
```js
 SELECT username,max(score) FROM node_table GROUP BY user_id,test_time
```






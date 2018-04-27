HAVING方法属于链式调用方法之一，用于配合group方法完成从分组的结果中筛选（通常是聚合条件）数据。

### 案例

having方法只有一个参数，并且只能使用字符串，例如：
```js 
sql.table('node_table').group('user_id').where('id=1').having('count(number)>3').select()
```

最终得到
```js
SELECT * FROM node_table WHERE id=1 GROUP BY user_id HAVING count(number)>3 
```






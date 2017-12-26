distinct方法属于链式调用方法之一，方法用于返回唯一不同的值。


### 案例

```js 
sql.distinct(true).table('node_table').field('name').where('id=1').select()
```

最终得到
```js
SELECT DISTINCT name FROM node_table WHERE id=1 
```

distinct方法的参数是一个布尔值。






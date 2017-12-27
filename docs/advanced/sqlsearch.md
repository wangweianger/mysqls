SQL查询,一个库很难做到完全支持所有的sql查询方法，即使能做到，那此库的体量一定会大很多，会有得不偿失的感觉，
因此直接给一个query方法支持任何的sql原生语句查询：

### 案例

```js 
sql.query('select * from node_table where id=1')
```

最终得到
```js
select * from node_table where id=1
```


这根原生的sql语法没有任何的区别。







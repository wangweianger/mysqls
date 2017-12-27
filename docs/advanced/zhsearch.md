组合查询的主体主要使用 Object 和 Array 查询


### Object查询

```js 
let data={
    id:1,
    name:'zhangsan',
    status:{ neq:1,elt:10 }
    _type:'or'
}
sql
    .table('node_table')
    .where(data)
    .select();

```

最终得到
```js
SELECT * FROM node_table WHERE id=1 OR name=`zhangsan` OR ((status<>1) AND (status<=10) ) 
```


### Array查询

```js 
let data=[{
        id:1,
        name:'zhangsan',
        status:{ neq:1,elt:10 }
        _nexttype:'or'
    },{
      sex:1,
      name:{in:'1,2,3'}
       _type:'or', 
    }]
sql
    .table('node_table')
    .where(data)
    .select();

```

最终得到
```js
SELECT * FROM node_table WHERE (id=1 AND name=`zhangsan` AND ((status<>1) AND (status<=10))) OR (sex=1 OR ((name IN (1,2,3))))
```










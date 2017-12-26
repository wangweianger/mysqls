alias方法主要用于sql的 插入数据（insert） | 修改数据(update),用于设置当前要操作的数据对象的值

### 插入数据

```js 
let data={
    name:'zhangsan',
    age:25
}
sql.table('node_table').data(data).insert()
```

最终得到
```js
INSERT INTO node_table (name,age) VALUES (`zhangsan`,25)
```


### 更新数据

```js 
let data={
    name:'zhangsan',
    age:25
}
sql.table('node_table').data(data,true).update()
```

最终得到
```js
UPDATE node_table SET name=`zhangsan`,age=25
```


读和写的区别在于 update 的 data 有第二个参数为真值，最终各自调用各自的方法得到sql数据


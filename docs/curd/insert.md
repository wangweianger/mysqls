insert方法用来在插入数据，使用简单，语法简洁

insert方法 主要调用的是 data语法,data('xx')
最终调用 .insert() 方法

### 案例

参数字符串方式
```js 
sql
    .table('node_table')
    .data('name=zane&email=752636052@qq.com')
    .insert()

```

最终得到
```js
INSERT INTO node_table (name,email) VALUES (`zane`,`752636052@qq.com`)
```


参数object对象方式

```js 
let data={
    name:'zane',
    email:'752636052@qq.com',
    sex:1
}
sql
    .table('node_table')
    .data(data)
    .insert()

```

最终得到
```js
INSERT INTO node_table (name,email,sex) VALUES (`zane`,`752636052@qq.com`,1)
```

**批量插入**

```js
let data = [
    {name:'zane',email:'752636052@qq.com'},
    {name:'zane_1',email:'752636052_1@qq.com'},
    {name:'zane_2',email:'752636052_2@qq.com'},
]
sql
    .table('node_table')
    .data(data)
    .insert()
```

最终得到
```js
INSERT INTO node_table (name,email) VALUES ('zane','752636052@qq.com'),('zane_1','752636052_1@qq.com'),('zane_2','752636052_2@qq.com')
```








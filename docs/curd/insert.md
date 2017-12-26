insert方法用来在插入数据，使用简单，语法简洁

insert方法 主要调用的是 data语法,data('xx'),data为一个参数
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








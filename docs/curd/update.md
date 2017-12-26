update方法更新数据库中的数据，使用简单，语法简洁

update方法 主要调用的是 data语法,data('xx',true),data第二个参数为true即表示更新
最终调用 .updata() 方法

### 案例

参数字符串方式
```js 
sql
    .table('node_table')
    .data('name=zane&email=752636052@qq.com',true)
    .update()


```

最终得到
```js
UPDATE node_table SET name=`zane`,email=`752636052@qq.com`
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
    .data(data,true)
    .update()

```

最终得到
```js
UPDATE node_table SET name=`zane`,email=`752636052@qq.com`,sex=1
```








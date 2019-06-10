# Just learn node for a while

## A-blog

> 该项目是一个前后端一体的博客 Demo，主要针对 `Node` 练练手，也是第一次不使用 `vue-cli` 来构建 Vue 项目，加深了 `webpack` 的相关配置理解

主要技术栈：

- 前端
    1. vue
    2. vuex
    3. vue-router
    4. ElementUI
- 后端
    1. express
    2. mongoDB
    3. mongoose

简单罗列一下服务端的文件结构：
```

server
    /assets          静态资源文件
    /models          mongoose 数据模型
    /routes          路由模块
    /views           前端渲染页面
    app.js           项目入口文件
```

## Express-CURD

> 这个项目是一个利用 `express` 和 `art-template` 的服务器渲染网站，对服务器端渲染有了一定的了解（服务器端渲染的页面查看网页源代码是看得到代码的，利于 SEO ）。

## mongoose-demo

> 对 `mongoose` 的增删改查操作进行熟悉

## node

1. path

> Node 中文件操作有一个巨坑，在文件操作中`相对路径`并不是指当前文件的所在路径的目录，而是相对于执行 node 命令所处的路径。模块引用时，相对路径不受执行命令所在目录的影响。

## promise

> 解决回调地域 -- promise 的具体用法

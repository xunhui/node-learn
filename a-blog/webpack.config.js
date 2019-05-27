const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: path.join(__dirname, 'client/src/main.js'),
    output: {
        path: path.resolve(__dirname, 'client/dist'),
        filename: 'bundle.js'
    },
    devServer: {
        //解决跨域访问问题
        proxy: {
            '/api': {
                target: 'http://localhost:5000/',
                pathRewrite: {'^/api': ''},// 这个参数的目的是给代理命名后，在访问时把命名删除掉。
                //路径重写，也就是说会修改最终请求的API路径。 比如访问的API路径：/api/users, 设置pathRewrite: {'^/api' : ''},后，最终代理访问的路径：http://localhost:5000/users， 
                changeOrigin: true, // target是域名的话，需要这个参数
                secure: false          // 设置支持https协议的代理
            }
        },
        contentBase: path.join(__dirname, "client/dist"), //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true //实时刷新
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loaders: 'vue-loader'
            },
            {
                test: /\.css|\.scss$/,
                use: [
                    "vue-style-loader",
                    "style-loader", // 将 JS 字符串生成为 style 节点
                    "css-loader", // 将 CSS 转化成 CommonJS 模块
                    "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'client/src/index.html')
        }),
        new VueLoaderPlugin()
    ]
}
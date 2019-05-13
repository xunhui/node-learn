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
        proxyTable: {
            '/api': {
                target: 'http://localhost:8080/EduAdminSystemCode',
                changeOrigin: true
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
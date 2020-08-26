const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html'
})
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development' ,//开发阶段用development(编译速率快) 上线改成production(减小打包文件体积)
    //这个配置文件，其实就是一个js文件，通过Node中的模块操作向外暴露一个配置对象，然后命令行通过webpack命令直接被执行
        //入口
    entry: {
        //表示要使用的webpack打包哪个文件
        path: path.join(__dirname, './src/index.js'),
    },
    //出口
    output: {
        //指定打包好的文件输出到哪个目录里
        path: path.join(__dirname, './dist'),

        //指定输出文件的名称
        filename: 'bundle.js'
    },
    plugins: [htmlPlugin, new VueLoaderPlugin()],
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']},
            {test: /.\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            {test: /.\.scss$/, use: ['style-loader','css-loader', 'sass-loader']},
            {test : /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,use: 'url-loader?limit=16940'},
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            {test: /\.vue$/, use: 'vue-loader'}
        ]  
    },
    devServer: {
        open: true,
        host: '192.168.0.11',
        proxy: {
            '/api': {
              target: 'http://127.0.0.1:3000/',
              changeOrigin: true
            }
          }
    }
    
}

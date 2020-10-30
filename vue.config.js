//修改vue.config.js文件，没有这个文件就新建一个
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
    parallel: false,
    productionSourceMap: false,
    chainWebpack: config => {
        // ============压缩图片 start============
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({ bypassOnDebug: true })
            .end()
            // ============压缩图片 end============
    },
    css: {
        modules: false,
        sourceMap: false,
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer({
                        overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
                    }),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*'], // !不匹配属性（这里是字体相关属性不转换）
                        unitPrecision: 3, // 最小精度，小数点位数
                        minPixelValue: 2 // 替换的最小像素值
                    })
                ]
            },
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.plugins.push(
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            //生产环境自动删除console
                            warnings: false, // 若打包错误，则注释这行
                            drop_debugger: true,
                            drop_console: true,
                            pure_funcs: ['console.log']
                        },
                        sourceMap: false,
                        parallel: true
                    })
                )
                // gzip压缩
            const productionGzipExtensions = ['html', 'js', 'css']
            config.plugins.push(
                    new CompressionWebpackPlugin({
                        filename: '[path].gz[query]',
                        algorithm: 'gzip',
                        test: new RegExp(
                            '\\.(' + productionGzipExtensions.join('|') + ')$'
                        ),
                        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                        deleteOriginalAssets: false // 删除原文件
                    })
                )
                // 公共代码抽离
            config.optimization = {
                splitChunks: {
                    cacheGroups: {
                        vendor: {
                            chunks: 'all',
                            test: /node_modules/,
                            name: 'vendor',
                            minChunks: 1,
                            maxInitialRequests: 5,
                            minSize: 0,
                            priority: 100
                        },
                        common: {
                            chunks: 'all',
                            test: /[\\/]src[\\/]js[\\/]/,
                            name: 'common',
                            minChunks: 2,
                            maxInitialRequests: 5,
                            minSize: 0,
                            priority: 60
                        },
                        styles: {
                            name: 'styles',
                            test: /\.(sa|sc|c)ss$/,
                            chunks: 'all',
                            enforce: true
                        },
                        runtimeChunk: {
                            name: 'manifest'
                        }
                    }
                }
            }
        }
    },
    lintOnSave: false,
    devServer: {
        // host: '192.168.2.243', // ip
        port: 8080, // 设置端口号
        https: false, // https:{type:Boolean}
        open: false, //配置自动启动浏览器
        proxy: null, //设置代理
        disableHostCheck: true // 添加这一行
    }
};
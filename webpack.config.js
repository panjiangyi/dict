var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var path = require('path');
var WebpackChunkHash = require("webpack-chunk-hash");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


module.exports = {
    //  devtool: 'cheap-module-eval-source-map',
    entry: {
        index: './app/index.jsx', //车展
        devWare: 'webpack-hot-middleware/client'
    },
    output: {
        path: path.join(__dirname, "./dist"), //编译到当前目录
        filename: '[name].js', // 编译后的文件名字
        publicPath: '/dist'
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: [
                    'babel-loader'
                ],
                exclude: /(node_modules|bower_components)/
            }, {
                test: /\.jsx$/,
                loader: 'react-hot!babel',
                // loaders: ['jsx-loader', 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react,retainLines=true'],
                exclude: /(node_modules|bower_components)/
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    publicPath: './',
                    use: {
                        loader: 'css-loader',
                        options: {}
                    }
                })
            }, {
                test: /\.(png|jpg)$/,
                loader: 'file-loader',
                options: {
                    name: 'imgs/[name].[ext]',
                }
            }

        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'], //后缀名自动补全
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        /* 启用midware的HMR */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'venders',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && (module.context.indexOf('node_modules') !== -1 || module.context.indexOf('vendors') !== -1);
            }
        }), new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest', //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.HashedModuleIdsPlugin(),
        new WebpackChunkHash(),
        // 分析代码
        // new BundleAnalyzerPlugin({
        //     analyzerPort: 1001
        // }),
    ],
    // devtool: "source-map",
    devServer: {
        port: 3000,
        publicPath: "/dist",
        hot: true,
        overlay: true,
    }
};
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    mode: "development"/*production development*/,
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[chunkhash].js',
        publicPath: '/',
    },
    plugins: [
        new MonacoWebpackPlugin({
            languages: ['json', 'javascript', 'css', 'dockerfile',
                'html', 'less', 'mysql', 'scss', 'shell', 'sql', 'typescript', 'xml', 'yaml']
        }),
        new CopyPlugin({
            patterns: [
                {from: path.resolve(__dirname, "src/sw.js")}
            ],
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
                PUBLIC_URL: JSON.stringify("")
            }
        }),
        new HtmlWebpackPlugin({
            title: 'cloud-builder',
            template: path.resolve(__dirname, './public/index.html'),
            filename: 'index.html',
            hash: true
        }),
        new MiniCSSExtractPlugin(),
        new CleanWebpackPlugin(),
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        //new BundleAnalyzerPlugin(),
        /*
        new CompressionPlugin({
            cache: true,
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$|/,
            threshold: 10240,
            minRatio: 0.8
        }),
        */
        //new webpack.HashedModuleIdsPlugin(),
        /*
        new webpack.optimize.AggressiveSplittingPlugin({
            minSize: 10000,
            maxSize: 1000000,
        }),
        */
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.ttf$/,
                type: 'asset/resource'
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    devServer: {
        //contentBase: path.join(__dirname, 'http://localhost:8080'),
        contentBase: path.resolve(__dirname, "http://localhost:8080"),
        watchContentBase: true,
        publicPath: '/',
        index: 'index.html',
        port: 8081,
        stats: "minimal",
        historyApiFallback: true,
        open: false,
        hot: true,
        serveIndex: true,
        host: 'localhost',
        //useLocalIp: true
    },
    optimization: {
        sideEffects: true,
        runtimeChunk: 'single',
        minimize: true,
        minimizer: [new TerserPlugin(), new MiniCSSExtractPlugin()],
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 200000,
            maxSize: 250000,
        }
    }
    /*
        optimization: {
            sideEffects: true,
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
            },
        },
        optimization: {
            sideEffects: true,
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            return `npm.${packageName.replace('@', '')}`;
                        },
                    },
                },
            },
        },
         */
};

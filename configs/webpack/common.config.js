const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, "../../src"),
    entry: {
        app: ["babel-polyfill", "./js/root.js"],
        vendor: ["jquery"],
        // apiInvoker: "./js/core/api.js"
    },
    resolve: {
        extensions: ['.js']
    },
    plugins:[
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jquery",
            jQuery: "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: [
                "app", 
                "vendor"
            ],
            // filename: "[name].chunk"
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 5,
            minChunkSize: 1000
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html"
        }),
        new ExtractTextPlugin("styles.css")
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["env"],
                    plugins: ["dynamic-import-webpack"]
                }
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            outputStyle: "compressed"
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                      limit: 8192
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};
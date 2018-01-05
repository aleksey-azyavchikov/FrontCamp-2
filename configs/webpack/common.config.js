const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const precss = require("precss");
const autoprefixer = require("autoprefixer");

module.exports = {
    context: path.resolve(__dirname, "../../src"),
    entry: {
        polyfills: ["babel-polyfill"],
        libraries: ["jquery", "bootstrap", "rxjs"],
        app: ["./index.js"],
    },
    resolve: {
        extensions: ['.js']
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name: ["app", "libraries", "polyfills"]
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jquery",
            jQuery: "jquery",
            Popper: ["popper.js", "default"],
            popper: ["popper.js", "default"],
            Rx: "rxjs/Rx"
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 5,
            minChunkSize: 1000
        }),
        new HtmlWebpackPlugin({
            template: "index.html",
        }),
        new ExtractTextPlugin("styles.bundle.css")
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["env"],
                    plugins: [
                        "dynamic-import-webpack",
                        "transform-decorators-legacy"
                    ]
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
                  use: ["css-loader"]
                })
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader", 
                            options: {
                                plugins: () => [
                                    precss,
                                    autoprefixer
                                ]
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                outputStyle: "compressed"
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                      limit: 8192,
                      name: "[name].[ext]"
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
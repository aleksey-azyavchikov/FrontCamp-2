const webpack = require("webpack");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const precss = require("precss");
const autoprefixer = require("autoprefixer");

const ROOT = resolve(__dirname);
const SRC = resolve(ROOT, "../../src");

const { NODE_ENV = "development" } = process.env;
const { APP_TYPE = "react" } = process.env

const onlyIn = env => (plugin, appType) => NODE_ENV.trim() === env && APP_TYPE.trim() == appType ? plugin : null 
const onlyInDev = onlyIn("development");
const onlyInProd = onlyIn("production");
const loadEntry = (entryModule, appType) => APP_TYPE.trim() == appType ? entryModule : null;

module.exports = {
    context: SRC,
    entry: {
        polyfills: ["babel-polyfill"],
        app: [
            onlyInDev("react-hot-loader/patch", "react"),
            loadEntry("./react-app/index.jsx", "react"),
            loadEntry("./angular-app/index.js", "angular")
        ].filter(Boolean),
        libraries: ["jquery", "bootstrap", "rxjs"],
    },
    resolve: {
        extensions: [".js", ".jsx"]
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
            Rx: "rxjs/Rx",
            React: "react"
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 5,
            minChunkSize: 1000
        }),
        new HtmlWebpackPlugin({
            template: "./native-app/index.html",
            filename: "index.native.html"
        }),
        new HtmlWebpackPlugin({
            template: "./angular-app/index.html",
            filename: "index.angular.html"
        }),
        new HtmlWebpackPlugin({
            template: "./react-app/index.html",
            filename: "index.react.html"
        }),
        new ExtractTextPlugin("styles.bundle.css")
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["env", "react"],
                    plugins: [
                        "dynamic-import-webpack",
                        "transform-decorators-legacy",
                        "transform-class-properties",
                        "transform-object-rest-spread",
                        "react-html-attrs",
                        "react-hot-loader/babel"
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
                use: ["css-hot-loader"].concat(ExtractTextPlugin.extract({
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
                }))
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
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "",
                        publicPath: ""
                    }
                }]
            }
        ]
    }
};
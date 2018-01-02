const merge = require("webpack-merge");
const common = require("./common.config");
const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common, {
    output: {
        path: path.resolve(__dirname, "../../dist/dev"),
        filename: "[name].bundle.js",
        sourceMapFilename: "[name].map",
        chunkFilename: "[name].chunk.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true)
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                output: {
                comments: true,
                },
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        
    ],
    devServer: {
        contentBase: "../../dist/prod",
        port: 3001
    },
    devtool: "source-map",
    watch: true
});

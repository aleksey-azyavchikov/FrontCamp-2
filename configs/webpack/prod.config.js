const merge = require("webpack-merge");
const common = require("./common.config");
const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common.config, {
    output: {
        path: path.resolve(__dirname, "../../server/public/build"),
        publicPath: "build/",
        filename: "[name].bundle.js",
        sourceMapFilename: "[name].map",
        chunkFilename: "[name].chunk.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            isProduction: JSON.stringify(true)
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
    // devServer: {
    //     contentBase: "../../dist/prod",
    //     port: 3001
    // },
    // watch: true
    devtool: "source-map",
});

const merge = require("webpack-merge");
const common = require("./common.config");
const webpack = require("webpack");
const path = require("path");

module.exports = merge(common, {
    output: {
        path: path.resolve(__dirname, "../../dist/dev"),
        filename: "[name].bundle.js",
        sourceMapFilename: "[name].map",
        chunkFilename: "[id].chunk.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true)
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        
    ],
    devServer: {
        contentBase: "../../dist/prod"
    },
    devtool: "source-map",
    watch: true
});

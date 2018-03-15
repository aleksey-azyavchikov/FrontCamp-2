const merge = require("webpack-merge");
const common = require("./common.config");
const webpack = require("webpack");
const path = require("path");

module.exports = merge(common, {
    output: {
        path: path.resolve(__dirname, "../../server/public/build"),
        publicPath: "build/",
        filename: "[name].bundle.js",
        sourceMapFilename: "[file].map",
        chunkFilename: "[name].chunk.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            isProduction: JSON.stringify(false)
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: "source-map"
});

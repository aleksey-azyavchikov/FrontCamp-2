const merge = require("webpack-merge");
const common = require("./common.config");
const webpack = require("webpack");
const path = require("path");

module.exports = merge(common.config, {
    output: {
        path: path.resolve(__dirname, `../../server/public/build/${common.appType}`),
        publicPath: `build/${common.appType}/`,
        filename: "[name].bundle.js",
        sourceMapFilename: "[file].map",
        chunkFilename: "[name].chunk.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            isDevelopment: JSON.stringify(common.node === "development"),
            isReactApp: JSON.stringify(common.appType === "react")
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: "source-map"
});

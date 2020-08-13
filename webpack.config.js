const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "#eval-source-map",
    node: { fs: 'empty' },
    entry: {
        'bundle': [
            __dirname + '/src/index.tsx'
        ]
    },
    resolve: {
        modules: [
            path.resolve('src'),
            path.resolve('node_modules'),
            path.resolve('src/build'),
        ],
        extensions: ['.tsx', '.jsx', '.css', '.ts', '.js', '.json']
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js",
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.(jsx|tsx|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            inject: true,
            template: "./src/index.html",
            filename: "./index.html",
            chunks: ['bundle'],
            test: ''
        }),
        new CopyWebpackPlugin([
            { from: 'src/css', to: '../build/css' },
            { from: 'src/js', to: '../build/js' },
            { from: 'src/fonts', to: '../build/fonts' },
            { from: 'src/img', to: '../build/img' },
            { from: 'src/data', to: '../build/data' },
        ], {})
    ]
}
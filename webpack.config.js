const path = require("path");

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: { loader: 'ts-loader', options: { transpileOnly: true } },
            },
            {
                test: /.css$/, use: [
                    { loader: "style-loader" },
                    { loader: 'css-loader', options: { sourceMap: true, esModule: false } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            favicon: "./src/assets/favicon.ico"
        }),
        new WebpackPwaManifest({
            name: 'DevCafe-PWA',
            short_name: 'OCPWA',
            description: 'A example Progressive Web App!',
            background_color: '#ffffff',
            icons: [
              {
                src: path.resolve('src/assets/android-chrome-192x192.png'),
                sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
                purpose: "any maskable"
              },
            ],
            ios: {
                "apple-touch-icon": path.resolve('src/assets/apple-touch-icon.png'),
            },
            theme_color: '#ffffff'
          }),
          new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
          }),
    ],
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "docs"),
    },
    devServer: {
        historyApiFallback: {
            index: "/",
        },
    }
};

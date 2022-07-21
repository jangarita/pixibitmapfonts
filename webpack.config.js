const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
    return {
        entry: path.join(__dirname, '/src/js/index.js'),
        devtool: 'eval-source-map',
        output: {
            path: path.join(__dirname, '/dist'),
            filename: '[name].js',
            publicPath: '/',
            assetModuleFilename: 'assets/[name][ext][query]'
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: 'asset/resource',
                },
            ]
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'src',
                        globOptions: {
                            dot: true,
                            gitignore: true,
                            ignore: [
                                '**/index.html',
                                '**/js/**',
                                '**/css/**',
                                '**/partials/**',
                            ],
                        },
                    },
                ]
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.join(__dirname, '/src/index.html'),
                inject: 'body',
                hash: true,
                base: '../',
            }),
        ],
        devServer: {
            host: 'local-ip',
            server: 'https',
            static: {
                directory: path.join(__dirname, '/src'),
            },
        },
    };
};

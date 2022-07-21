const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
    return {
        entry: path.join(__dirname, '/src/js/index.js'),
        output: {
            path: path.join(__dirname, '/dist'),
            filename: '[name].js',
            publicPath: './',
            assetModuleFilename: (pathData) => {
                const filepath = path
                    .dirname(pathData.filename)
                    .split('/')
                    .slice(1)
                    .join('/');
                return `${filepath}/[name][ext][query]`;
            },
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
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
                base: './',
                minify: {
                    removeAttributeQuotes: false,
                    collapseWhitespace: true,
                    html5: true,
                    minifyCSS: true,
                    minifyJS: true,
                    minifyURLs: true,
                    removeComments: true,
                    removeEmptyAttributes: false,
                },
            }),
        ],
    };
};

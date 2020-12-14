const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env = {}) => {

	const { mode = 'development' } = env;
	const isProd = mode === 'production';
	const isDev = mode === 'development';

	const filename = ext => isDev ? `[name].${ext}` : `[name].[hash:8].${ext}`;

	const getStyleLoaders = (extra) => {
		const loaders = [
			{
				loader: MiniCssExtractPlugin.loader,
				options: {
					hmr: isDev,
					reloadAll: true,
				},
			},
			'css-loader',
		];

		if (extra) loaders.push(extra);

		return loaders;
	}

	return {
		context: path.resolve(__dirname, 'src'),
		mode: isProd ? 'production' : 'development',
		entry: {
			main: './index.js'
		},
		output: {
			filename: filename('js'),
			path: path.resolve(__dirname, 'dist')
		},
		// для устранения предупреждения в консоли 
		devtool: 'inline-source-map',

		// сервер для автоматического обновления страниц
		devServer: {
			proxy: {
				"/api/*": {
					target: "http://localhost:5000/",
					secure: "false"
				},
				"/images/*": {
					target: "http://localhost:5000/",
					secure: "false"
				},
			},
			open: true,
			historyApiFallback: true,
			hot: isDev,
			contentBase: path.resolve(__dirname, 'public/index.html'),
			watchContentBase: true,
			port: 3000,
		},
		// для работы с различными файлами и модулями
		module: {
			rules: [

				// Starting babel
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: 'babel-loader'
				},

				// Loading images
				{
					test: /\.(png|jpg|jpeg|svg|gif|ico)$/,
					exclude: [
						path.resolve(__dirname, "src/fonts")
					],
					use: [
						{
							loader: 'file-loader',
							options: {
								outputPath: 'images',
								name: '[name]-[sha1:hash:7].[ext]'
							}
						}
					]
				},

				// Loading fonts
				{
					test: /\.(ttf|otf|eot|woff|woff2|svg)$/,
					include: [
						path.resolve(__dirname, "src/fonts"),
					],
					use: [
						{
							loader: 'file-loader',
							options: {
								outputPath: 'fonts',
								name: '[name].[ext]'
							}
						}
					]
				},

				// Loading CSS
				{
					test: /\.(css)$/,
					use: getStyleLoaders()
				},

				// Loading SASS/SCSS
				{
					test: /\.(s[ac]ss)$/,
					use: getStyleLoaders('sass-loader')
				},

			]
		},

		// плагины для добавление функционала в проект
		plugins: [
			new HTMLWebpackPlugin({
				template: './../public/index.html',
				minify: {
					collapseWhitespace: isProd,
				}
			}),
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: filename('css'),
			})
		]
	};
};
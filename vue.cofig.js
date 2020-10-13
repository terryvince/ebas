const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	// pluginOptions: {
	// 	'style-resources-loader': {
	// 		preProcessor: 'less',
	// 		patterns: [
	// 			// 这个是加上自己的路径,不能使用(如下:alias)中配置的别名路径
	// 			path.resolve(__dirname, './assets/css/public.less')
	// 		]
	// 	}
	// },
	configureWebpack: {
		plugins: [
			new CopyWebpackPlugin([{
				from: path.join(__dirname, '/subpackage/static'),
				to: path.join(__dirname + '/unpackage/', 'dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev',
					process.env.UNI_PLATFORM, '/')
			}])
		]
	}
}

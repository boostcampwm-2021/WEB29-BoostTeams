/* eslint-disable @typescript-eslint/no-var-requires */
const CracoAlias = require('craco-alias');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

module.exports = {
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: 'tsconfig',
				baseUrl: '.',
				tsConfigPath: './tsconfig.path.json',
			},
		},
	],
	webpack: smp.wrap({
		plugins: [
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				openAnalyzer: false,
			}),
		],
	}),
};

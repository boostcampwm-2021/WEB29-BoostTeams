/* eslint-disable @typescript-eslint/no-var-requires */
const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
	addWebpackAlias({
		'@src': path.resolve(__dirname, 'src'),
		'@apis': path.resolve(__dirname, 'src/apis'),
		'@components': path.resolve(__dirname, 'src/components'),
		'@pages': path.resolve(__dirname, 'src/pages'),
		'@routes': path.resolve(__dirname, 'src/routes'),
		'@stores': path.resolve(__dirname, 'src/stores'),
		'@styles': path.resolve(__dirname, 'src/styles'),
		'@templates': path.resolve(__dirname, 'src/templates'),
		'@types': path.resolve(__dirname, 'src/types'),
		'@utils': path.resolve(__dirname, 'src/utils'),
	}),
);

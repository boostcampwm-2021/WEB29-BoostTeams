const path = require('path');

module.exports = {
  'stories': [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app'
  ],
  'webpackFinal': async config => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src/');
    config.resolve.alias['@apis'] = path.resolve(__dirname, '../src/apis/');
    config.resolve.alias['@components'] = path.resolve(__dirname, '../src/components/');
    config.resolve.alias['@hooks'] = path.resolve(__dirname, '../src/hooks/');
    config.resolve.alias['@pages'] = path.resolve(__dirname, '../src/pages/');
    config.resolve.alias['@routes'] = path.resolve(__dirname, '../src/routes/');
    config.resolve.alias['@stores'] = path.resolve(__dirname, '../src/stores/');
    config.resolve.alias['@styles'] = path.resolve(__dirname, '../src/styles/');
    config.resolve.alias['@templates'] = path.resolve(__dirname, '../src/templates/');
    config.resolve.alias['@utils'] = path.resolve(__dirname, '../src/utils/');
    config.resolve.alias['@images'] = path.resolve(__dirname, '../src/assets/images/');
    config.resolve.alias['@fonts'] = path.resolve(__dirname, '../src/assets/fonts/');
    return config;
  }
}

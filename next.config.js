const withSass = require('@zeit/next-sass');
const fp = require('lodash/fp');

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]'
  },
  webpack: (config, { dev }) => {
    const eslintRule = {
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        // Emit errors as warnings for dev to not break webpack build.
        // Eslint errors are shown in console for dev, yay :-)
        emitWarning: dev
      }
    };

    const rules = [].concat(eslintRule, config.module.rules);

    return fp.set(['module', 'rules'], rules, config);
  }
});

const { addBabelPlugin, override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addBabelPlugin('@emotion/babel-plugin'),
  addWebpackAlias({
    '@shared': path.resolve(__dirname, 'src/modules/shared'),
    '@admin': path.resolve(__dirname, 'src/modules/admin'),
    '@user': path.resolve(__dirname, 'src/modules/user'),
    '@token': path.resolve(__dirname, 'src/modules/token'),
    '@advisor': path.resolve(__dirname, 'src/modules/advisor'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@routes': path.resolve(__dirname, 'src/routes'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
    '@types': path.resolve(__dirname, 'src/types'),
    '@store': path.resolve(__dirname, 'src/store'),
    '@theme': path.resolve(__dirname, 'src/theme')
  })
); 
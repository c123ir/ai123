const { addBabelPlugin, override } = require('customize-cra');

module.exports = override(
  addBabelPlugin('@emotion/babel-plugin')
); 
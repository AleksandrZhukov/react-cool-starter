/* Set your postcss-loader configuration here */

module.exports = {
  plugins: [
    require('precss')(),
    require('postcss-for'),
    require('postcss-flexbugs-fixes')(),
    require('autoprefixer')()
  ]
};

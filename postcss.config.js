const px2rem = require('postcss-plugin-px2rem')
const px2remOpts = {
  minPixelValue: 2
}
module.exports = {
  plugins: {
    autoprefixer: {},
    postcss: [px2rem(px2remOpts)]
  }
}

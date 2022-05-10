module.exports = {
  devServer: {
    open: true
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('raw-loader').loader('raw-loader')
  }
}

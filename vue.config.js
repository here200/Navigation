const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 打包项目时，使用相对路径
  publicPath: './',
  // 修改网站的标题
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '起始导航页'
      return args
    })
  }
})

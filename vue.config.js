const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 打包项目时，使用相对路径
  publicPath: './'
})

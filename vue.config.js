const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map' // 或者 'cheap-source-map', 'eval-source-map' 等
  }
})
